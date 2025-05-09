import { PageLayout } from '@/components/layouts/page-layout';
import { AdvancedHero } from '@/components/home/advanced-hero';
import { FeaturesSection } from '@/components/home/features-section';
import ReadmeDataNoName from '@/components/home/readme-data-noname';

export default function Home() {
  return (
    <PageLayout>
      <AdvancedHero />
      <FeaturesSection />
      <ReadmeDataNoName />
    </PageLayout>
  );
}
