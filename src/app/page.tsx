import NavigationBar from "@/components/NavigationBar";
import HeroSection from "./_sections/hero";
import FeaturesSection from "./_sections/features";
import Footer from "./_sections/footer";
import ActionCards from "./_sections/actions";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Grid */}
        <FeaturesSection />

        {/* Action Grid */}
        <ActionCards />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
