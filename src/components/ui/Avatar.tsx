export function Avatar({ initials, size = "md", src }: { initials: string; size?: "sm" | "md" | "lg"; src?: string }) {
  return <div className={`avatar ${size === "sm" ? "avatar-sm" : size === "lg" ? "avatar-lg" : ""}`}>{src ? <img src={src} alt={initials} /> : initials}</div>;
}
