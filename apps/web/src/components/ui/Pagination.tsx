export function Pagination({ page, pages, onPage }: { page: number; pages: number; onPage: (page: number) => void }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-2 pt-4">
      <button className="btn-ghost !px-3 !py-1.5" type="button" disabled={page === 1} onClick={() => onPage(page - 1)}>
        Prev
      </button>
      <span className="text-sm text-muted">
        {page} / {pages}
      </span>
      <button className="btn-ghost !px-3 !py-1.5" type="button" disabled={page === pages} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
