export function Spinner({ size = "md" }: { size?: "sm" | "md" }) { return <span className={`spinner ${size === "sm" ? "spinner-sm" : ""}`} role="status" aria-label="Loading" />; }
