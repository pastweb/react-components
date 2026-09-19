import { forwardRef, type CSSProperties, type ElementType } from 'react';
import { Render, useSlots, useMediator, withDefaultProps, useBeforeUnmount, useMounted, useRef } from '@pastweb/react';
import { accordionPanelMediator } from '@pastweb/components-core/Accordion';
import { DEFAULT_ACCORDION_PANEL_PROPS } from '../constants';
import type { AccordionPanelDefaultProps, AccordionPanelMediator, AccordionPanelProps } from './types';

export const AccordionPanel = forwardRef<HTMLElement, AccordionPanelProps>((props, ref) => {
  const p = withDefaultProps<AccordionPanelDefaultProps>(props, DEFAULT_ACCORDION_PANEL_PROPS);
  const m = useMediator<AccordionPanelMediator>(accordionPanelMediator, p);
  const s = m.state;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const Heading = `h${p.headingLevel}` as ElementType;
  const { Slots, Slot } = useSlots(p.children);

  useMounted(() => {
    if (!triggerRef.value) return;

    m.useMounted({
      focus: () => triggerRef.value?.focus(),
    });
  });

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <Slots>
      <section
        ref={ref}
        id={m.id}
        className={s.className}
        dir={s.isRtl ? 'rtl' : undefined}
        aria-disabled={s.isDisabled}
        style={{ transitionDuration: s.transitionDuration } as CSSProperties}
      >
        <Heading className={p.cls('heading')}>
          <button
            ref={triggerRef}
            id={m.triggerId}
            type='button'
            className={p.cls('header', {
              rtl: s.isRtl,
              'hide-border': s.hideBorderBottom,
            })}
            aria-expanded={s.isOpen}
            aria-controls={m.panelId}
            disabled={s.isDisabled}
            onClick={m.onToggle}
          >
            <Slot name='header'>
              <span className={p.cls('title')}>
                <Render content={p.title} />
              </span>
              <span
                className={p.cls('closeButton', s.isOpen ? 'is-open' : '')}
                aria-hidden='true'
              >
                <span className={p.cls('closeBar')} />
                <span className={p.cls('closeBar')} />
              </span>
            </Slot>
          </button>
        </Heading>

        <div
          id={m.panelId}
          className={p.cls('container', s.isOpen ? 'is-open' : '')}
          role={s.role}
          aria-labelledby={m.triggerId}
          aria-hidden={!s.isOpen}
          inert={!s.isOpen}
          onTransitionEnd={m.onTransitionEnd}
        >
          <div className={p.cls('contentWrapper')}>
            <div className={p.cls('content')}>
              <Slot />
            </div>
          </div>
        </div>
      </section>
    </Slots>
  );
});

AccordionPanel.displayName = 'AccordionPanel';
