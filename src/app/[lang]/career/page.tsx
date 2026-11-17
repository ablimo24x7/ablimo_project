import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  hasLocale,
  defaultLocale,
  type Locale,
  localeBase,
  localeHome,
} from "@/app/[lang]/dictionaries";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/seo/StructuredData";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const isAr = locale === "ar";

  return generateSeoMetadata({
    title: isAr ? "الوظائف في AB" : "Careers at AB",
    description: isAr
      ? "اعمل مع AB في السعودية والإمارات وقطر والهند، وابنِ مسارك المهني في قطاع النقل الفاخرة."
      : "AB hires chauffeurs, drivers, dispatchers, fleet and operations staff in Saudi Arabia, the UAE and Qatar.",
    path: "/career",
    lang,
    keywords:
      "AB careers, chauffeur jobs, driver jobs, Gulf recruitment, Saudi Arabia jobs, UAE jobs, Qatar jobs",
  });
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const isAr = locale === "ar";

  const whyItems = isAr
    ? [
        ["عمل بعقد مكتوب", "يُمنح السائقون عملاء برامج مجدولة ويعملون وفق عقد مكتوب."],
        ["عمل له أثر", "تنقل رحلات أصحاب المكاتب التنفيذية والوفود الحكومية وضيوف الفعاليات والحجاج."],
        ["معيار تدريب واضح", "يتدرب السائقون الجدد على معايير AB للقيادة: معرفة المسارات وآداب الضيوف والقيادة الدفاعية والسلامة."],
        ["دعم طوال اليوم", "يعمل مركز العمليات في الرياض على مدار الساعة لمعالجة التأخير وتعطل المركبات وحالات الطوارئ."],
        ["مسارات للنمو", "تتاح فرص التطور في الخدمات الاحترافية والعمليات والإشراف وإدارة البلدان."],
        ["توظيف عادل", "لا نتقاضى رسوماً من المرشحين ولا نحتفظ بجوازات السفر."],
      ]
    : [
        ["Salaried, contracted work", "Chauffeurs and drivers work under a written contract and a monthly salary for scheduled programmes, rather than being paid per ride."],
        ["Work that matters", "You transport executives, government delegations, event guests and pilgrimage groups across carefully planned programmes."],
        ["Training and a clear standard", "Every new chauffeur completes AB induction covering route knowledge, guest protocol, defensive driving and safety."],
        ["Support around the clock", "The Riyadh operations centre operates 24/7. When a flight is delayed or a vehicle has a problem, a dispatcher is on hand."],
        ["Room to grow", "Chauffeurs can progress toward senior chauffeur, VIP protocol, trainer and dispatcher roles. Operations staff can progress into supervisory and country-management roles."],
        ["Fair recruitment", "We never charge a recruitment fee and we do not keep your passport. Overseas hires receive their contract in a language they understand."],
      ];

  const countries = isAr
    ? [
        ["الوظائف في السعودية", "يوظف AB سائقين تشرفيين وسائقي حافلات وموظفين للعمليات والإرسال في الرياض وجدة والدمام ومكة والمدينة والعلا ونيوم، وفقاً للاحتياجات الحالية."],
        ["الوظائف في الإمارات", "يوظف AB سائقي الخدمات الفاخرة والحافلات وموظفي العمليات في دبي وأبوظبي، مع العمل في جميع إمارات الدولة."],
        ["الوظائف في قطر", "يوظف AB سائقي الخدمات الفاخرة والحافلات وموظفي نقل الفعاليات في الدوحة."],
        ["التوظيف من الهند", "الهند من الأسواق الرئيسية لتوظيف السائقين للعمل في السعودية والإمارات وقطر. الترشيح من AB أو الشركاء المعتمدين لا يتكلف المرشح رسوماً."],
        ["التوظيف الدولي", "نوظف سائقين محترفين ذوي خبرة خارج الخليج حسب احتياجات كل دور والمؤهلات المطلوبة لكل سوق."],
      ]
    : [
        ["Jobs in Saudi Arabia", "AB hires chauffeurs, bus drivers, dispatchers and operations staff in Saudi Arabia. Current opportunities may be based in Riyadh, Jeddah, Dammam, Makkah, Madinah, AlUla and NEOM."],
        ["Jobs in the UAE", "AB hires chauffeurs, bus and coach drivers and operations staff in Dubai and Abu Dhabi, with work across all seven emirates."],
        ["Jobs in Qatar", "AB hires chauffeurs, bus drivers and event transport staff in Doha."],
        ["Recruiting from India", "India is one of our main recruitment markets for chauffeurs and bus drivers working in Saudi Arabia, the UAE and Qatar. Candidates pay no fee to AB or our approved recruitment partners."],
        ["International recruitment", "AB also recruits experienced chauffeurs and drivers from outside the Gulf for roles that specifically offer international recruitment."],
      ];

  const hiringSteps = isAr
    ? [
        "قدّم سيرتك الذاتية ورخصة القيادة ونسخة من جواز السفر للمناصب المتاحة.",
        "يتم إجراء مكالمة فحص بالإنجليزية، أو العربية أو الهندية متى كانت متاحة.",
        "قد يتبع ذلك تقييم قيادة واختبار لغة بحسب الدور.",
        "تتلقى عرضاً مكتوباً وعقداً كاملاً بالراتب والسكن وساعات العمل والإجازة بلغة تفهمها.",
        "يتم ترتيب إجراءات التأشيرة والتأمين والسفر وفق اشتراطات البلد وإمكانات العرض.",
        "بعد الوصول، نستقبل المرشح ونساند إجراءات الإقامة والرخصة والتدريب قبل أول مهمة.",
      ]
    : [
        "Apply with your CV, driving licence and passport copy.",
        "Take a screening call in English, with Arabic or Hindi where available.",
        "Complete any required driving and language assessment.",
        "Receive a written offer and full contract, including salary, accommodation, working hours and leave, in a language you understand.",
        "Complete the visa, medical and travel process only after the contract terms are agreed.",
        "On arrival, complete any required residency, local licence and AB chauffeur induction before your first assignment.",
      ];

  const faqs = isAr
    ? [
        ["هل تتقاضى AB رسماً للتوظيف؟", "لا. لا تتقاضى AB ولا شركاؤها المعتمدون أي رسوم مقابل الوظيفة أو التأشيرة أو الفحص الطبي أو التذكرة."],
        ["هل ترعى AB تأشيرات العمل للسائقين؟", "نعم، للأدوار المحددة كخدمات توظيف دولي. تبقى الشروط والبلد والتأشيرة مفصلة في صفحة كل وظيفة."],
        ["هل يمكن لسائقي الهند التقدم؟", "نعم. تقدم الهند عبر المنصة أو شريك معتمد مشارك في هذه الصفحة. لا يدفع المرشح أي رسوم."],
        ["هل يجب التحدث بالعربية؟", "لا. يتطلب العمل كسائق مستوى جيداً من الإنجليزية، بينما تعد العربية ميزة إضافية."],
        ["هل السائقون موظفون أم متعاقدون؟", "يتمتع سائقو AB بعقد عمل مكتوب ورواتب شهرية للأدوار الدائمة."],
        ["كيف أعرف أن العرض حقيقي؟", "تأتي العروض الحقيقية من عنوان بريد @ab.limo أو من شريك توظيف مدرج لدى AB، ولا تطلب أي دفعة مالية."],
      ]
    : [
        ["Does AB charge a recruitment fee?", "No. AB and our approved recruitment partners never charge candidates a fee for a job, visa, medical or ticket."],
        ["Does AB sponsor work visas for drivers from abroad?", "Yes, for roles marked as hiring from abroad. Sponsorship terms and the destination country are confirmed on the individual job page."],
        ["Can Indian drivers apply for jobs with AB?", "Yes. Indian candidates can apply online or through an approved recruitment partner. Candidates pay no fee."],
        ["Do I need to speak Arabic?", "No. A good standard of English is required for chauffeur roles. Arabic is an advantage."],
        ["Are chauffeurs employees or freelancers?", "Chauffeurs are engaged on a written contract with a monthly salary."],
        ["How do I know a job offer is genuine?", "Genuine offers come from an @ab.limo email address or a recruitment partner listed by AB. They never ask for money."],
      ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: isAr ? "الرئيسية" : "Home", url: localeHome(lang) },
          { name: isAr ? "الوظائف" : "Careers", url: `${localeBase(lang)}/career` },
        ]}
      />
      <FAQJsonLd items={faqs.map(([question, answer]) => ({ question, answer }))} />

      <main className="min-h-screen bg-[#292a30] text-white">
        <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
            alt={isAr ? "فريق عمل AB" : "AB team"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#292a30]/70 via-[#292a30]/50 to-[#292a30]" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gray-200">
              {isAr ? "الوظائف · السعودية والإمارات وقطر والتوظيف الدولي" : "Careers · Saudi Arabia, UAE, Qatar and international recruitment"}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide leading-tight">
              {isAr ? "الوظائف في AB" : "Careers at AB"}
            </h1>
            <p className="mx-auto max-w-4xl text-lg md:text-xl leading-relaxed text-gray-200">
              {isAr
                ? "يوظف AB سائقي خدمات فاخرة وسائقين وموظفي إرسال وأساطيل وعمليات وفرق مؤسسية في السعودية والإمارات وقطر. نوظف محلياً ومن الخارج ولا نتقاضى رسوماً للتوظيف."
                : "AB hires chauffeurs, drivers, dispatchers, fleet and operations staff, and corporate teams in Saudi Arabia, the UAE and Qatar. We recruit locally and from abroad, and we never charge candidates a recruitment fee."}
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-base text-gray-300">
              {isAr
                ? "مكتبنا الرئيس ومركز عملياتنا يعملان في الرياض، ولنا مكاتب في دبي وأبوظبي والدوحة."
                : "Our head office and 24/7 operations centre are in Riyadh, with offices in Dubai, Abu Dhabi and Doha."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#open-roles" className="bg-white text-[#292a30] px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider">
                {isAr ? "عرض المناصب" : "See open roles"}
              </a>
              <a href="#how-we-hire" className="border border-white/70 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-[#292a30] transition-colors">
                {isAr ? "التقديم كسائق" : "Apply as a chauffeur or driver"}
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-300">
              {isAr ? "لا توجد رسوم توظيف · تدريب وفق معيار سائق AB" : "No recruitment fees, ever · Training on the AB Chauffeur Standard"}
            </p>
          </div>
        </section>

        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {isAr ? "لماذا تبني مسيرتك المهنية في AB" : "Why people build their careers at AB"}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                {isAr
                  ? "نخطط رحلات كبار المسؤولين والوفود الحكومية وضيوف الفعاليات والحجاج مسبقاً، ويعتمد نجاح كل رحلة على الأشخاص خلف المقود وفي غرفة التحكم."
                  : "We move executives, government delegations, event guests and work crews across the Gulf. Every journey depends on the people behind the wheel and in the control room."}
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt={isAr ? "فريق AB يتعاون" : "AB team collaborating"}
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {whyItems.map(([title, description]) => (
              <article key={title} className="bg-[#1c1d21] p-7 rounded-lg border border-gray-700/50">
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-24 bg-[#1c1d21]">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              {isAr ? "الفرق التي نوظف لها" : "Teams we hire for"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                isAr ? "السائقون وسائقي الحافلات" : "Chauffeurs and bus drivers",
                isAr ? "الإرسال وغرفة التحكم" : "Dispatch and control room",
                isAr ? "الأسطول والصيانة" : "Fleet and maintenance",
                isAr ? "الفعاليات ونقل الحشود" : "Events and group transport",
                isAr ? "خدمة العملاء والمبيعات" : "Customer service and sales",
                isAr ? "الموارد البشرية والمحاسبة والقانون" : "People, finance and legal",
              ].map((team) => (
                <div key={team} className="bg-[#292a30] border border-gray-700/50 rounded-lg p-6 text-center font-semibold">
                  {team}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {isAr ? "الوظائف حسب البلد" : "Jobs by country"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {countries.map(([title, description]) => (
              <article key={title} className="bg-[#1c1d21] border border-gray-700/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-24 bg-[#1c1d21]">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-10">
              {isAr ? "الانتقال إلى الخليج للقيادة مع AB" : "Moving to the Gulf to drive with AB"}
            </h2>
            <p className="text-gray-300 mb-10 max-w-3xl">
              {isAr
                ? "إذا كنت سائقاً ذا خبرة خارج الخليج، فهكذا تتم عملية التوظيف من الطلب الأول وحتى المهمة الأولى."
                : "If you are an experienced driver outside the Gulf, this is how hiring works, from your first application to your first trip."}
            </p>
            <ol className="grid md:grid-cols-2 gap-6">
              {hiringSteps.map((step, index) => (
                <li key={step} className="bg-[#292a30] border border-gray-700/50 rounded-lg p-6">
                  <span className="text-gray-500 text-sm">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-gray-200 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 rounded-lg border border-white/20 p-8">
              <h3 className="text-2xl font-bold mb-6">{isAr ? "تعهدنا بالتوظيف العادل" : "Our fair-recruitment pledge"}</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
                {(isAr
                  ? ["لا رسوم: لا تتقاضى AB أو شركاؤها رسماً مقابل الوظيفة أو التأشيرة أو التذكرة.", "تبقى مستنداتك ملكك: لا نحتفظ بجواز السفر.", "لا تغيير للعقد: العقد الذي توقعه هو العقد الذي يعمل عليه.", "دفع الأجور في موعدها إلى حسابك البنكي."]
                  : ["No fees: AB and our recruitment partners never charge candidates a fee for a job, visa or ticket.", "Your documents stay yours: we do not hold your passport.", "No contract switching: the contract you sign is the contract you work under.", "Wages are paid on time into your own bank account."]
                ).map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                {isAr ? "المؤهلات المطلوبة للسائقين" : "What we look for in chauffeurs and drivers"}
              </h2>
              <ul className="space-y-4 text-gray-300">
                {(isAr
                  ? ["مهارات قيادة احترافية وخبرة مناسبة لنوع المركبة.", "رخصة سارية للمركبة والبلد المطلوب.", "إنجليزية جيدة للتواصل مع الضيوف وفرق العمليات.", "معرفة بالطرق والمطارات والفنادق ميزة إضافية.", "شهادة قيادة دفاعية أو إسعافات أولية ميزة إضافية."]
                  : ["Professional driving experience appropriate to the vehicle type.", "A valid licence for the destination market and vehicle class.", "Good English for guest and operations communication.", "Knowledge of Riyadh, Jeddah, Dubai, Abu Dhabi or Doha roads is useful.", "Defensive-driving or first-aid certificates are useful extras."]
                ).map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
            <div id="how-we-hire">
              <h2 className="text-4xl font-bold mb-8">{isAr ? "كيف نوظف" : "How we hire"}</h2>
              <ol className="space-y-4 text-gray-300">
                {(isAr
                  ? ["قدم طلبك أو أرسل سيرتك الذاتية.", "نراجع الطلب ونقابل المرشح المناسب.", "تشمل مقابلة سائقين اختبار قيادة عند الحاجة.", "تصدر عرضاً مكتوباً بالشروط الكاملة.", "يلي ذلك إنهاء المستندات والتدريب والمهمة الأولى."]
                  : ["Apply to an open role or send your CV.", "We review applications and respond to suitable candidates.", "Driver interviews may include a driving assessment.", "Receive a written offer with the full terms.", "Complete documentation, training and your first assignment."]
                ).map((item, index) => (
                  <li key={item}><span className="font-bold text-white me-3">{index + 1}.</span>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="open-roles" className="py-24 bg-[#1c1d21]">
          <div className="max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{isAr ? "المناصب المفتوحة" : "Open roles"}</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              {isAr
                ? "لا توجد مناصب مطابقة حالياً. أرسل سيرتك الذاتية وسنتواصل معك عند توفر دور مناسب."
                : "No open roles match your search right now. Send your CV and we'll contact you when a suitable role becomes available."}
            </p>
            <a
              href="mailto:hello@ab.limo?subject=Career%20application"
              className="inline-block bg-white text-[#292a30] px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              {isAr ? "إرسال السيرة الذاتية" : "Send your CV"}
            </a>
          </div>
        </section>

        <section className="py-24 px-8 max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            {isAr ? "احذر عروض التوظيف المزيفة" : "Beware of fake AB job offers"}
          </h2>
          <div className="bg-[#1c1d21] border border-gray-700/50 rounded-lg p-8 text-center">
            <p className="text-gray-300 leading-relaxed">
              {isAr
                ? "لا تطلب AB أي مال مقابل الوظيفة أو التأشيرة أو الفحص أو التدريب أو التذكرة. تأتي العروض الحقيقية من عنوان @ab.limo أو شريك توظيف معتمد لدى AB."
                : "AB never asks candidates for money for a job, visa, medical, training or ticket. Genuine AB offers come from an @ab.limo email address or a recruitment partner listed by AB."}
            </p>
            <p className="mt-5 text-gray-400">
              {isAr
                ? "إذا طلب منك شخص دفع مال أو عرض وظيفة عبر واتساب دون مقابلة، فلا تدفع. بلغ الجهات المختصة في بلدك."
                : "If anyone asks you to pay or offers a job over WhatsApp without an interview, do not pay. Report the matter to your local police or labour authority."}
            </p>
          </div>
        </section>

        <section className="py-24 bg-[#1c1d21]">
          <div className="max-w-5xl mx-auto px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              {isAr ? "أسئلة التوظيف" : "Careers questions"}
            </h2>
            <div className="space-y-4">
              {faqs.map(([question, answer]) => (
                <details key={question} className="bg-[#292a30] border border-gray-700/50 rounded-lg p-6">
                  <summary className="font-bold cursor-pointer">{question}</summary>
                  <p className="mt-4 text-gray-300 leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {isAr ? "تبحث عن دور سائق محترف؟" : "Looking to become a professional chauffeur?"}
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            {isAr
              ? "تقدم لسائقي AB ونمِ مسيرتك المهنية وفق معيار واضح ودعم تشغيلي على مدار الساعة."
              : "Apply for a role with AB and build your career under a clear professional standard with 24/7 operations support."}
          </p>
          <Link
            href={`${localeBase(lang)}/partners`}
            className="inline-block bg-white text-[#292a30] px-10 py-4 text-sm font-semibold uppercase tracking-wider rounded-full"
          >
            {isAr ? "تعرف على AB للشركاء" : "View AB partner opportunities"}
          </Link>
        </section>
      </main>
    </>
  );
}
