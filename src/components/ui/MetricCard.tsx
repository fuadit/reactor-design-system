import { Icon } from "./Icon";
import { Card } from "./Card";

export function MetricCard({ label, value, change, note, icon, color = "var(--primary)" }: { label: string; value: string; change: string; note: string; icon: string; color?: string }) {
  return <Card className="metric-card" style={{ "--metric-color": color } as React.CSSProperties}><div className="metric-top"><span className="metric-label">{label}</span><span className="metric-icon"><Icon icon={icon} size={20} /></span></div><div className="metric-value">{value}</div><div className="metric-foot"><span className="metric-trend"><Icon icon="solar:arrow-up-linear" size={13} /> {change}</span><span className="muted">{note}</span></div></Card>;
}
