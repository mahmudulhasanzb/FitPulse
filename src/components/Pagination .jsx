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
