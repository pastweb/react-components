import type { ExpandButtonProps } from './types';

export function ExpandButton({ cls, row }: ExpandButtonProps) {
  return (
    <button
      type="button"
      className={cls('expandButton', row.isExpanded() && 'is-open')}
      aria-expanded={row.isExpanded()}
      aria-label={`${row.isExpanded() ? 'Collapse' : 'Expand'} row ${row.id}`}
      onClick={event => {
        event.stopPropagation();
        row.toggleExpanded();
      }}
    >
      <span className={cls('expandBar')} aria-hidden="true" />
      <span className={cls('expandBar')} aria-hidden="true" />
    </button>
  );
}
