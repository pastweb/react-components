import { withDefaultProps } from '@pastweb/react';
import { forwardRef } from 'react';
import { DEFAULT_PROPS } from './constants';
import type { TagDefaultProps, TagProps } from './types';

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const p = withDefaultProps<TagDefaultProps>(props, DEFAULT_PROPS);

  return (
    <div
      ref={ref}
      className={p.cls('Tag', { 'is-rounded': p.rounded, 'has-close': p.closeButton }, p.className)}
      aria-label={p.ariaLabel || undefined}
    >
      <span className={p.cls('content')}>{p.children}</span>
      {p.closeButton ? (
        <button
          type='button'
          className={p.cls('closeButton')}
          onClick={p.onClose}
          aria-label={p.closeLabel}
        >
          <span className={p.cls('closeBar')} aria-hidden='true' />
          <span className={p.cls('closeBar')} aria-hidden='true' />
        </button>
      ) : null}
    </div>
  );
});

Tag.displayName = 'Tag';
