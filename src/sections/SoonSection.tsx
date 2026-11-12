import { Container, Section } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

import { StoreSoonRow } from "../components/StoreSoonRow";
import { AppIcon } from "../components/ui/AppIcon";

// The closing card: Tivren Budget is almost here (no download yet).
export const SoonSection = () => {
  const { t } = useTranslation();
  return (
    <Section id="soon" isTinted>
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <AppIcon size={88} className="rounded-[22px] shadow-soft" />
          <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-extrabold">{t("soon.title")}</h2>
          <p className="max-w-[32em] text-muted">{t("soon.text")}</p>
          <div className="mt-2">
            <StoreSoonRow />
          </div>
        </div>
      </Container>
    </Section>
  );
};
