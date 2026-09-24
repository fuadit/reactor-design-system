import { Icon } from "./Icon";

export function Checkbox({ label, checked, onChange }: { label: string; checked?: boolean; onChange?: (checked: boolean) => void }) {
  return <label className="check-control"><button type="button" role="checkbox" aria-checked={checked} className={`check-box ${checked ? "is-checked" : ""}`} onClick={() => onChange?.(!checked)}>{checked ? <Icon icon="solar:check-read-bold" size={13} /> : null}</button>{label}</label>;
}
