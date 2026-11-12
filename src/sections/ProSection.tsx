import { Container, IconTile, Section, SectionLead, SectionTitle } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

type Perk = { title: string; text: string };

// One per perk in the translations, in the same order.
const PERK_ICONS = ["👨‍👩‍👧", "♾️", "🏦", "🧒", "🔍"];

// Tivren Pro: what's planned after launch, all marked "later".
export const ProSection = () => {
  const { t } = useTranslation();
  const perks = t("pro.items", { returnObjects: true }) as Perk[];
  return (
    <Section id="pro">
      <Container isNarrow>
        <SectionTitle>{t("pro.title")}</SectionTitle>
        <SectionLead>{t("pro.lead")}</SectionLead>
        <ul className="mt-10 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface max-sm:mt-7">
          {perks.map((perk, i) => (
            <li key={perk.title} className="flex items-start gap-4 px-5.5 py-4.5">
              <IconTile size="sm">{PERK_ICONS[i]}</IconTile>
              <div className="flex-1">
                <h3 className="font-bold">{perk.title}</h3>
                <p className="text-[0.95rem] text-muted">{perk.text}</p>
              </div>
              <span className="mt-0.5 shrink-0 rounded-full border border-line px-2.5 py-0.5 text-[0.72rem] font-semibold text-muted">
                {t("pro.later")}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
