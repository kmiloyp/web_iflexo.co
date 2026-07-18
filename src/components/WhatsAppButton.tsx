import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsapp } from "@/lib/config";

export function WhatsAppButton({
  href = whatsapp.default,
  size = "md",
  variant = "gradient",
  className,
  children = "Escríbenos por WhatsApp",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "gradient" | "ink" | "outline" | "ghost";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Button href={href} size={size} variant={variant} className={className}>
      <WhatsAppIcon className="h-[1.15em] w-[1.15em]" />
      {children}
    </Button>
  );
}
