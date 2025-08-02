import NewHeroSection from '@/components/seragpt/NewHeroSection';
import NewProblemSection from '@/components/seragpt/NewProblemSection';
import NewSolutionSection from '@/components/seragpt/NewSolutionSection';
import NewTestimonialSection from '@/components/seragpt/NewTestimonialSection';
import NewDemoSection from '@/components/seragpt/NewDemoSection';
import NewFAQSection from '@/components/seragpt/NewFAQSection';
import NewFinalCTASection from '@/components/seragpt/NewFinalCTASection';
import NewFloatingCTA from '@/components/seragpt/NewFloatingCTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <NewHeroSection />
      <NewProblemSection />
      <NewSolutionSection />
      <NewTestimonialSection />
      <NewDemoSection />
      <NewFAQSection />
      <NewFinalCTASection />
      <NewFloatingCTA />
    </main>
  );
}
