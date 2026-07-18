import Image from "next/image";
import Link from "next/link";
import logoColor from "../../public/brand/logo-color.png";
import logoWhite from "../../public/brand/logo-white.png";

export function Logo({
  variant = "color",
  className = "",
  priority = false,
}: {
  variant?: "color" | "white";
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "white" ? logoWhite : logoColor;
  return (
    <Link
      href="/"
      aria-label="iFlexo Visión Gráfica — inicio"
      className={className}
    >
      <Image
        src={src}
        alt="iFlexo Visión Gráfica"
        priority={priority}
        className="h-8 w-auto sm:h-9"
        sizes="180px"
      />
    </Link>
  );
}
