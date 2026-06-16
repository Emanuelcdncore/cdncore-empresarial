import { createFileRoute, notFound, useParams } from "@tanstack/react-router";
import { getProductByHandle } from "@/lib/products-data";
import ProductDetailView from "@/components/ProductDetail";

export const Route = createFileRoute("/products/$handle")({
  head: ({ params }) => {
    const product = getProductByHandle(params.handle);
    return {
      meta: [
        { title: product ? `${product.title} — CDNCore` : "Product Not Found — CDNCore" },
        { name: "description", content: product?.product_type ?? "MikroTik hardware" },
        ...(product?.featured_image
          ? [{ property: "og:image", content: product.featured_image }]
          : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProductByHandle(params.handle);
    if (!product) throw notFound();
    return product;
  },
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData() as NonNullable<ReturnType<typeof getProductByHandle>>;
  return <ProductDetailView product={product} />;
}
