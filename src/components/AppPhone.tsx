import { useTranslation } from "react-i18next";

import { useMediaUrl } from "../hooks/useMediaUrl";

// Tivren Budget's home screen on an iPhone, light or dark following the visitor's
// system, in the page's language. The screens come from capture/ (screens.mjs),
// drawn from the app's own components, colours and texts.
export const AppPhone = () => {
  const { t } = useTranslation();
  const mediaUrl = useMediaUrl();
  return (
    <div className="relative flex justify-center">
      <div className="absolute top-12 size-80 rounded-full bg-mint/25 blur-3xl" aria-hidden="true" />
      <div className="relative w-[300px] rounded-[50px] bg-linear-to-br from-[#3b4a44] via-[#121a17] to-[#0a0f0d] p-[11px] shadow-phone ring-1 ring-[#6f7d77]/60 ring-inset max-sm:w-[270px] max-sm:rounded-[46px] max-sm:p-[10px]">
        <div className="relative overflow-hidden rounded-[39px] bg-black max-sm:rounded-[36px]">
          <picture>
            <source srcSet={mediaUrl("app/home-dark.jpg")} media="(prefers-color-scheme: dark)" />
            <img className="block h-auto w-full" src={mediaUrl("app/home.jpg")} width={901} height={1960} alt={t("hero.appAlt")} />
          </picture>
          <span className="absolute top-[9px] left-1/2 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};
