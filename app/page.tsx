import { getFeaturedBuilds, getLabAreas } from "@/lib/catalog";
import { Hero } from "@/components/Hero";
import { LabAreas } from "@/components/LabAreas";
import { Builds } from "@/components/Builds";
import { Upgrades } from "@/components/Upgrades";
import { HowToBuy } from "@/components/HowToBuy";
import { Reviews } from "@/components/Reviews";

export default async function HomePage() {
  const [areas, builds] = await Promise.all([getLabAreas(), getFeaturedBuilds()]);

  return (
    <>
      <Hero />
      <LabAreas areas={areas} />
      <Builds builds={builds} />
      <Upgrades />
      <HowToBuy />
      <Reviews hideWhenEmpty />
    </>
  );
}
