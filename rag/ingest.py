#!/usr/bin/env python3
"""
یک‌بار اجرا می‌شود: سیاست‌های وام‌دهی را از rag/policies/*.md می‌خواند،
تکه‌تکه (chunk) می‌کند، امبدینگ هر تکه را از Ollama می‌گیرد، و در Qdrant ذخیره می‌کند.

اجرا:
    python rag/ingest.py

پیش‌نیاز: Ollama و Qdrant باید در حال اجرا باشند:
    docker compose up -d ollama qdrant
و مدل امبدینگ باید از قبل pull شده باشد:
    docker compose exec ollama ollama pull nomic-embed-text

فقط از کتابخانه‌ی استاندارد پایتون استفاده می‌کند (نیازی به pip install نیست).
"""
import json
import re
import urllib.request
from pathlib import Path

OLLAMA_URL = "http://localhost:11434"
QDRANT_URL = "http://localhost:6333"
EMBED_MODEL = "nomic-embed-text"
COLLECTION = "loan_policies"
POLICIES_DIR = Path(__file__).parent / "policies"


def http_json(url: str, method: str, payload: dict) -> dict:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url, data=data, headers={"Content-Type": "application/json"}, method=method
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def chunk_markdown(text: str, source: str) -> list[dict]:
    """هر فایل را بر اساس هدینگ‌های ## به تکه‌های جداگانه تقسیم می‌کند."""
    parts = re.split(r"\n(?=## )", text.strip())
    return [{"text": p.strip(), "source": source} for p in parts if p.strip()]


def embed(text: str) -> list[float]:
    result = http_json(
        f"{OLLAMA_URL}/api/embeddings", "POST", {"model": EMBED_MODEL, "prompt": text}
    )
    return result["embedding"]


def main() -> None:
    md_files = sorted(POLICIES_DIR.glob("*.md"))
    if not md_files:
        print(f"هیچ فایل .md‌ای در {POLICIES_DIR} پیدا نشد.")
        return

    all_chunks: list[dict] = []
    for f in md_files:
        all_chunks.extend(chunk_markdown(f.read_text(encoding="utf-8"), f.name))

    print(f"{len(all_chunks)} تکه از {len(md_files)} فایل سیاست پیدا شد. در حال گرفتن امبدینگ از Ollama...")

    points = []
    vector_size = None
    for i, chunk in enumerate(all_chunks):
        vector = embed(chunk["text"])
        vector_size = vector_size or len(vector)
        points.append(
            {
                "id": i + 1,
                "vector": vector,
                "payload": {"text": chunk["text"], "source": chunk["source"]},
            }
        )
        print(f"  [{i + 1}/{len(all_chunks)}] {chunk['source']} embed شد ({len(vector)} بعدی)")

    print(f"ساخت/بازسازی کالکشن '{COLLECTION}' در Qdrant (dim={vector_size})...")
    http_json(
        f"{QDRANT_URL}/collections/{COLLECTION}",
        "PUT",
        {"vectors": {"size": vector_size, "distance": "Cosine"}},
    )

    print("درج نقاط در Qdrant...")
    http_json(f"{QDRANT_URL}/collections/{COLLECTION}/points", "PUT", {"points": points})

    print(f"تمام شد — {len(points)} تکه سیاست در Qdrant ذخیره شد.")


if __name__ == "__main__":
    main()
