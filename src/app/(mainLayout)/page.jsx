import Banner from "@/components/sections/Banner";
import FeaturedSection from "@/components/sections/FeaturedSection";
import LatestForumPosts from "@/components/sections/LatestForumPosts";
import RevolutionSection from "@/components/sections/RevolutionSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedSection />
      <LatestForumPosts />
      <RevolutionSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
