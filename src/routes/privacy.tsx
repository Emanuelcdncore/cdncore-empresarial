import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import BlurText from "@/components/ReactBits/BlurText";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — CDNCore" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="container-prose pt-28 pb-24 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-10">
        <ArrowLeft size={16} /> {t('legal_back_home')}
      </Link>

      <BlurText text={t('privacy_title')} delay={60} animateBy="words" direction="top" className="font-display text-4xl md:text-5xl text-foreground mb-3" />
      <p className="text-sm text-muted-foreground mb-12">{t('legal_last_updated')}</p>

      <div className="space-y-10 legal-prose">
        <section>
          <h2>{t('privacy_s1_title')}</h2>
          <p>{t('privacy_s1_body')}</p>
        </section>

        <section>
          <h2>{t('privacy_s2_title')}</h2>
          <p>{t('privacy_s2_body')}</p>
          <ul>
            <li>{t('privacy_s2_li1')}</li>
            <li>{t('privacy_s2_li2')}</li>
            <li>{t('privacy_s2_li3')}</li>
          </ul>
        </section>

        <section>
          <h2>{t('privacy_s3_title')}</h2>
          <p>{t('privacy_s3_body')}</p>
        </section>

        <section>
          <h2>{t('privacy_s4_title')}</h2>
          <p>{t('privacy_s4_body')}</p>
        </section>

        <section>
          <h2>{t('privacy_s5_title')}</h2>
          <div className="contact-box">
            <p>{t('privacy_s5_body')}</p>
            <p><strong>Email:</strong> privacy@cdncore.eu</p>
            <p>{t('privacy_s5_address')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
