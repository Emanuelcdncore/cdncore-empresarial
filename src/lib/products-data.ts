import catalog from "@/data/products.json";

export type CatalogVariant = {
  id: string;
  sku: string | null;
  title: string | null;
  price_cents: number;
  compare_at_price_cents: number | null;
  available: boolean;
  weight_g: number | null;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  position: number;
};

export type CatalogImage = {
  id: string;
  url: string;
  alt: string | null;
  position: number;
  width: number | null;
  height: number | null;
};

export type CatalogProduct = {
  id: string;
  handle: string;
  title: string;
  vendor: string | null;
  product_type: string | null;
  tags: string[] | null;
  specs: Record<string, string[]> | null;
  featured_image: string | null;
  description_html: string | null;
  collection: string;
  published: boolean;
  images: CatalogImage[];
  variants: CatalogVariant[];
};

export type ProductListItem = {
  id: string;
  handle: string;
  title: string;
  vendor: string | null;
  product_type: string | null;
  tags: string[];
  specs: Record<string, string[]>;
  featured_image: string | null;
  min_price_cents: number;
  available: boolean;
};

const ALL = (catalog as unknown as CatalogProduct[]).filter((p) => p.published);

export type ProductDetail = CatalogProduct & {
  product_images: CatalogImage[];
  product_variants: CatalogVariant[];
};

export function getProductsList(): ProductListItem[] {
  return ALL.map((p) => {
    const prices = p.variants.map((v) => v.price_cents).filter((n) => n > 0);
    const available = p.variants.some((v) => v.available);
    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      vendor: p.vendor,
      product_type: p.product_type,
      tags: p.tags ?? [],
      specs: (p.specs ?? {}) as Record<string, string[]>,
      featured_image: p.featured_image,
      min_price_cents: prices.length ? Math.min(...prices) : 0,
      available,
    };
  });
}

export function getProductByHandle(handle: string): ProductDetail | null {
  const p = ALL.find((p) => p.handle === handle);
  if (!p) return null;
  return { ...p, product_images: p.images, product_variants: p.variants };
}

export function getAllHandles(): string[] {
  return ALL.map((p) => p.handle);
}
