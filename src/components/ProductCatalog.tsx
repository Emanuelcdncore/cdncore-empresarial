import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowUpRight, SlidersHorizontal, X } from 'lucide-react';
import type { ProductListItem } from '@/lib/products-data';
import { formatEUR } from '@/lib/products-format';
import { SPEC_GROUPS } from '@/lib/products-specs';
import { normalizeSpecKey } from '@/lib/products-i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useTranslation } from 'react-i18next';
import '@/components/css/Products.css';

const ANIMATE_STAGGER_MAX = 12;

type Facets = {
  vendors: Map<string, number>;
  groups: Map<string, Map<string, number>>;
};

function buildFacets(items: ProductListItem[]): Facets {
  const vendors = new Map<string, number>();
  const groups = new Map<string, Map<string, number>>();
  for (const g of SPEC_GROUPS) groups.set(g.key, new Map());
  for (const p of items) {
    if (p.vendor) vendors.set(p.vendor, (vendors.get(p.vendor) ?? 0) + 1);
    for (const g of SPEC_GROUPS) {
      const vals = p.specs?.[g.key];
      if (!vals) continue;
      const m = groups.get(g.key)!;
      for (const v of vals) m.set(v, (m.get(v) ?? 0) + 1);
    }
  }
  return { vendors, groups };
}

function ProductCard({ p, index }: { p: ProductListItem; index: number }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const delay = index < ANIMATE_STAGGER_MAX ? { animationDelay: `${index * 0.04}s` } : undefined;

  return (
    <div
      onMouseMove={onMove}
      onClick={() => navigate({ to: '/products/$handle', params: { handle: p.handle } })}
      className="product-card product-card-animate cursor-pointer"
      style={delay}
    >
      <div className="aspect-square rounded-lg bg-muted/40 border border-border flex items-center justify-center overflow-hidden mb-4 relative group">
        {p.featured_image ? (
          <img
            src={p.featured_image}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <span className="text-muted-foreground text-xs">{t('products_catalog_no_image')}</span>
        )}
        <div className="absolute top-2 right-2 h-8 w-8 rounded-full bg-violet-500/90 text-white flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-violet-900/50">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 relative">
        {p.product_type && (
          <div className="text-[10px] uppercase tracking-[0.18em] text-violet-500 dark:text-violet-300/80 font-semibold">
            {t(`pt_${normalizeSpecKey(p.product_type)}`, { defaultValue: p.product_type })}
          </div>
        )}
        <h3 className="products-depot-font font-medium text-[0.95rem] text-foreground line-clamp-2 min-h-[2.6rem] leading-snug hover:text-foreground/80 transition-colors">
          {p.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <span className="products-depot-font font-semibold text-foreground tracking-wide">
            {formatEUR(p.min_price_cents)}
          </span>
          {!p.available ? (
            <span className="text-[10px] bg-red-500/10 text-red-300 px-2 py-0.5 rounded-full border border-red-500/20">
              {t('products_catalog_out_of_stock')}
            </span>
          ) : (
            <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {t('products_catalog_in_stock')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function FacetList({
  entries, selected, onToggle, specValues = false,
}: {
  entries: [string, number][];
  selected: Set<string>;
  onToggle: (v: string) => void;
  specValues?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <ul className="space-y-2 pt-1 max-h-64 overflow-y-auto pr-1">
      {entries.map(([value, count]) => (
        <li key={value}>
          <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
            <Checkbox
              checked={selected.has(value)}
              onCheckedChange={() => onToggle(value)}
            />
            <span className="flex-1 truncate text-foreground/80">
              {specValues ? t(`spec_val_${normalizeSpecKey(value)}`, { defaultValue: value }) : value}
            </span>
            <span className="text-xs text-muted-foreground">({count})</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function FilterSidebar(props: {
  facets: Facets;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  selectedVendors: Set<string>;
  toggleVendor: (v: string) => void;
  selectedTags: Map<string, Set<string>>;
  toggleTag: (label: string, value: string) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  setPriceRange: (r: [number, number] | null) => void;
  activeFilterCount: number;
  clearAll: () => void;
}) {
  const { t } = useTranslation();
  const {
    facets, inStockOnly, setInStockOnly, selectedVendors, toggleVendor,
    selectedTags, toggleTag, minPrice, maxPrice, priceRange, setPriceRange,
    activeFilterCount, clearAll,
  } = props;

  const groupsWithValues = SPEC_GROUPS.filter((g) => (facets.groups.get(g.key)?.size ?? 0) > 0);
  const defaultOpen = ['availability', 'price', 'vendor'];
  for (const [key, values] of selectedTags) {
    if (values.size) defaultOpen.push(`tag-${key}`);
  }

  return (
    <div className="text-sm text-foreground/80">
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
          <span className="text-xs text-muted-foreground">{activeFilterCount} active filter{activeFilterCount > 1 ? 's' : ''}</span>
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-7 text-xs text-foreground/80 hover:text-foreground">
            <X className="h-3 w-3 mr-1" /> {t('products_filters_clear')}
          </Button>
        </div>
      )}

      <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-semibold py-3 text-foreground">{t('products_filters_availability')}</AccordionTrigger>
          <AccordionContent>
            <label className="flex items-center justify-between pb-2 cursor-pointer">
              <span className="text-foreground/80">{t('products_filters_in_stock_only')}</span>
              <Switch checked={inStockOnly} onCheckedChange={setInStockOnly} />
            </label>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-foreground">{t('products_filters_price')}</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2 px-2">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={100}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as [number, number])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-4">
                <span>{formatEUR(priceRange[0])}</span>
                <span>{formatEUR(priceRange[1])}</span>
              </div>
              <p className="text-[10px] text-muted-foreground/60 mt-2">Max: {formatEUR(maxPrice)}</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {facets.vendors.size > 0 && (
          <AccordionItem value="vendor">
            <AccordionTrigger className="text-foreground">{t('products_filters_brand')}</AccordionTrigger>
            <AccordionContent>
              <FacetList
                entries={Array.from(facets.vendors.entries())}
                selected={selectedVendors}
                onToggle={toggleVendor}
              />
            </AccordionContent>
          </AccordionItem>
        )}

        {groupsWithValues.map((g) => {
          const entries = Array.from(facets.groups.get(g.key)!.entries()).sort((a, b) =>
            a[0].localeCompare(b[0], undefined, { numeric: true })
          );
          const selected = selectedTags.get(g.key) ?? new Set<string>();
          return (
            <AccordionItem key={g.key} value={`tag-${g.key}`}>
              <AccordionTrigger className="text-sm font-semibold py-3 text-foreground">
                {t(`spec_${normalizeSpecKey(g.label)}`, { defaultValue: g.label })}
              </AccordionTrigger>
              <AccordionContent>
                <FacetList
                  entries={entries}
                  selected={selected}
                  onToggle={(v) => toggleTag(g.key, v)}
                  specValues={true}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default function ProductCatalog({ products }: { products: ProductListItem[] }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('title-asc');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Map<string, Set<string>>>(new Map());
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setLimit(20);
  }, [search, sort, inStockOnly, selectedVendors, selectedTags, priceRange]);

  const { minPrice, maxPrice } = useMemo(() => {
    const prices = products.map((p) => p.min_price_cents).filter((n) => n > 0);
    return {
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 100000,
    };
  }, [products]);

  const effectivePrice = priceRange ?? [minPrice, maxPrice];
  const facets = useMemo(() => buildFacets(products), [products]);

  const items = useMemo(() => {
    let list = products;
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (inStockOnly) list = list.filter((p) => p.available);
    if (selectedVendors.size) list = list.filter((p) => p.vendor && selectedVendors.has(p.vendor));
    if (priceRange)
      list = list.filter((p) => p.min_price_cents >= priceRange[0] && p.min_price_cents <= priceRange[1]);
    if (selectedTags.size) {
      list = list.filter((p) => {
        for (const [key, values] of selectedTags) {
          if (!values.size) continue;
          const prodVals = p.specs?.[key] ?? [];
          const matched = prodVals.some((v) => values.has(v));
          if (!matched) return false;
        }
        return true;
      });
    }
    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.min_price_cents - b.min_price_cents;
      if (sort === 'price-desc') return b.min_price_cents - a.min_price_cents;
      if (sort === 'title-desc') return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });
    return list;
  }, [products, search, sort, inStockOnly, selectedVendors, selectedTags, priceRange]);

  const toggleVendor = (v: string) =>
    setSelectedVendors((prev) => {
      const next = new Set(prev);
      next.has(v) ? next.delete(v) : next.add(v);
      return next;
    });

  const toggleTag = (label: string, value: string) =>
    setSelectedTags((prev) => {
      const next = new Map(prev);
      const set = new Set(next.get(label) ?? []);
      set.has(value) ? set.delete(value) : set.add(value);
      next.set(label, set);
      return next;
    });

  const activeFilterCount =
    (inStockOnly ? 1 : 0) +
    selectedVendors.size +
    (priceRange ? 1 : 0) +
    Array.from(selectedTags.values()).reduce((n, s) => n + s.size, 0);

  const clearAll = () => {
    setInStockOnly(false);
    setSelectedVendors(new Set());
    setSelectedTags(new Map());
    setPriceRange(null);
  };

  const sidebar = (
    <FilterSidebar
      facets={facets}
      inStockOnly={inStockOnly}
      setInStockOnly={setInStockOnly}
      selectedVendors={selectedVendors}
      toggleVendor={toggleVendor}
      selectedTags={selectedTags}
      toggleTag={toggleTag}
      minPrice={minPrice}
      maxPrice={maxPrice}
      priceRange={effectivePrice}
      setPriceRange={setPriceRange}
      activeFilterCount={activeFilterCount}
      clearAll={clearAll}
    />
  );

  return (
    <div className="products-page">
      <div className="max-w-7xl mx-auto px-4 py-12 pt-28">
        <div className="mb-10">
          <h1 className="products-depot-font text-4xl md:text-5xl font-semibold text-foreground mt-3 tracking-tight">
            {t('products_catalog_heading')}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">{items.length} products</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          <aside className="hidden lg:block">{sidebar}</aside>
          <div>
            <div className="flex flex-col md:flex-row gap-3 mb-8">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden text-foreground border-border bg-muted/30">
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> {t('products_filters_title')}
                    {activeFilterCount > 0 && (
                      <span className="ml-2 bg-violet-600 text-white rounded-full text-xs px-2 py-0.5">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto bg-background border-border">
                  <SheetHeader>
                    <SheetTitle className="text-foreground">{t('products_filters_title')}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">{sidebar}</div>
                </SheetContent>
              </Sheet>
              <Input
                placeholder={t('products_catalog_search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="md:max-w-sm bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
              <div className="md:ml-auto">
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="md:w-56 bg-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border text-foreground">
                    <SelectItem value="title-asc">{t('products_sort_name_asc')}</SelectItem>
                    <SelectItem value="title-desc">{t('products_sort_name_desc')}</SelectItem>
                    <SelectItem value="price-asc">{t('products_sort_price_asc')}</SelectItem>
                    <SelectItem value="price-desc">{t('products_sort_price_desc')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {items.length === 0 ? (
              <div className="text-center py-16 border border-border rounded-xl bg-muted/20">
                <p className="text-muted-foreground">{t('products_catalog_no_results')}</p>
                <Button variant="link" onClick={clearAll} className="text-violet-400">{t('products_catalog_clear_filters')}</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {items.slice(0, limit).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
                </div>
                {limit < items.length && (
                  <div className="mt-14 flex justify-center">
                    <button onClick={() => setLimit(limit + 20)} className="btn-violet">
                      {t('products_catalog_load_more')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
