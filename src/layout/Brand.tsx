import { AppIcon } from "../components/ui/AppIcon";

type Props = { href: string };

// The app's mark, as the app shows it: "Tivren", with the product under it in
// small capitals.
export const Brand = ({ href }: Props) => (
  <a className="flex shrink-0 items-center gap-2.5 max-sm:gap-2" href={href}>
    <AppIcon size={32} className="rounded-lg" />
    <span className="flex flex-col leading-none">
      <span className="text-[1.1rem] font-extrabold max-sm:text-base">Tivren</span>
      <span className="mt-1 text-[0.62rem] font-bold tracking-[0.2em] text-primary uppercase">Budget</span>
    </span>
  </a>
);
