import { Icon as IconifyIcon } from "@iconify/react";

interface IconProps {
  icon: string;
  size?: number | string;
  className?: string;
  color?: string;
  ariaLabel?: string;
}

export function Icon({ icon, size = 20, className, color, ariaLabel }: IconProps) {
  return <IconifyIcon icon={icon} width={size} height={size} className={className} color={color} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true} />;
}
