import { useState } from "react";
import { Button } from "./Primitives";
import { Icon } from "./Icon";

export function Dropdown({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return <div className="dropdown-wrap"><Button variant="outline" size="sm" rightIcon="solar:alt-arrow-down-linear" onClick={() => setOpen((value) => !value)}>{label}</Button>{open ? <div className="dropdown-menu" role="menu">{items.map((item) => <button className="dropdown-item" key={item} onClick={() => setOpen(false)} role="menuitem"><Icon icon="solar:arrow-right-up-linear" size={15} />{item}</button>)}</div> : null}</div>;
}