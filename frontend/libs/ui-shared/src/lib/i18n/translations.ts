export type Lang = 'en' | 'fa';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    'nav.brand': 'CreditScope',
    'nav.apply': 'Apply for a loan',
    'nav.lang': 'فارسی',

    'hero.eyebrow': 'AI-assisted loan pre-assessment',
    'hero.title': 'Know your loan risk before you apply.',
    'hero.lead':
      'CreditScope reads your income, request and collateral against real bank lending policy — then gives you a grounded, explainable risk assessment in seconds.',
    'hero.cta': 'Start pre-assessment',
    'hero.cta.secondary': 'How it works',

    'features.eyebrow': 'Why CreditScope',
    'features.title': 'Grounded in real policy, not guesswork',
    'features.1.title': 'Retrieval-grounded AI',
    'features.1.body':
      'Every assessment is grounded in real bank policy documents retrieved from a vector store — not a hallucinated guess.',
    'features.2.title': 'Full transparency',
    'features.2.body':
      'See exactly which policy excerpts were used to reach your risk score, with similarity scores, not a black box.',
    'features.3.title': 'Instant results',
    'features.3.body':
      'Submit once and get a risk score, risk level, and human-readable reasoning — automatically, in seconds.',

    'steps.eyebrow': 'How it works',
    'steps.title': 'From application to answer in three steps',
    'steps.1.title': 'Submit your application',
    'steps.1.body':
      'Tell us your monthly income, the amount you need, repayment period and any collateral you can offer.',
    'steps.2.title': 'Retrieval-augmented assessment',
    'steps.2.body':
      'An automated workflow embeds your request, retrieves the most relevant bank policy excerpts, and asks a local AI model to reason over them.',
    'steps.3.title': 'Get your grounded result',
    'steps.3.body':
      'A risk score, risk level and plain-language reasoning appear on your dashboard — along with the exact policy excerpts used.',

    'cta.title': 'Ready to see where you stand?',
    'cta.lead':
      'It takes less than two minutes to submit, and your risk assessment is grounded in real lending policy.',
    'cta.button': 'Start pre-assessment',

    'footer.tagline': 'A portfolio project — FastAPI, Angular/Nx, n8n and local AI, wired together end to end.',

    'form.eyebrow': 'Loan pre-assessment',
    'form.title': 'Tell us about your application',
    'form.section.applicant': 'Applicant',
    'form.full_name': 'Full name',
    'form.national_id': 'National ID',
    'form.monthly_income': 'Monthly income (Toman)',
    'form.job_title': 'Job title (optional)',
    'form.section.loan': 'Loan request',
    'form.requested_amount': 'Requested amount (Toman)',
    'form.repayment_months': 'Repayment period (months)',
    'form.section.collateral': 'Collateral',
    'form.collateral.add': 'Add collateral',
    'form.collateral.type': 'Asset type',
    'form.collateral.value': 'Estimated value (Toman)',
    'form.collateral.remove': 'Remove',
    'form.collateral.empty': 'No collateral added — this may affect your risk score.',
    'form.collateral.select_placeholder': 'Select a type…',
    'form.collateral.loading_types': 'Loading types…',
    'form.collateral.types_error': 'Could not load collateral types. Please refresh and try again.',
    'form.submit': 'Submit for assessment',
    'form.submitting': 'Submitting…',
    'form.error.required': 'This field is required',
    'form.error.min': 'Must be greater than 0',
    'form.error.generic': 'Something went wrong. Please check your details and try again.',

    'dash.eyebrow': 'Assessment result',
    'dash.title': 'Your risk assessment',
    'dash.pending.title': 'Your assessment is on its way',
    'dash.pending.body':
      'The AI is retrieving relevant policy and reasoning over your application. This usually takes a few seconds.',
    'dash.refresh': 'Check again',
    'dash.risk_score': 'Risk score',
    'dash.risk_level': 'Risk level',
    'dash.risk_level.low': 'Low risk',
    'dash.risk_level.medium': 'Medium risk',
    'dash.risk_level.high': 'High risk',
    'dash.reasoning': 'Reasoning',
    'dash.policy_reference': 'Policy reference',
    'dash.policies.title': 'How this decision was reached',
    'dash.policies.lead':
      'These are the exact bank policy excerpts the AI retrieved and grounded its answer in, ranked by similarity to your application.',
    'dash.policies.empty': 'No specific policy excerpts were matched for this application.',
    'dash.policies.score': 'match',

    'dash.outcome.approved.title': "Good news — you're approved",
    'dash.outcome.approved.body':
      'Your risk profile meets the bank\'s automatic approval threshold. Continue to confirm your final loan terms.',
    'dash.outcome.review.title': 'Under manual review',
    'dash.outcome.review.body':
      'Your application needs a closer look from a credit officer before a final decision is made.',
    'dash.outcome.rejected.title': 'Not approved right now',
    'dash.outcome.rejected.body':
      "Your current application doesn't meet the bank's risk policy — see what you can adjust below.",

    'dash.roadmap.title': 'Your loan journey',
    'dash.roadmap.lead': 'Where this application stands, and what happens next.',
    'dash.roadmap.step.register': 'Registration',
    'dash.roadmap.step.register.desc': 'Your account was created.',
    'dash.roadmap.step.apply': 'Loan application',
    'dash.roadmap.step.apply.desc': 'You submitted your loan request.',
    'dash.roadmap.step.collateral': 'Collateral review',
    'dash.roadmap.step.collateral.desc':
      'Your offered collateral was checked against the required coverage ratio.',
    'dash.roadmap.step.verify': 'Identity & risk verification',
    'dash.roadmap.step.verify.desc':
      'Your identity and risk profile were assessed by the AI engine.',
    'dash.roadmap.step.contract': 'Confirm & sign',
    'dash.roadmap.step.contract.desc': 'Review the final terms and sign your loan agreement.',
    'dash.roadmap.step.disbursement': 'Receive your loan',
    'dash.roadmap.step.disbursement.desc':
      'Funds are transferred to your account once the contract is signed.',
    'dash.roadmap.step.manual_review': 'Manual review',
    'dash.roadmap.step.manual_review.desc':
      'A credit officer is reviewing your application — this typically takes 1–2 business days.',
    'dash.roadmap.step.decision': 'Final decision',
    'dash.roadmap.step.decision.desc':
      "You'll be notified by SMS/email once the credit officer reaches a decision.",
    'dash.roadmap.step.rejected': 'Application rejected',
    'dash.roadmap.step.rejected.desc':
      "Based on the current details, this application doesn't meet the bank's risk policy.",
    'dash.roadmap.tips.title': 'What you can do next',
    'dash.roadmap.tips.coverage':
      "Increase your collateral's coverage ratio — gold and silver need at least 130% of the loan amount, crypto at least 150%.",
    'dash.roadmap.tips.amount':
      'Request a smaller amount, or extend the repayment period — both lower your monthly installment relative to income.',
    'dash.roadmap.tips.term':
      'Consider a lower-risk collateral type, such as a Sayad-registered check or salary deduction — both need only 100% coverage.',

    'dash.new': 'Start a new application',
    'dash.error': 'We could not find this application.',
  },
  fa: {
    'nav.brand': 'کردیت‌اسکوپ',
    'nav.apply': 'درخواست وام',
    'nav.lang': 'English',

    'hero.eyebrow': 'پیش‌ارزیابی وام با هوش مصنوعی',
    'hero.title': 'قبل از درخواست، ریسک وام خود را بدانید.',
    'hero.lead':
      'کردیت‌اسکوپ درآمد، مبلغ درخواستی و وثیقهٔ شما را بر اساس سیاست واقعی اعتباری بانک بررسی می‌کند و در چند ثانیه یک ارزیابی ریسک مستند و قابل توضیح ارائه می‌دهد.',
    'hero.cta': 'شروع پیش‌ارزیابی',
    'hero.cta.secondary': 'روند کار',

    'features.eyebrow': 'چرا کردیت‌اسکوپ',
    'features.title': 'مبتنی بر سیاست واقعی، نه حدس و گمان',
    'features.1.title': 'هوش مصنوعی مستندمحور',
    'features.1.body':
      'هر ارزیابی بر اساس اسناد واقعی سیاست اعتباری بانک که از یک پایگاه برداری بازیابی می‌شوند انجام می‌گیرد؛ نه یک حدس ساختگی.',
    'features.2.title': 'شفافیت کامل',
    'features.2.body':
      'دقیقاً ببینید کدام بندهای سیاست برای تعیین امتیاز ریسک شما استفاده شده‌اند، همراه با میزان تطابق؛ نه یک جعبهٔ سیاه.',
    'features.3.title': 'نتیجهٔ فوری',
    'features.3.body':
      'فقط یک‌بار درخواست دهید و امتیاز ریسک، سطح ریسک و توضیح قابل‌فهم را به‌صورت خودکار و در چند ثانیه دریافت کنید.',

    'steps.eyebrow': 'روند کار',
    'steps.title': 'از درخواست تا پاسخ، در سه مرحله',
    'steps.1.title': 'درخواست خود را ثبت کنید',
    'steps.1.body':
      'درآمد ماهانه، مبلغ درخواستی، مدت بازپرداخت و وثیقهٔ احتمالی خود را وارد کنید.',
    'steps.2.title': 'ارزیابی مبتنی بر بازیابی اسناد',
    'steps.2.body':
      'یک گردش‌کار خودکار درخواست شما را به بردار تبدیل کرده، مرتبط‌ترین بندهای سیاست بانک را بازیابی می‌کند و از یک مدل هوش مصنوعی محلی می‌خواهد بر اساس آن‌ها استدلال کند.',
    'steps.3.title': 'نتیجهٔ مستند خود را دریافت کنید',
    'steps.3.body':
      'امتیاز ریسک، سطح ریسک و استدلال به زبان ساده در داشبورد شما نمایش داده می‌شود؛ همراه با بندهای دقیق سیاست که استفاده شده‌اند.',

    'cta.title': 'آماده‌اید بدانید در چه وضعیتی هستید؟',
    'cta.lead':
      'ثبت درخواست کمتر از دو دقیقه زمان می‌برد و ارزیابی ریسک شما بر اساس سیاست واقعی اعتباری انجام می‌شود.',
    'cta.button': 'شروع پیش‌ارزیابی',

    'footer.tagline': 'یک نمونه‌کار — FastAPI، Angular/Nx، n8n و هوش مصنوعی محلی، به‌صورت یکپارچه به هم متصل شده‌اند.',

    'form.eyebrow': 'پیش‌ارزیابی وام',
    'form.title': 'دربارهٔ درخواست خود بگویید',
    'form.section.applicant': 'متقاضی',
    'form.full_name': 'نام و نام خانوادگی',
    'form.national_id': 'کد ملی',
    'form.monthly_income': 'درآمد ماهانه (تومان)',
    'form.job_title': 'شغل (اختیاری)',
    'form.section.loan': 'درخواست وام',
    'form.requested_amount': 'مبلغ درخواستی (تومان)',
    'form.repayment_months': 'مدت بازپرداخت (ماه)',
    'form.section.collateral': 'وثیقه',
    'form.collateral.add': 'افزودن وثیقه',
    'form.collateral.type': 'نوع دارایی',
    'form.collateral.value': 'ارزش تخمینی (تومان)',
    'form.collateral.remove': 'حذف',
    'form.collateral.empty': 'وثیقه‌ای اضافه نشده — این می‌تواند روی امتیاز ریسک شما تأثیر بگذارد.',
    'form.collateral.select_placeholder': 'یک نوع انتخاب کنید…',
    'form.collateral.loading_types': 'در حال بارگذاری…',
    'form.collateral.types_error': 'بارگذاری انواع وثیقه ممکن نشد. لطفاً صفحه را رفرش کنید.',
    'form.submit': 'ثبت برای ارزیابی',
    'form.submitting': 'در حال ثبت…',
    'form.error.required': 'این فیلد الزامی است',
    'form.error.min': 'باید بزرگ‌تر از صفر باشد',
    'form.error.generic': 'مشکلی پیش آمد. لطفاً اطلاعات را بررسی و دوباره تلاش کنید.',

    'dash.eyebrow': 'نتیجهٔ ارزیابی',
    'dash.title': 'ارزیابی ریسک شما',
    'dash.pending.title': 'ارزیابی شما در حال انجام است',
    'dash.pending.body':
      'هوش مصنوعی در حال بازیابی سیاست مرتبط و استدلال روی درخواست شماست. این معمولاً چند ثانیه طول می‌کشد.',
    'dash.refresh': 'بررسی مجدد',
    'dash.risk_score': 'امتیاز ریسک',
    'dash.risk_level': 'سطح ریسک',
    'dash.risk_level.low': 'ریسک پایین',
    'dash.risk_level.medium': 'ریسک متوسط',
    'dash.risk_level.high': 'ریسک بالا',
    'dash.reasoning': 'استدلال',
    'dash.policy_reference': 'ارجاع به سیاست',
    'dash.policies.title': 'این تصمیم چگونه گرفته شد',
    'dash.policies.lead':
      'این‌ها دقیقاً همان بندهای سیاست بانک هستند که هوش مصنوعی بازیابی کرده و پاسخ خود را بر اساس آن‌ها بنا نهاده، به ترتیب میزان تطابق با درخواست شما.',
    'dash.policies.empty': 'برای این درخواست، بند خاصی از سیاست پیدا نشد.',
    'dash.policies.score': 'تطابق',

    'dash.outcome.approved.title': 'خبر خوب — وام شما تأیید شد',
    'dash.outcome.approved.body':
      'پروفایل ریسک شما به آستانهٔ تأیید خودکار بانک رسیده است. برای تأیید شرایط نهایی وام ادامه دهید.',
    'dash.outcome.review.title': 'در حال بررسی دستی',
    'dash.outcome.review.body':
      'درخواست شما نیاز به بررسی دقیق‌تر توسط یک کارشناس اعتباری دارد تا تصمیم نهایی گرفته شود.',
    'dash.outcome.rejected.title': 'در حال حاضر تأیید نشد',
    'dash.outcome.rejected.body':
      'درخواست فعلی شما با سیاست ریسک بانک مطابقت ندارد — پیشنهادهای زیر را ببینید.',

    'dash.roadmap.title': 'مسیر وام شما',
    'dash.roadmap.lead': 'این درخواست الان کجاست، و مرحلهٔ بعدی چیست.',
    'dash.roadmap.step.register': 'ثبت‌نام',
    'dash.roadmap.step.register.desc': 'حساب کاربری شما ایجاد شد.',
    'dash.roadmap.step.apply': 'درخواست وام',
    'dash.roadmap.step.apply.desc': 'درخواست وام خود را ثبت کردید.',
    'dash.roadmap.step.collateral': 'بررسی ضمانت',
    'dash.roadmap.step.collateral.desc': 'وثیقهٔ ارائه‌شده با نسبت پوشش لازم بررسی شد.',
    'dash.roadmap.step.verify': 'احراز هویت و اعتبارسنجی',
    'dash.roadmap.step.verify.desc':
      'هویت و پروفایل ریسک شما توسط موتور هوش مصنوعی ارزیابی شد.',
    'dash.roadmap.step.contract': 'تأیید و امضای قرارداد',
    'dash.roadmap.step.contract.desc': 'شرایط نهایی را بررسی و قرارداد وام را امضا کنید.',
    'dash.roadmap.step.disbursement': 'دریافت وام',
    'dash.roadmap.step.disbursement.desc':
      'پس از امضای قرارداد، مبلغ وام به حساب شما واریز می‌شود.',
    'dash.roadmap.step.manual_review': 'بررسی دستی',
    'dash.roadmap.step.manual_review.desc':
      'یک کارشناس اعتباری در حال بررسی درخواست شماست — معمولاً ۱ تا ۲ روز کاری طول می‌کشد.',
    'dash.roadmap.step.decision': 'تصمیم نهایی',
    'dash.roadmap.step.decision.desc':
      'پس از تصمیم‌گیری کارشناس اعتباری، از طریق پیامک یا ایمیل مطلع خواهید شد.',
    'dash.roadmap.step.rejected': 'درخواست رد شد',
    'dash.roadmap.step.rejected.desc':
      'بر اساس اطلاعات فعلی، این درخواست با سیاست ریسک بانک مطابقت ندارد.',
    'dash.roadmap.tips.title': 'چه کاری می‌توانید انجام دهید',
    'dash.roadmap.tips.coverage':
      'نسبت پوشش وثیقهٔ خود را افزایش دهید — طلا و نقره حداقل به ۱۳۰٪ و رمزارز به ۱۵۰٪ مبلغ وام نیاز دارند.',
    'dash.roadmap.tips.amount':
      'مبلغ درخواستی را کاهش دهید یا مدت بازپرداخت را افزایش دهید — هر دو، قسط ماهانه را نسبت به درآمد شما پایین می‌آورند.',
    'dash.roadmap.tips.term':
      'نوع وثیقه‌ای با ریسک کمتر در نظر بگیرید، مثل چک صیادی یا کسر از حقوق — که فقط به ۱۰۰٪ پوشش نیاز دارند.',

    'dash.new': 'ثبت درخواست جدید',
    'dash.error': 'این درخواست پیدا نشد.',
  },
};
