import { Card, CardText, CardTitle, Container, Section, SectionLead, SectionTitle, StepNumber } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

type Step = { title: string; text: string };

// Plan → spend → look back: the month in Tivren Budget, in three cards.
export const HowSection = () => {
  const { t } = useTranslation();
  const steps = t("how.steps", { returnObjects: true }) as Step[];
  return (
    <Section id="how" isTinted>
      <Container>
        <SectionTitle>{t("how.title")}</SectionTitle>
        <SectionLead>{t("how.lead")}</SectionLead>
        <ol className="mt-12 grid grid-cols-3 gap-5 max-hero:grid-cols-1 max-sm:mt-8">
          {steps.map((step, i) => (
            <Card as="li" key={step.title}>
              <StepNumber n={i + 1} />
              <CardTitle>{step.title}</CardTitle>
              <CardText>{step.text}</CardText>
            </Card>
          ))}
        </ol>
      </Container>
    </Section>
  );
};
