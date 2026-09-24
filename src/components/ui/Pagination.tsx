import { Icon } from "./Icon";
import { IconButton } from "./Primitives";

export function Pagination({ page = 1, totalPages = 4, onChange }: { page?: number; totalPages?: number; onChange?: (page: number) => void }) {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBlockStart: 14, color: "var(--text-faint)", fontSize: 11 }}><span>Page {page} of {totalPages}</span><div style={{ display: "flex", alignItems: "center", gap: 6 }}><IconButton label="Previous page" icon="solar:alt-arrow-left-linear" disabled={page <= 1} onClick={() => onChange?.(Math.max(1, page - 1))} /><IconButton label="Next page" icon="solar:alt-arrow-right-linear" disabled={page >= totalPages} onClick={() => onChange?.(Math.min(totalPages, page + 1))} /><Icon icon="solar:double-alt-arrow-right-linear" size={0} /></div></div>;
}
