import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import BlurText from "@/components/ReactBits/BlurText";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookies Policy — CDNCore" }] }),
  component: CookiesPage,
});

function CookiesPage() {
  const { t } = useTranslation();
  return (
    <div className="container-prose pt-28 pb-24 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-10">
        <ArrowLeft size={16} /> {t('legal_back_home')}
      </Link>

      <BlurText text={t('cookies_title')} delay={60} animateBy="words" direction="top" className="font-display text-4xl md:text-5xl text-foreground mb-3" />
      <p className="text-sm text-muted-foreground mb-12">{t('legal_last_updated')}</p>

      <div className="space-y-10 legal-prose">
        <section>
          <h2>{t('cookies_s1_title')}</h2>
          <p>{t('cookies_s1_body')}</p>
        </section>

        <section>
          <h2>{t('cookies_s2_title')}</h2>
          <table>
            <thead>
              <tr>
                <th>{t('cookies_s2_col_type')}</th>
                <th>{t('cookies_s2_col_purpose')}</th>
                <th>{t('cookies_s2_col_duration')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('cookies_s2_row1_type')}</td>
                <td>{t('cookies_s2_row1_purpose')}</td>
                <td>{t('cookies_s2_row1_dur')}</td>
              </tr>
              <tr>
                <td>{t('cookies_s2_row2_type')}</td>
                <td>{t('cookies_s2_row2_purpose')}</td>
                <td>{t('cookies_s2_row2_dur')}</td>
              </tr>
              <tr>
                <td>{t('cookies_s2_row3_type')}</td>
                <td>{t('cookies_s2_row3_purpose')}</td>
                <td>{t('cookies_s2_row3_dur')}</td>
              </tr>
              <tr>
                <td>{t('cookies_s2_row4_type')}</td>
                <td>{t('cookies_s2_row4_purpose')}</td>
                <td>{t('cookies_s2_row4_dur')}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>{t('cookies_s3_title')}</h2>
          <p>{t('cookies_s3_body')}</p>
        </section>

        <section>
          <h2>{t('cookies_s4_title')}</h2>
          <p>{t('cookies_s4_body')}</p>
        </section>

        <section>
          <h2>{t('cookies_s5_title')}</h2>
          <div className="contact-box">
            <p>{t('cookies_s5_body')}</p>
            <p><strong>Email:</strong> privacy@cdncore.eu</p>
          </div>
        </section>
      </div>
    </div>
  );
}
