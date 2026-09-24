export type ThemeMode = "light" | "dark" | "system";
export type Tone = "success" | "warning" | "danger" | "info" | "neutral";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface Order {
  id: string;
  customer: string;
  initials: string;
  product: string;
  amount: string;
  status: "Paid" | "Pending" | "Refunded";
  date: string;
}

export interface ToastItem {
  id: number;
  tone: Exclude<Tone, "neutral">;
  title: string;
  description: string;
}
