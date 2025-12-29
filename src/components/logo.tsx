import clsx from "clsx";

interface SpenseLogoProps {
  className?: string;
}

export default function SpenseLogo({ className }: SpenseLogoProps) {
  return (
    <h1 className={clsx("font-logo text-primary", className ?? "text-7xl md:text-8xl")}>
      Spense
    </h1>
  )
}
