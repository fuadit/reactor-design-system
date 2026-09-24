import type { ReactNode } from "react";

export interface TableColumn<T> { key: string; label: string; render?: (row: T) => ReactNode; }

export function Table<T extends { id?: string | number }>({ columns, rows, empty }: { columns: TableColumn<T>[]; rows: T[]; empty?: ReactNode }) {
  return <div className="table-wrap"><table className="data-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={String(row.id ?? index)}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : String(row[column.key as keyof T] ?? "")}</td>)}</tr>) : <tr><td colSpan={columns.length}>{empty ?? "No data"}</td></tr>}</tbody></table></div>;
}
