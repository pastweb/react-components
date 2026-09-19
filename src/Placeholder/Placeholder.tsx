import { forwardRef } from 'react';
import { useMediator, withDefaultProps } from '@pastweb/react';
import { placeholderMediator } from '@pastweb/components-core/Placeholder';
import { DEFAULT_PROPS } from './constants';
import type {
  PlaceholderDefaultProps,
  PlaceholderMediator,
  PlaceholderProps,
} from './types';

export const Placeholder = forwardRef<HTMLDivElement, PlaceholderProps>((props, ref) => {
  const p = withDefaultProps<PlaceholderDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<PlaceholderMediator>(placeholderMediator, p);
  const s = m.state;

  return (
    <div
      ref={ref}
      className={p.cls('Placeholder', { 'is-decorative': p.decorative }, p.className)}
      role={s.role}
      aria-label={s.ariaLabel}
      aria-live={s.ariaLive}
      aria-hidden={s.ariaHidden}
    />
  );
});

Placeholder.displayName = 'Placeholder';
