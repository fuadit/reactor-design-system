export function Tabs({ items, active, onChange }: { items: string[]; active: string; onChange: (value: string) => void }) {
  return <div className="tabs" role="tablist">{items.map((item) => <button key={item} className={`tab ${active === item ? "is-active" : ""}`} role="tab" aria-selected={active === item} onClick={() => onChange(item)}>{item}</button>)}</div>;
}