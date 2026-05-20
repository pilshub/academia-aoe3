import type { CSSProperties } from "react";

export type IconProps = {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export type LucideIcon = (props: IconProps) => JSX.Element;

function makeIcon(label: string): LucideIcon {
  return function Icon({ size = 18, className = "", ...props }: IconProps) {
    return (
      <span
        className={`mini-icon ${className}`.trim()}
        style={{ "--icon-size": `${size}px` } as CSSProperties}
        {...props}
      >
        {label}
      </span>
    );
  };
}

export const Anchor = makeIcon("A");
export const AlertTriangle = makeIcon("!");
export const ArrowRight = makeIcon(">");
export const BadgeAlert = makeIcon("!");
export const BadgeCheck = makeIcon("OK");
export const BookOpen = makeIcon("B");
export const Castle = makeIcon("C");
export const CheckCircle2 = makeIcon("+");
export const Crosshair = makeIcon("X");
export const Crown = makeIcon("K");
export const ExternalLink = makeIcon("^");
export const Eye = makeIcon("E");
export const Flame = makeIcon("F");
export const FileText = makeIcon("G");
export const Home = makeIcon("H");
export const Images = makeIcon("IM");
export const Landmark = makeIcon("L");
export const ListTree = makeIcon("T");
export const Map = makeIcon("M");
export const PackageOpen = makeIcon("P");
export const Search = makeIcon("S");
export const Shield = makeIcon("D");
export const ShieldCheck = makeIcon("OK");
export const SlidersHorizontal = makeIcon("=");
export const Swords = makeIcon("W");
export const Timer = makeIcon("00");
export const TrendingUp = makeIcon("^");
export const Users = makeIcon("U");
export const WalletCards = makeIcon("$");
