import { BuyerRequestPreview } from "./BuyerRequestPreview";
import { FeaturedProducts } from "./FeaturedProducts";
import { HeroSection } from "./HeroSection";
import { HowItWorks } from "./HowItWorks";
import { SellerCallToAction } from "./SellerCallToAction";
import { Testimonials } from "./Testimonials";

export function LandingPage() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <FeaturedProducts />
      <BuyerRequestPreview />
      <SellerCallToAction />
      <Testimonials />
    </div>
  );
}
