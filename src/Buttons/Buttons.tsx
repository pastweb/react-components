import { forwardRef } from 'react';
import { GlobalContext, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/react';
import { BUTTONS_CONTEXT_KEY, buttonsMediator } from '@pastweb/components-core/Buttons';
import { DEFAULT_PROPS } from './constants';
import type { ButtonsDefaultProps, ButtonsMediator, ButtonsProps } from './types';

export const Buttons = forwardRef<HTMLDivElement, ButtonsProps>((props, ref) => {
  const p = withDefaultProps<ButtonsDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ButtonsMediator>(buttonsMediator, p);
  const s = m.state;
  const c = m.getContext();

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [BUTTONS_CONTEXT_KEY]: c }}>
      <div
        ref={ref}
        id={m.id}
        className={p.cls('Buttons', p.className, { 'is-disabled': s.isDisabled })}
        role={s.role}
        aria-label={s.ariaLabel}
        aria-disabled={s.isDisabled}
      >
        {p.children}
      </div>
    </GlobalContext>
  );
});

Buttons.displayName = 'Buttons';
