import footerLogo from "@/assets/CDNCORE-03_footer.png";
import sponsorsImg from "@/assets/footer-sponsors.webp";
import iefpImg from "@/assets/footer-iefp.png";
import { CustomMap } from "@/components/CustomMap";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useTranslation } from 'react-i18next';

function NavA({ to, hash, children, className }: { to: string; hash?: string; children: React.ReactNode; className?: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const onSamePage = location.pathname === to;

    if (hash) {
      if (onSamePage) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate({ to }).then(() => {
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        });
      }
    } else {
      if (onSamePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate({ to });
      }
    }
  };

  return (
    <a
      href={hash ? `${to}#${hash}` : to}
      onClick={handleClick}
      className={className ?? "hover:text-accent transition-colors"}
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary/60 hairline-t text-foreground">

      {/* Top links grid */}
      <div className="container-prose py-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="eyebrow mb-4">{t('footer_services')}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><NavA to="/services" className="hover:text-accent transition-colors font-medium text-foreground/70">{t('footer_services')}</NavA></li>
            <li><NavA to="/services" hash="services-cybersecurity" className="hover:text-accent transition-colors pl-3">{t('footer_cyber')}</NavA></li>
            <li><NavA to="/services" hash="services-ai" className="hover:text-accent transition-colors pl-3">{t('footer_ai')}</NavA></li>
            <li><NavA to="/services" hash="services-data" className="hover:text-accent transition-colors pl-3">{t('footer_data')}</NavA></li>
            <li><NavA to="/services" hash="services-rd" className="hover:text-accent transition-colors pl-3">{t('footer_rd')}</NavA></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">{t('footer_company')}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><NavA to="/about">{t('footer_company')}</NavA></li>
            <li><NavA to="/" hash="doctrine">{t('footer_mission')}</NavA></li>
            <li><NavA to="/team">{t('footer_team')}</NavA></li>
            <li><NavA to="/research">{t('nav_research')}</NavA></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">{t('footer_legal')}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><NavA to="/privacy">{t('footer_privacy')}</NavA></li>
            <li><NavA to="/terms">{t('footer_terms')}</NavA></li>
            <li><NavA to="/cookies">{t('footer_cookies')}</NavA></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">{t('footer_contacts')}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Parkurbis</li>
            <li>Parque da Ciência e Tecnologia da Covilhã</li>
            <li>6200-865 Covilhã</li>
            <li>
              <a href="tel:+351275959168" className="hover:text-accent transition-colors">
                +351 275 959 168
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Map */}
      <div className="container-prose pb-10">
        <div className="overflow-hidden rounded-sm hairline-t hairline-b">
          <CustomMap />
        </div>
      </div>

      {/* Dark bottom section */}
      <div className="dark:bg-[oklch(0.10_0.04_290)] bg-secondary/80 hairline-t">

      {/* Large logo */}
      <div className="flex justify-center px-6 pt-10 pb-10">
        <img
          src={footerLogo}
          alt="CDNCore"
          className="footer-logo-img h-36 md:h-52 w-auto object-contain opacity-90"
        />
      </div>

      {/* Sponsors */}
      <div className="hairline-t py-8 px-6 flex flex-wrap items-center justify-center gap-6">
        <img
          src={sponsorsImg}
          alt="PRR — República Portuguesa — Financiado pela União Europeia"
          className="h-10 w-auto object-contain"
        />
        <NavA to="/estagios-profissionais" className="cursor-pointer">
          <img
            src={iefpImg}
            alt="IEFP — Pessoas 2030 — Portugal 2030 — Cofinanciado pela União Europeia"
            className="h-20 w-auto object-contain hover:opacity-80 transition-opacity"
          />
        </NavA>
      </div>

      {/* Gradient separator */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50%, #8B5CF6 100%)", opacity: 0.8 }} />

      {/* Copyright row */}
      <div className="container-prose py-5 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          © {year} {t('footer_copyright')}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="ml-4 transition-transform hover:-translate-y-1 hover:scale-110"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="footerArrow" x1="0" y1="0" x2="32" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7c3aed" />
                <stop offset="0.5" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="15" stroke="url(#footerArrow)" strokeWidth="2" fill="transparent" className="fill-secondary" />
            <polyline points="10,18 16,12 22,18" stroke="url(#footerArrow)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      </div>{/* end dark bottom section */}
    </footer>
  );
}
