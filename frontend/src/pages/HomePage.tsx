import { HeroSection } from "../components/home/HeroSection";
import { CategoryGrid } from "../components/home/CategoryGrid";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <CategoryGrid isHome={true} columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" />
    </main>
  );
};

export default HomePage;
