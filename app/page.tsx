import CorporateHeroSection from '@/components/seragpt/CorporateHeroSection';
import CorporateProblemSection from '@/components/seragpt/CorporateProblemSection';
import CorporateSolutionSection from '@/components/seragpt/CorporateSolutionSection';
import CorporateTestimonialSection from '@/components/seragpt/CorporateTestimonialSection';
import CorporateDemoSection from '@/components/seragpt/CorporateDemoSection';
import CorporateFAQSection from '@/components/seragpt/CorporateFAQSection';
import CorporateFinalCTASection from '@/components/seragpt/CorporateFinalCTASection';
import CorporateFloatingCTA from '@/components/seragpt/CorporateFloatingCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <CorporateHeroSection />
      <CorporateProblemSection />
      <CorporateSolutionSection />
      <CorporateTestimonialSection />
      <CorporateDemoSection />
      <CorporateFAQSection />
      <CorporateFinalCTASection />
      <CorporateFloatingCTA />
    </main>
  );
}
