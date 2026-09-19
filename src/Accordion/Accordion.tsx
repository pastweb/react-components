import { forwardRef } from 'react';
import { GlobalContext, useBeforeUnmount, withDefaultProps, useMediator } from '@pastweb/react';
import { accordionMediator } from '@pastweb/components-core/Accordion';
import { ACCORDION_CONTEXT_KEY, DEFAULT_PROPS } from './constants';
import type { AccordionDefaultProps, AccordionProps, AccordionMediator } from './types';

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const p = withDefaultProps<AccordionDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<AccordionMediator>(accordionMediator, p);
  const s = m.state;
  const c = m.getContext();

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [ACCORDION_CONTEXT_KEY]: c }}>
      <div
        ref={ref}
        id={m.id}
        className={p.cls('Accordion', p.className, { 'is-disabled': s.isDisabled })}
        role={s.role}
        aria-label={s.ariaLabel}
        aria-disabled={s.isDisabled}
      >
        {p.children}
      </div>
    </GlobalContext>
  );
});

Accordion.displayName = 'Accordion';
