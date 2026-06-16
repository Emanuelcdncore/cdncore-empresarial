import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import BlurText from "@/components/ReactBits/BlurText";
import ScrollReveal from "@/components/ReactBits/ScrollReveal";
import ShinyText from "@/components/ReactBits/ShinyText";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CDNCore" },
      { name: "description", content: "Request a confidential executive briefing with CDNCore's senior partners." },
      { property: "og:title", content: "Contact — CDNCore" },
      { property: "og:description", content: "Confidential briefings, led by senior partners, tailored to your operating context." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <section className="container-prose pt-24 md:pt-32 pb-12">
        <p className="eyebrow">{t('contact_hero_eyebrow')}</p>
        <div className="rule-gold mt-6 max-w-4xl">
          <BlurText
            text={t('contact_hero_heading')}
            delay={75}
            animateBy="words"
            direction="top"
            className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground"
          />
        </div>
        <div className="mt-10 max-w-2xl">
          <ScrollReveal
            enableBlur
            baseOpacity={0.08}
            baseBlur={4}
            containerClassName="text-lg text-muted-foreground leading-[1.75]"
            wordAnimationEnd="bottom 80%"
          >
            {t('contact_hero_body')}
          </ScrollReveal>
        </div>
      </section>

      <section className="container-prose pb-32 grid md:grid-cols-12 gap-16">
        <div className="md:col-span-7">
          {submitted ? (
            <div className="hairline-t hairline-b py-16 text-center">
              <p className="eyebrow text-accent">{t('contact_success_eyebrow')}</p>
              <h2 className="mt-6 font-display text-3xl">{t('contact_success_heading')}</h2>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                {t('contact_success_body')}
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="hairline-t divide-y divide-hairline"
            >
              {[
                { id: "name", label: t('contact_form_name'), type: "text" },
                { id: "title", label: t('contact_form_title_role'), type: "text" },
                { id: "org", label: t('contact_form_org'), type: "text" },
                { id: "email", label: t('contact_form_email'), type: "email" },
              ].map((f) => (
                <div key={f.id} className="grid grid-cols-12 gap-4 py-5 items-baseline">
                  <label htmlFor={f.id} className="col-span-12 md:col-span-3 eyebrow">{f.label}</label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    className="col-span-12 md:col-span-9 bg-transparent border-0 border-b border-hairline focus:border-accent focus:outline-none py-2 text-base"
                  />
                </div>
              ))}
              <div className="grid grid-cols-12 gap-4 py-5 items-baseline">
                <label htmlFor="topic" className="col-span-12 md:col-span-3 eyebrow">{t('contact_form_topic')}</label>
                <select id="topic" className="col-span-12 md:col-span-9 bg-transparent border-0 border-b border-hairline focus:border-accent focus:outline-none py-2 text-base">
                  <option>{t('contact_topic_ai')}</option>
                  <option>{t('contact_topic_cyber')}</option>
                  <option>{t('contact_topic_ops')}</option>
                  <option>{t('contact_topic_data')}</option>
                  <option>{t('contact_topic_loritalk')}</option>
                  <option>{t('contact_topic_atlaseye')}</option>
                  <option>{t('contact_topic_ai_accountant')}</option>
                  <option>{t('contact_topic_research')}</option>
                </select>
              </div>
              <div className="grid grid-cols-12 gap-4 py-5 items-baseline">
                <label htmlFor="msg" className="col-span-12 md:col-span-3 eyebrow">{t('contact_form_context')}</label>
                <textarea
                  id="msg" rows={4}
                  className="col-span-12 md:col-span-9 bg-transparent border-0 border-b border-hairline focus:border-accent focus:outline-none py-2 text-base resize-none"
                  placeholder={t('contact_form_context_placeholder')}
                />
              </div>
              <div className="pt-8">
                <button
                  type="submit"
                  className="text-sm uppercase tracking-[0.22em] border-b border-foreground pb-1 hover:border-accent hover:text-accent"
                >
                  <ShinyText text={t('contact_form_submit')} speed={3} color="currentColor" shineColor="#b8a9ff" spread={90} />
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="md:col-span-4 md:col-start-9 space-y-10">
          <div>
            <p className="eyebrow">{t('contact_sidebar_office_label')}</p>
            <p className="mt-4 font-display text-2xl leading-snug">
              CDNCore Technology Group<br />European Union
            </p>
          </div>
          <div>
            <p className="eyebrow">{t('contact_sidebar_channel_label')}</p>
            <p className="mt-4 text-sm">briefings@cdncore.eu</p>
          </div>
          <div>
            <p className="eyebrow">{t('contact_sidebar_press_label')}</p>
            <p className="mt-4 text-sm">press@cdncore.eu</p>
          </div>
          <div className="hairline-t pt-8">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('contact_sidebar_footer')}
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
