export function Radio({ label, checked, onChange }: { label: string; checked?: boolean; onChange?: () => void }) {
  return <label className="check-control"><button type="button" role="radio" aria-checked={checked} className={`radio-box ${checked ? "is-checked" : ""}`} onClick={onChange} />{label}</label>;
}
