import { Copyright, FooterLink, FooterLinks, SiteFooter as Footer } from "@moldovanalexandruvasile/unity-marketing";
import { useTranslation } from "react-i18next";

// In view at the bottom of the window, like the top bar; on phones it just ends the page.
export const SiteFooter = () => {
  const { t } = useTranslation();
  return (
    <Footer
      start={<Copyright brand="Tivren Budget" note={t("footer.note")} />}
      end={
        <FooterLinks>
          <FooterLink href="./privacy.html">{t("footer.privacy")}</FooterLink>
          <FooterLink href="./terms.html">{t("footer.terms")}</FooterLink>
          <FooterLink href="./#faq">{t("nav.faq")}</FooterLink>
        </FooterLinks>
      }
    />
  );
};
