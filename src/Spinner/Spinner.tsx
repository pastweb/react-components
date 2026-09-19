import { useMediator, withDefaultProps } from '@pastweb/react';
import { forwardRef } from 'react';
import { spinnerMediator } from '@pastweb/components-core/Spinner';
import { DEFAULT_PROPS } from './constants';
import type { SpinnerDefaultProps, SpinnerMediator, SpinnerProps } from './types';

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
  const p = withDefaultProps<SpinnerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SpinnerMediator>(spinnerMediator, p);
  const s = m.state;

  return (
    <div
      ref={ref}
      className={p.cls('Spinner', { 'is-decorative': p.decorative }, p.className)}
      role={s.role}
      aria-label={s.ariaLabel}
      aria-live={s.ariaLive}
    >
      <span className={p.cls('content')} aria-hidden='true'>{p.children}</span>
    </div>
  );
});

Spinner.displayName = 'Spinner';
