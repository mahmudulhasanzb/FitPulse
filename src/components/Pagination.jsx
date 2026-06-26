'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

/* ─── Low-level primitives (still exported for custom use) ──────────────── */

export function Pagination(props) {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center"
      {...props}
    />
  );
}

export function PaginationList(props) {
  return <ul className="flex items-center gap-1" {...props} />;
}

export function PaginationItem({ active = false, ...props }) {
  return (
    <li>
      <button
        type="button"
        className={
          active
            ? 'inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-primary bg-primary px-3 text-sm text-primary-foreground'
            : 'inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-input px-3 text-sm hover:bg-muted'
        }
        {...props}
      />
    </li>
  );
}

/* ─── Smart pagination window helper ───────────────────────────────────── */

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];

  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }

  return pages;
}

/* ─── Main reusable component ───────────────────────────────────────────── */

/**
 * PaginationControls
 *
 * Props:
 *   currentPage  {number}  — active page (1-based)
 *   totalPages   {number}  — total pages
 *   paramName?   {string}  — URL search param key (default "page")
 */
export default function PaginationControls({
  currentPage,
  totalPages,
  paramName = 'page',
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigateTo = useCallback(
    page => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramName, String(page));
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams, paramName],
  );

  if (!totalPages || totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center pt-8 border-t border-[#1C210E]/60 select-none"
    >
      <ul className="flex items-center gap-2">
        {/* ← Previous */}
        <li>
          <button
            type="button"
            onClick={() => !isFirst && navigateTo(currentPage - 1)}
            disabled={isFirst}
            aria-label="Previous page"
            className={[
              'inline-flex h-9 items-center justify-center px-3',
              'text-[10px] font-black uppercase tracking-wider',
              'bg-transparent border-0 rounded-lg',
              'transition-colors duration-200',
              isFirst
                ? 'text-[#A4A896]/30 cursor-not-allowed'
                : 'text-[#D4FF00] hover:text-[#c2eb00] cursor-pointer',
            ].join(' ')}
          >
            ← Prev
          </button>
        </li>

        {/* Page numbers */}
        {pages.map((p, idx) =>
          p === '...' ? (
            <li
              key={`ellipsis-${idx}`}
              className="text-[#A4A896]/40 text-xs font-black px-1 select-none font-mono"
              aria-hidden="true"
            >
              ···
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => navigateTo(p)}
                aria-label={`Page ${p}`}
                aria-current={p === currentPage ? 'page' : undefined}
                className={[
                  'inline-flex h-9 w-9 items-center justify-center',
                  'text-xs font-black rounded-lg',
                  'transition-all duration-200 cursor-pointer',
                  p === currentPage
                    ? 'bg-[#D4FF00] text-black border border-[#D4FF00] shadow-[0_0_12px_rgba(212,255,0,0.35)]'
                    : 'bg-[#13160B] border border-[#1C210E] text-white hover:border-[#D4FF00]/50 hover:text-[#D4FF00]',
                ].join(' ')}
              >
                {p}
              </button>
            </li>
          ),
        )}

        {/* Next → */}
        <li>
          <button
            type="button"
            onClick={() => !isLast && navigateTo(currentPage + 1)}
            disabled={isLast}
            aria-label="Next page"
            className={[
              'inline-flex h-9 items-center justify-center px-3',
              'text-[10px] font-black uppercase tracking-wider',
              'bg-transparent border-0 rounded-lg',
              'transition-colors duration-200',
              isLast
                ? 'text-[#A4A896]/30 cursor-not-allowed'
                : 'text-[#D4FF00] hover:text-[#c2eb00] cursor-pointer',
            ].join(' ')}
          >
            Next →
          </button>
        </li>
      </ul>
    </nav>
  );
}
