# آموزش FastAPI با پروژه‌ی خودت (loan-assessment backend)

این فایل، بک‌اند واقعی پروژه‌ی `ai-ops-platform` تو رو خط به خط توضیح می‌ده تا هم FastAPI یاد بگیری، هم دقیقاً بدونی کدت چطور کار می‌کنه.

## ۱. نقشه‌ی کلی: هر فایل چه نقشی داره

بعد از پاک‌سازی که انجام دادیم، بک‌اندت الان دقیقاً همینه (نسخه‌ی قدیمیِ بدون فریم‌ورک — `app.py`, `db.py`, `router.py`, `handlers/` — حذف شد چون دیگه هیچ‌جا ازشون استفاده نمی‌شد):

```
backend/
├── main.py           ← نقطه‌ی ورود؛ اپ FastAPI رو می‌سازه
├── config.py          ← تنظیمات (از environment variable می‌خونه)
├── database.py        ← اتصال به دیتابیس با SQLAlchemy
├── models.py           ← مدل‌های ORM (جدول‌های دیتابیس)
├── schemas.py          ← مدل‌های Pydantic (شکل ورودی/خروجی API)
├── routers/            ← اندپوینت‌ها، دسته‌بندی‌شده به سه فایل
│   ├── applicants.py
│   ├── loan_applications.py
│   └── risk_assessments.py
└── requirements.txt
```

نکته‌ی مهم که در FastAPI همیشه صادقه: **هر فایل یک مسئولیت داره**. روتر فقط HTTP رو مدیریت می‌کنه، مدل فقط شکل جدول دیتابیس رو تعریف می‌کنه، schema فقط شکل JSON ورودی/خروجی رو. این دقیقاً همون معماری‌ای هست که الان پروژه‌ت داره.

## ۲. main.py — قلب اپ

```python
from fastapi import FastAPI

from database import Base, engine
import models
from routers import applicants, loan_applications, risk_assessments

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Loan Pre-Assessment API",
    description="سیستم پیش‌ارزیابی درخواست وام",
    version="1.0.0",
)

app.include_router(applicants.router)
app.include_router(loan_applications.router)
app.include_router(risk_assessments.router)


@app.get("/", tags=["health"])
def health_check():
    return {"status": "ok"}
```

خط به خط:

- `app = FastAPI(...)` — یک نمونه از اپلیکیشن FastAPI می‌سازه. همین یک خط، به‌صورت خودکار مستندات Swagger رو هم در آدرس `/docs` فعال می‌کنه (این یکی از بزرگ‌ترین مزیت‌های FastAPI نسبت به نوشتن سرور دستی مثل نسخه‌ی قبلی پروژه‌ته).
- `Base.metadata.create_all(bind=engine)` — به SQLAlchemy می‌گه «هر جدولی که تو `models.py` تعریف کردی و هنوز تو دیتابیس نیست، بسازش». معادل همون `SCHEMA` دستی‌ای هست که تو `db.py` قدیمی با SQL خام می‌نوشتی، منتها اینجا از روی کلاس‌های پایتون خودش SQL می‌سازه.
- `import models` قبل از `create_all` **حیاتیه** — چون فقط با import شدن، کلاس‌های `Applicant`, `LoanApplication` و... روی `Base` ثبت می‌شن. اگر این import نباشه، `create_all` هیچ جدولی نمی‌سازه.
- `app.include_router(...)` — هر روتر (یک `APIRouter` با prefix خودش، مثلاً `/api/applicants`) رو به اپ اصلی می‌چسبونه. این معادل ثبت روت‌ها تو `router.py` قدیمیِ خودته، منتها بدون نوشتن regex دستی.
- تابع `health_check` یک اندپوینت ساده‌ست؛ دکوریتور `@app.get("/")` می‌گه «وقتی درخواست GET به `/` اومد، این تابع رو اجرا کن».

## ۳. database.py — لایه‌ی اتصال به دیتابیس

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

- `engine` نماینده‌ی اتصال به Postgres هست (از `DATABASE_URL` تو `config.py`).
- `SessionLocal` یک «کارخانه‌ی session» می‌سازه — هر بار که صداش کنی، یک session جدید برای صحبت با دیتابیس می‌ده.
- `Base` کلاس پایه‌ایه که همه‌ی مدل‌های `models.py` ازش ارث‌بری می‌کنن.
- `get_db()` یک **dependency** هست، مهم‌ترین مفهومی که باید یاد بگیری. با `yield` نوشته شده، یعنی: یک session باز کن → بده به روتری که ازش خواسته → وقتی درخواست تموم شد (چه موفق چه با خطا)، `finally` اجرا میشه و session بسته می‌شه. این الگو تضمین می‌کنه هیچ‌وقت connection باز نمی‌مونه — دقیقاً همون چیزی که تو نسخه‌ی قدیمی مجبور بودی دستی با `conn.close()` تو هر تابع تکرار کنی.

## ۴. models.py — جدول‌های دیتابیس (SQLAlchemy ORM)

هر کلاس اینجا معادل یک جدوله. مثلاً:

```python
class Applicant(Base):
    __tablename__ = "applicants"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    ...
    applications = relationship("LoanApplication", back_populates="applicant", cascade="all, delete")
```

- `Column(...)` هر ستون جدول رو با نوع دیتاش تعریف می‌کنه (`Integer`, `String`, `Numeric`, ...).
- `relationship(...)` رابطه‌ی بین جدول‌ها رو مدل می‌کنه (یک متقاضی، چند درخواست وام داره). این یعنی تو کد پایتون می‌تونی بنویسی `applicant.applications` و SQLAlchemy خودش JOIN لازم رو بزنه — دیگه لازم نیست مثل `db.py` قدیمی دستی SQL بنویسی.
- `ForeignKey("applicants.id", ondelete="CASCADE")` دقیقاً معادل همون CASCADE ای هست که تو SQL خام `db.py` قدیمی نوشته بودی.

## ۵. schemas.py — اعتبارسنجی ورودی/خروجی (Pydantic)

این فایل شاید مهم‌ترین تفاوت FastAPI با «پایتون خام» باشه:

```python
class ApplicantCreate(BaseModel):
    full_name: str
    national_id: str
    monthly_income: float
    job_title: Optional[str] = None
```

وقتی یک روتر بگه ورودیش از نوع `ApplicantCreate` هست، FastAPI خودش:
1. بدنه‌ی JSON درخواست رو می‌خونه.
2. چک می‌کنه که `full_name` و `national_id` رشته باشن و وجود داشته باشن، `monthly_income` عدد باشه.
3. اگه چیزی غلط بود، خودکار یک خطای ۴۲۲ با پیام دقیق برمی‌گردونه — **بدون این‌که تو حتی یک خط کد اعتبارسنجی بنویسی.**

مقایسه کن با نسخه‌ی قدیمی‌ت تو `handlers/applicants.py` که مستقیم می‌رفت سراغ `body["full_name"]` — اگه کلاینت اون فیلد رو نمی‌فرستاد، کل درخواست با یک ۵۰۰ خطای خام می‌ترکید.

نکته‌ی دوم: تفاوت `ApplicantCreate` (چیزی که کلاینت می‌فرسته) و `ApplicantOut` (چیزی که تو برمی‌گردونی) — این جدایی باعث می‌شه بتونی فیلدهایی که کاربر نباید بفرسته (مثل `id`) رو از ورودی حذف کنی ولی تو خروجی برگردونی.

`model_config = ConfigDict(from_attributes=True)` هم یعنی: «اجازه بده این schema مستقیم از یک آبجکت SQLAlchemy (نه دیکشنری) پر بشه» — همون چیزی که تو `routers/applicants.py` وقتی `return applicant` می‌نویسی (یک آبجکت مدل، نه دیکشنری) اتفاق می‌افته.

## ۶. routers/applicants.py — یک اندپوینت کامل، خط به خط

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import get_db

router = APIRouter(prefix="/api/applicants", tags=["applicants"])

@router.post("/", response_model=schemas.ApplicantOut, status_code=201)
def create_applicant(payload: schemas.ApplicantCreate, db: Session = Depends(get_db)):
    applicant = models.Applicant(**payload.model_dump())
    db.add(applicant)
    db.commit()
    db.refresh(applicant)
    return applicant
```

- `APIRouter(prefix="/api/applicants", ...)` — یعنی هر مسیری که تو این فایل تعریف بشه، خودکار با `/api/applicants` شروع می‌شه. پس `@router.post("/")` در واقع می‌شه `POST /api/applicants/`.
- `payload: schemas.ApplicantCreate` — FastAPI از روی این type hint می‌فهمه که باید بدنه‌ی JSON رو بخونه و اعتبارسنجی کنه (بخش ۵).
- `db: Session = Depends(get_db)` — این خط **Dependency Injection** هست. به FastAPI می‌گی: «قبل از اجرای این تابع، `get_db()` رو صدا بزن و نتیجه‌ش (یک session) رو بده به پارامتر `db`». وقتی تابع تموم شد، FastAPI خودش برمی‌گرده به `get_db` و بخش بعد از `yield` (یعنی `db.close()`) رو اجرا می‌کنه.
- `models.Applicant(**payload.model_dump())` — `payload` یک آبجکت Pydantic هست؛ `.model_dump()` تبدیلش می‌کنه به دیکشنری، و `**` اون رو به‌عنوان آرگومان‌های جداگانه به سازنده‌ی مدل SQLAlchemy می‌ده.
- `db.add` → `db.commit` → `db.refresh` الگوی استاندارد SQLAlchemy برای «بساز، ذخیره کن، از دیتابیس (با `id` جدیدش) دوباره بخون».
- `return applicant` — چون `response_model=schemas.ApplicantOut` تعریف شده، FastAPI خودش آبجکت مدل رو به شکل `ApplicantOut` (و فقط همون فیلدها، نه چیز اضافه) تبدیل می‌کنه و به JSON برمی‌گردونه.

## ۷. routers/loan_applications.py — جایی که منطق واقعی پروژه‌ت هست

این فایل جالب‌تره چون سه تا مفهوم رو با هم نشون می‌ده:

- **رابطه‌ی چندتایی در یک درخواست**: `create_application` هم یک `LoanApplication` می‌سازه هم چند `CollateralAsset` مرتبط باهاش، و با `db.flush()` (نه `commit`) بین این دو کار، `application.id` رو زودتر از commit نهایی در دسترس می‌ذاره.
- **خطای HTTP استاندارد**: `raise HTTPException(status_code=404, detail="not found")` — دقیقاً معادل `return 404, {"error": "not found"}` تو نسخه‌ی قدیمی، ولی FastAPI خودش شکل JSON پاسخ خطا رو استاندارد می‌کنه.
- **صدا زدن یک سرویس بیرونی (n8n)**: `submit_for_assessment` وضعیت درخواست رو به `assessing` تغییر می‌ده و بعد با `requests.post` یک webhook به n8n می‌زنه تا ارزیابی هوش مصنوعی شروع بشه. اینجا `application.applicant.monthly_income` رو می‌بینی — چون تو `models.py` رابطه‌ی `applicant` رو تعریف کرده بودی، SQLAlchemy خودش این JOIN رو پشت صحنه می‌زنه؛ لازم نبود دستی query بنویسی.

## ۸. routers/risk_assessments.py — دریافت callback و Header سفارشی

```python
def n8n_callback(
    payload: schemas.RiskAssessmentCallback,
    db: Session = Depends(get_db),
    x_n8n_secret: str = Header(default=None, alias="X-N8N-SECRET"),
):
    if x_n8n_secret != N8N_SECRET:
        raise HTTPException(status_code=403, detail="forbidden")
    ...
```

اینجا `Header(alias="X-N8N-SECRET")` نشون می‌ده FastAPI چطور می‌تونه علاوه بر بدنه‌ی JSON، مستقیم از هدر HTTP هم مقدار بخونه و به یک پارامتر تابع تبدیلش کنه — دقیقاً همون کاری که تو نسخه‌ی قدیمی با `handler.headers.get("X-N8N-SECRET")` دستی انجام می‌دادی.

## ۹. جریان کامل یک درخواست (تصویر ذهنی)

```
کلاینت (Angular)
   │  POST /api/loan-applications/  { applicant_id, requested_amount, ... }
   ▼
FastAPI اول payload رو با LoanApplicationCreate اعتبارسنجی می‌کنه
   │
   ▼
get_db() یک session باز می‌کنه و به عنوان db تزریق می‌شه
   │
   ▼
create_application() اجرا می‌شه → با SQLAlchemy رکورد می‌سازه
   │
   ▼
response_model=LoanApplicationOut فقط فیلدهای مجاز رو به JSON تبدیل می‌کنه
   │
   ▼
درخواست تموم می‌شه → get_db دوباره بیدار می‌شه → db.close()
```

## ۱۰. چطور اجراش کنی و ببینیش

طبق `Dockerfile` و `docker-compose.yml` پروژه‌ت:

```bash
cd D:\ai-ops-platform
docker compose up --build
```

بعد برو به `http://localhost:8000/docs` — این صفحه‌ی Swagger UI هست که FastAPI **خودکار** از روی همون `schemas.py` و type hint هایی که نوشتی می‌سازه؛ می‌تونی مستقیم از همون‌جا هر اندپوینت رو تست کنی، بدون Postman.

## ۱۱. کاری که همین الان برات انجام دادم (بخش refactor)

- فایل‌های نسخه‌ی قدیمیِ بدون فریم‌ورک (`app.py`, `db.py`, `router.py`, `handlers/`) که دیگه هیچ‌جا import نمی‌شدن (چک کردم — Dockerfile هم از اول `uvicorn main:app` صدا می‌زد، نه `app.py`) رو حذف کردم.
- پوشه‌های `__pycache__` رو هم پاک کردم.
- یک `.git/index.lock` قدیمی که مونده بود و جلوی هر دستور git رو می‌گرفت (`git status`, `git add`, ...) رو هم پاک کردم — الان `git status` تمیز اجرا می‌شه.

**چیزی که خودم عوض نکردم و باید خودت تصمیم بگیری**: `git status` نشون می‌ده که `README.md` حذف شده و `.nx/`, `backend/`, `daemon.json`, `docker-compose.yml`, `frontend/` هنوز commit نشدن (احتمالاً از وقتی `org/` رو به `frontend/` تغییر نام دادی و `backend/` رو اضافه کردی). اگه بخوای می‌تونم برات `git add` و یک commit تمیز بزنم — فقط بگو.
