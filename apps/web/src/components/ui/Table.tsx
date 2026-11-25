export function Table({
  columns,
  rows,
}: {
  columns: Array<{ key: string; header: string; render?: (row: Record<string, unknown>) => React.ReactNode }>;
  rows: Array<Record<string, unknown>>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-muted">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-3 font-semibold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={String(row.id ?? index)} className="border-t border-line">
              {columns.map((column) => (
                <td key={column.key} className="px-3 py-3 align-middle">
                  {column.render ? column.render(row) : String(row[column.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
