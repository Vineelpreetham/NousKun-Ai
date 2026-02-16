import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import Story from '@/components/Story'; // Represents "Overview"
import Differentiator from '@/components/Differentiator';
import BrandStatement from '@/components/BrandStatement';
import Footer from '@/components/Footer';
import Clients from '@/components/Clients';
import Pricing from '@/components/Pricing';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-ai-black text-foreground overflow-x-hidden w-full max-w-[100vw]">
      <Hero />

      <ValueProposition />

      <div id="about" className="relative z-10 bg-ai-black">
        <Story />
      </div>

      <div id="system" className="scroll-mt-28">
        <Differentiator />
      </div>

      <Pricing />

      {/* <Clients /> */}

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
