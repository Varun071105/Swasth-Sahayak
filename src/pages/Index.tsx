import GlassNavbar from "@/components/GlassNavbar";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";

const Index = () => {
  return (
    <div className="min-h-screen">
      <GlassNavbar />
      <div className="pt-20">
        <HeroSection />
        <FeatureCards />
      </div>
    </div>
  );
};

export default Index;
