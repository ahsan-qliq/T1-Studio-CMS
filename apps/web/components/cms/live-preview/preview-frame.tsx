import { cn } from "@workspace/ui/lib/utils"
import type { Language, Viewport } from "@/types/cms"

interface PreviewFrameProps {
  viewport: Viewport
  language: Language
}

export function PreviewFrame({ viewport, language }: PreviewFrameProps) {
  const isRtl = language === "ar"

  return (
    <div
      className={cn(
        "flex-1 overflow-hidden transition-all",
        viewport === "mobile" ? "mx-auto w-[375px]" : viewport === "tablet" ? "mx-auto w-[768px]" : "w-full"
      )}
      aria-label={`Website preview in ${viewport} viewport, ${language === "en" ? "English" : "Arabic"}`}
    >
      <div
        dir={isRtl ? "rtl" : "ltr"}
        lang={language}
        className="h-full overflow-y-auto bg-white text-sm"
      >
        {/* Mock nav */}
        <nav className="flex items-center justify-between bg-zinc-900 px-6 py-3" aria-label="Site navigation">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-amber-400" aria-hidden="true" />
            <span className="text-xs font-bold tracking-wider text-white">T1 STUDIO</span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            {["Projects", "Services", "About", "Contact"].map((item) => (
              <span key={item} className="cursor-pointer text-[10px] font-medium text-zinc-400 hover:text-white">
                {isRtl
                  ? item === "Projects"
                    ? "المشاريع"
                    : item === "Services"
                    ? "الخدمات"
                    : item === "About"
                    ? "عن الشركة"
                    : "التواصل"
                  : item}
              </span>
            ))}
          </div>
          <button className="rounded bg-amber-400 px-3 py-1 text-[10px] font-bold text-zinc-900">
            {isRtl ? "احجز استشارة" : "Book Consultation"}
          </button>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden bg-zinc-900 px-6 py-12">
          <div className="mx-auto max-w-2xl">
            <p className="mb-2 text-[10px] uppercase tracking-widest text-amber-400">
              {isRtl ? "مكتب التصميم الداخلي" : "Interior Design Studio"}
            </p>
            <h1 className="mb-4 text-xl font-bold leading-tight text-white md:text-2xl">
              {isRtl ? "مساحات يُعبّر عنها الناس" : "Spaces People Belong In"}
            </h1>
            <p className="mb-6 text-xs leading-relaxed text-zinc-400">
              {isRtl
                ? "نصمم مساحات تعكس هويتك وتُلهم يومياتك."
                : "We design environments that reflect your identity and inspire your daily life."}
            </p>
            <div className="flex gap-3">
              <button className="rounded bg-amber-400 px-4 py-1.5 text-[10px] font-bold text-zinc-900">
                {isRtl ? "تصفح المشاريع" : "View Projects"}
              </button>
              <button className="rounded border border-white/20 px-4 py-1.5 text-[10px] font-medium text-white">
                {isRtl ? "عن الشركة" : "Our Story"}
              </button>
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute right-6 top-6 h-24 w-24 rounded-lg bg-amber-400/10 md:h-40 md:w-40" aria-hidden="true" />
        </section>

        {/* Stats */}
        <section className="border-b border-zinc-100 bg-white px-6 py-6">
          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4 text-center">
            {[
              { en: "250+", label: isRtl ? "مشروع" : "Projects" },
              { en: "12+", label: isRtl ? "سنة خبرة" : "Years Experience" },
              { en: "98%", label: isRtl ? "رضا العملاء" : "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-bold text-zinc-900">{stat.en}</p>
                <p className="text-[10px] text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Signature Projects */}
        <section className="bg-zinc-50 px-6 py-8">
          <div className="mx-auto max-w-2xl">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-amber-500">
              {isRtl ? "أعمالنا" : "Our Work"}
            </p>
            <h2 className="mb-4 text-base font-bold text-zinc-900">
              {isRtl ? "المشاريع المميزة" : "Signature Projects"}
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { title: isRtl ? "بلو ووترز دبي" : "Blue Waters Dubai", location: isRtl ? "دبي، الإمارات" : "Dubai, UAE" },
                { title: isRtl ? "بوابة الإمارات" : "Emirates Gate", location: isRtl ? "أبوظبي، الإمارات" : "Abu Dhabi, UAE" },
                { title: isRtl ? "الياسمين" : "Al Yasmeen", location: isRtl ? "الشارقة، الإمارات" : "Sharjah, UAE" },
              ].map((proj) => (
                <div key={proj.title} className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
                  <div className="h-20 bg-gradient-to-br from-zinc-200 to-zinc-300" aria-hidden="true" />
                  <div className="p-3">
                    <p className="text-[11px] font-semibold text-zinc-900">{proj.title}</p>
                    <p className="text-[10px] text-zinc-500">{proj.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="rounded border border-zinc-900 px-4 py-1.5 text-[10px] font-medium text-zinc-900 hover:bg-zinc-900 hover:text-white">
                {isRtl ? "عرض جميع المشاريع" : "View All Projects"}
              </button>
            </div>
          </div>
        </section>

        {/* Footer stub */}
        <footer className="bg-zinc-900 px-6 py-6 text-center">
          <p className="text-[10px] text-zinc-500">
            {isRtl ? "© ٢٠٢٥ استوديو T1. جميع الحقوق محفوظة." : "© 2025 T1 Studio. All rights reserved."}
          </p>
        </footer>
      </div>
    </div>
  )
}
