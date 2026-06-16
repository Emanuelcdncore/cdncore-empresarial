import { useState, lazy, Suspense } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/lib/cart";
import logo from "@/assets/CDNCORE-03.png";
import { useTranslation } from 'react-i18next';

const LanguageSelector = lazy(() => import("@/components/LanguageSelector"));

const nav = [
  { to: "/services", labelKey: "nav_services" },
  { to: "/about", labelKey: "nav_company" },
  { to: "/solutions", labelKey: "nav_solutions" },
  { to: "/products", labelKey: "nav_products" },
  { to: "/research", labelKey: "nav_research" },
];

function NavLink({ to, labelKey }: { to: string; labelKey: string }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isActive) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to });
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`text-[12.5px] tracking-wider uppercase transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
    >
      {t(labelKey)}
    </a>
  );
}

export function SiteHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/" });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/contact" });
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/85 hairline-b">
      <div className="container-prose flex h-16 items-center justify-between">
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-3">
          <img src={logo} alt="CDNCore" className="footer-logo-img h-8 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} labelKey={n.labelKey} />
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="/contact"
            onClick={handleContactClick}
            className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase border-b border-foreground pb-0.5 hover:border-accent hover:text-accent transition-colors"
          >
            {t('nav_request_briefing')}
            <span aria-hidden>→</span>
          </a>
          {totalItems > 0 && (
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative inline-flex h-9 w-9 items-center justify-center border border-foreground/20 text-foreground/80 hover:text-accent hover:border-accent transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            </button>
          )}
          <Suspense fallback={null}>
            <LanguageSelector />
          </Suspense>
          <ThemeToggle />
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
