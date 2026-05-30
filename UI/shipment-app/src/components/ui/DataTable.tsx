import type { ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
};

type Props<T> = {
  columns: Column<T>[];
  data?: T[];
  keyExtractor: (row: T, index: number) => string;
  emptyMessage?: string;
};

export default function DataTable<T>({
  columns,
  data = [],
  keyExtractor,
  emptyMessage = "No records found",
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className={`px-4 py-3 ${column.className ?? ""}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={keyExtractor(row, index)} className="hover:bg-slate-50">
                  {columns.map((column) => {
                    const value =
                      typeof column.accessor === "function"
                        ? column.accessor(row)
                        : (row[column.accessor] as ReactNode);
                    return (
                      <td key={column.header} className={`px-4 py-3 ${column.className ?? ""}`}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
