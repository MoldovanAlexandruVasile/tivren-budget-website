import { useDocumentTitle } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { SiteFooter } from "../layout/SiteFooter";
import { SiteHeader } from "../layout/SiteHeader";
import { FaqSection } from "../sections/FaqSection";
import { FeaturesSection } from "../sections/FeaturesSection";
import { HeroSection } from "../sections/hero/HeroSection";
import { HomeNavLinks } from "../sections/HomeNavLinks";
import { HowSection } from "../sections/HowSection";
import { ProSection } from "../sections/ProSection";
import { ScreensSection } from "../sections/ScreensSection";
import { SoonSection } from "../sections/SoonSection";
import { VideoSection } from "../sections/VideoSection";

// Tivren Budget isn't out yet: the page presents it and says "coming soon",
// with no download or store links anywhere.
export const HomePage = () => {
  const { t } = useTranslation();
  useDocumentTitle(t("meta.title"));

  return (
    <>
      <SiteHeader>
        <HomeNavLinks />
      </SiteHeader>
      <main id="top" className="flex-1">
        <HeroSection />
        <VideoSection />
        <ScreensSection />
        <FeaturesSection />
        <HowSection />
        <ProSection />
        <FaqSection />
        <SoonSection />
      </main>
      <SiteFooter />
    </>
  );
};
