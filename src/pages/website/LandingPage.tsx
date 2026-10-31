import React, { useState } from 'react';
import { WebsiteNavbar } from '../../components/website/WebsiteNavbar';
import { HeroSection } from '../../components/website/HeroSection';
import { CompatibilityStrip } from '../../components/website/CompatibilityStrip';
import { ProductIntro } from '../../components/website/ProductIntro';
import { ArchitectureFlow } from '../../components/website/ArchitectureFlow';
import { IntegrationSection } from '../../components/website/IntegrationSection';
import { DetectionComparison } from '../../components/website/DetectionComparison';
import { ReliabilitySection } from '../../components/website/ReliabilitySection';
import { DesktopPlatformSection } from '../../components/website/DesktopPlatformSection';
import { FinalCTASection } from '../../components/website/FinalCTASection';
import { WebsiteFooter } from '../../components/website/WebsiteFooter';
import { LoadingScreen } from '../../components/common/LoadingScreen';

export const LandingPage: React.FC = () => {
  const [showLoading, setShowLoading] = useState(() => {
    return !sessionStorage.getItem('omnibeat_intro_seen');
  });

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-charcoal selection:bg-brand-sageLight selection:text-brand-forest">
      {/* First session introductory loading experience (PRD Section 4) */}
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}

      {/* Website Navigation */}
      <WebsiteNavbar />

      {/* Main Marketing Sections */}
      <main>
        <HeroSection />
        <CompatibilityStrip />
        <ProductIntro />
        <ArchitectureFlow />
        <IntegrationSection />
        <DetectionComparison />
        <ReliabilitySection />
        <DesktopPlatformSection />
        <FinalCTASection />
      </main>

      {/* Website Footer */}
      <WebsiteFooter />
    </div>
  );
};

