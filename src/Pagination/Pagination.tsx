import { forwardRef } from 'react';
import { Render, useMediator, withDefaultProps } from '@pastweb/react';
import { paginationMediator } from '@pastweb/components-core/Pagination';
import { DEFAULT_PROPS } from './constants';
import type {
  PaginationDefaultProps,
  PaginationItem,
  PaginationMediator,
  PaginationProps,
} from './types';

export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  const p = withDefaultProps<PaginationDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<PaginationMediator>(paginationMediator, p);
  const s = m.state;

  return (
    <nav
      ref={ref}
      className={p.cls('Pagination', p.className, { 'is-disabled': s.isDisabled })}
      aria-label={s.ariaLabel}
    >
      <button
        type='button'
        className={p.cls('button', 'previous')}
        disabled={s.isPrevDisabled}
        onClick={m.onPrev}
        aria-label={p.prevAriaLabel}
      >
        <Render content={p.prev} />
      </button>
      <ul className={p.cls('pages')}>
        {s.pages.map((page: PaginationItem) => (
          <li key={page} className={p.cls('pageItem')}>
            <button
              type='button'
              className={p.cls('button', 'page', { 'is-active': s.current === page })}
              onClick={() => m.onPageChange(page)}
              disabled={s.isDisabled}
              aria-current={s.current === page ? 'page' : undefined}
              aria-label={typeof page === 'number'
                ? p.pageAriaLabel(page)
                : page === '... '
                  ? p.jumpBackAriaLabel
                  : p.jumpForwardAriaLabel}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        type='button'
        className={p.cls('button', 'next')}
        disabled={s.isNextDisabled}
        onClick={m.onNext}
        aria-label={p.nextAriaLabel}
      >
        <Render content={p.next} />
      </button>
    </nav>
  );
});

Pagination.displayName = 'Pagination';
