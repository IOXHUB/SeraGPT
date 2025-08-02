import HeroSection from '@/components/seragpt/HeroSection';
import ProblemSection from '@/components/seragpt/ProblemSection';
import SolutionSection from '@/components/seragpt/SolutionSection';
import TestimonialSection from '@/components/seragpt/TestimonialSection';
import DemoSection from '@/components/seragpt/DemoSection';
import FAQSection from '@/components/seragpt/FAQSection';
import FinalCTASection from '@/components/seragpt/FinalCTASection';
import FloatingCTA from '@/components/seragpt/FloatingCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TestimonialSection />
      <DemoSection />
      <FAQSection />
      <FinalCTASection />
      <FloatingCTA />
    </main>
  );
}
