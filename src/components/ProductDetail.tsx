import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Check, ChevronRight, Truck, ShieldCheck, RotateCcw, ShoppingCart } from 'lucide-react';
import type { ProductDetail } from '@/lib/products-data';
import { formatEUR } from '@/lib/products-format';
import { useCart } from '@/lib/cart';
import { useTranslation } from 'react-i18next';
import { normalizeSpecKey } from '@/lib/products-i18n';
import '@/components/css/Products.css';

export default function ProductDetailView({ product }: { product: ProductDetail }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { add } = useCart();
  const [variantId, setVariantId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'desc' | 'specs' | 'ship'>('desc');
  const [added, setAdded] = useState(false);

  const variants = product.product_variants ?? [];
  const images = product.product_images ?? [];
  const selectedVariant = variants.find((v) => v.id === variantId) ?? variants[0];
  const mainImg = images[activeImage]?.url ?? product.featured_image;

  const specList: { label: string; value: string }[] = [];
  if (product.vendor) specList.push({ label: t('spec_manufacturer'), value: product.vendor });
  if (product.product_type) specList.push({ label: t('spec_product_type'), value: t(`pt_${normalizeSpecKey(product.product_type)}`, { defaultValue: product.product_type }) });
  if (selectedVariant?.sku) specList.push({ label: t('spec_sku'), value: selectedVariant.sku ?? '' });
  if (selectedVariant?.weight_g) {
    const kg = selectedVariant.weight_g / 1000;
    specList.push({ label: t('spec_weight'), value: `${kg.toFixed(2)} kg (${selectedVariant.weight_g} g)` });
  }
  if (product.specs) {
    Object.entries(product.specs).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        const translatedLabel = t(`spec_${normalizeSpecKey(key)}`, { defaultValue: key });
        const translatedValues = values.map(v => t(`spec_val_${normalizeSpecKey(v)}`, { defaultValue: v }));
        specList.push({ label: translatedLabel, value: translatedValues.join(', ') });
      }
    });
  }

  return (
    <div className="products-page min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
          <button onClick={() => navigate({ to: '/' })} className="hover:text-purple-500 transition-colors">{t('products_breadcrumb_home')}</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => navigate({ to: '/products' })} className="hover:text-purple-500 transition-colors">{t('products_breadcrumb_products')}</button>
          {product.product_type && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span>{t(`pt_${normalizeSpecKey(product.product_type)}`, { defaultValue: product.product_type })}</span>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">

          {/* Image gallery */}
          <div className="lg:sticky lg:top-32 lg:self-start product-fade-in">
            <div className="bg-muted/30 border border-border rounded-xl overflow-hidden aspect-square flex items-center justify-center group mb-4 relative">
              {mainImg ? (
                <img
                  src={mainImg}
                  alt={product.title}
                  className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105 relative z-10"
                />
              ) : (
                <span className="text-muted-foreground text-sm relative z-10">{t('products_detail_no_image')}</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-6 gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square border rounded-lg overflow-hidden transition-all p-0 ${
                      i === activeImage
                        ? 'border-purple-500 ring-2 ring-purple-500/30'
                        : 'border-border hover:border-purple-500/50'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-contain p-1.5 bg-muted/40" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col product-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-2 flex-wrap">
                {product.vendor && (
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    {product.vendor}
                  </span>
                )}
                {product.product_type && (
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{t(`pt_${normalizeSpecKey(product.product_type)}`, { defaultValue: product.product_type })}</span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mt-3 leading-tight text-foreground tracking-tight">
                {product.title}
              </h1>

              {selectedVariant?.sku && (
                <div className="mt-2 text-xs text-muted-foreground font-mono">SKU: {selectedVariant.sku}</div>
              )}

              <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-foreground products-depot-font">
                  {formatEUR((selectedVariant?.price_cents ?? 0) * qty)}
                </span>
                {qty > 1 && (
                  <span className="text-sm text-muted-foreground">
                    {formatEUR(selectedVariant?.price_cents ?? 0)} × {qty}
                  </span>
                )}
                <span className="text-xs text-muted-foreground uppercase tracking-widest">{t('products_detail_vat')}</span>
              </div>

              <div className="mt-3">
                {selectedVariant?.available ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <Check className="h-4 w-4" /> {t('products_detail_in_stock')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500">
                    <span className="h-2 w-2 rounded-full bg-red-500" /> {t('products_detail_out_of_stock')}
                  </span>
                )}
              </div>

              {variants.length > 1 && (
                <div className="mt-6">
                  <label className="text-sm font-medium block mb-2 text-foreground/80">{t('products_detail_variant_label')}</label>
                  <div className="grid gap-2">
                    {variants.map((v) => {
                      const active = v.id === (selectedVariant?.id);
                      return (
                        <button
                          key={v.id}
                          onClick={() => { setVariantId(v.id); setQty(1); }}
                          disabled={!v.available}
                          className={`text-left border rounded-lg px-4 py-3 transition-all flex items-center justify-between text-foreground ${
                            active
                              ? 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-500/10'
                              : 'border-border hover:border-purple-500/50 bg-muted/20'
                          } ${!v.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span className="text-sm font-medium">{v.title}</span>
                          <span className="text-sm font-semibold">{formatEUR(v.price_cents)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity + CTA */}
              <div className="mt-6 space-y-3">
                <div className="flex gap-3">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >−</button>
                    <span className="px-4 py-2 text-sm font-medium text-foreground min-w-[2.5rem] text-center">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >+</button>
                  </div>
                  <button
                    disabled={!selectedVariant?.available}
                    onClick={() => {
                      if (!selectedVariant) return;
                      add({
                        productId: product.id,
                        handle: product.handle,
                        variantId: selectedVariant.id,
                        title: product.title,
                        variantTitle: selectedVariant.title,
                        price_cents: selectedVariant.price_cents,
                        image: product.featured_image,
                      }, qty);
                      setAdded(true);
                      setTimeout(() => setAdded(false), 2000);
                    }}
                    className="flex-1 btn-violet disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {added ? t('products_detail_added') : t('products_detail_add_to_cart')}
                  </button>
                </div>
                <button
                  onClick={() => navigate({ to: '/contact' })}
                  className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 rounded-lg transition-colors"
                >
                  {t('products_detail_request_quote')}
                </button>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-border">
                <TrustBadge icon={<Truck className="h-4 w-4" />} title={t('products_trust_shipping_title')} desc={t('products_trust_shipping_desc')} />
                <TrustBadge icon={<ShieldCheck className="h-4 w-4" />} title={t('products_trust_payment_title')} desc={t('products_trust_payment_desc')} />
                <TrustBadge icon={<RotateCcw className="h-4 w-4" />} title={t('products_trust_returns_title')} desc={t('products_trust_returns_desc')} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: description / specs / shipping */}
        {(product.description_html || specList.length > 0) && (
          <div className="mt-10 bg-card border border-border rounded-xl overflow-hidden product-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex border-b border-border overflow-x-auto">
              {product.description_html && (
                <TabBtn active={tab === 'desc'} onClick={() => setTab('desc')}>{t('products_tab_description')}</TabBtn>
              )}
              {specList.length > 0 && (
                <TabBtn active={tab === 'specs'} onClick={() => setTab('specs')}>{t('products_tab_specifications')}</TabBtn>
              )}
              <TabBtn active={tab === 'ship'} onClick={() => setTab('ship')}>{t('products_tab_shipping')}</TabBtn>
            </div>

            <div className="p-6 lg:p-8">
              {tab === 'desc' && product.description_html && (
                <div
                  className="prose-product max-w-3xl"
                  dangerouslySetInnerHTML={{ __html: product.description_html }}
                />
              )}
              {tab === 'specs' && (
                <div className="max-w-3xl overflow-x-auto border border-border rounded-lg bg-muted/20">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 w-1/3">{t('products_spec_col_spec')}</th>
                        <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">{t('products_spec_col_detail')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-foreground/80">
                      {specList.map((spec, i) => (
                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-3.5 font-medium text-foreground">{spec.label}</td>
                          <td className="px-6 py-3.5 text-muted-foreground font-mono">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {tab === 'ship' && (
                <div className="max-w-3xl space-y-4 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">{t('products_shipping_shipping_label')}</strong> {t('products_shipping_shipping_text')}</p>
                  <p><strong className="text-foreground">{t('products_shipping_returns_label')}</strong> {t('products_shipping_returns_text')}</p>
                  <p><strong className="text-foreground">{t('products_shipping_warranty_label')}</strong> {t('products_shipping_warranty_text')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TrustBadge({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="h-8 w-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold text-foreground">{title}</div>
        <div className="text-[11px] text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
        active ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
      {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
    </button>
  );
}
