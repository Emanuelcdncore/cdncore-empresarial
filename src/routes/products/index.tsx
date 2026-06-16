import { createFileRoute } from "@tanstack/react-router";
import { getProductsList } from "@/lib/products-data";
import ProductCatalog from "@/components/ProductCatalog";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — CDNCore" },
      { name: "description", content: "Full hardware catalog: MikroTik routers, switches, access points and more." },
      { property: "og:title", content: "Products — CDNCore" },
    ],
  }),
  loader: () => getProductsList(),
  component: ProductsPage,
});

function ProductsPage() {
  const products = Route.useLoaderData();
  return <ProductCatalog products={products} />;
}
