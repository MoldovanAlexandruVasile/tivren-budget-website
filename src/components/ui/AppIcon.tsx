import { assetUrl } from "../../utils/media";

type Props = { size: number; className?: string };

/** Tivren Budget's app icon. Decorative: the name is always written next to it. */
export const AppIcon = ({ size, className }: Props) => (
  <img className={className} src={assetUrl("icon.png")} alt="" width={size} height={size} />
);
