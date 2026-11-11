import { getBrands, getFeaturedBuilds, getLabAreas } from "@/lib/catalog";
import { BrandCarousel } from "@/components/BrandCarousel";
import { Hero } from "@/components/Hero";
import { LabAreas } from "@/components/LabAreas";
import { Builds } from "@/components/Builds";
import { Upgrades } from "@/components/Upgrades";
import { HowToBuy } from "@/components/HowToBuy";
import { Reviews } from "@/components/Reviews";
import { TrustStrip } from "@/components/TrustStrip";

export default async function HomePage() {
  const [areas, builds, brands] = await Promise.all([getLabAreas(), getFeaturedBuilds(), getBrands()]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <LabAreas areas={areas} />
      <BrandCarousel brands={brands} />
      <Builds builds={builds} />
      <Upgrades />
      <HowToBuy />
      <Reviews hideWhenEmpty />
    </>
  );
}
