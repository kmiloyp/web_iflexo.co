import { landings } from "@/lib/landings";
import { ProductLanding } from "@/components/landing/ProductLanding";
import { buildMetadata } from "@/lib/seo";

const data = landings.fotopolimeros;

export const metadata = buildMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: data.path,
});

export default function FotopolimerosPage() {
  return <ProductLanding data={data} />;
}
