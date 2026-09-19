import {
  Children,
  forwardRef,
  isValidElement,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import { Render, useBeforeUnmount, useMediator, useMounted, useRef, withDefaultProps } from '@pastweb/react';
import { DEFAULT_PROPS, tooltipMediator } from '@pastweb/components-core/Tooltip';
import type { TooltipDefaultProps, TooltipMediator, TooltipProps } from './types';

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>((props, ref) => {
  const p = withDefaultProps<TooltipDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TooltipMediator>(tooltipMediator, p);
  const s = m.state;
  const triggerElement = useRef<HTMLSpanElement | null>(null);
  const tooltipElement = useRef<HTMLDivElement | null>(null);
  const arrowElement = useRef<HTMLDivElement | null>(null);
  const describedBy = s.isDisabled ? undefined : s.tooltipId;
  const items = Children.toArray(p.children);
  const hasElementTrigger = items.length === 1 && isValidElement(items[0]);

  useMounted(() => {
    if (!triggerElement.value || !tooltipElement.value || !arrowElement.value) return;
    m.useMounted(triggerElement.value, tooltipElement.value, arrowElement.value);
  });

  useBeforeUnmount(m.useBeforeUnmount);

  function onPointerEnter(event: PointerEvent<HTMLSpanElement>): void {
    if (event.pointerType === 'touch') return;
    m.show();
  }

  function onKeyDown(event: KeyboardEvent<HTMLSpanElement>): void {
    m.onKeyDown(event);
  }

  return (
    <span
      ref={ref}
      className={p.cls('Tooltip', { 'is-disabled': s.isDisabled }, p.className)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={() => m.hide()}
      onFocusCapture={() => m.show(true)}
      onBlurCapture={() => m.hide(true)}
      onKeyDown={onKeyDown}
    >
      <span
        ref={triggerElement}
        className={p.cls('trigger')}
        tabIndex={hasElementTrigger || s.isDisabled ? undefined : 0}
        aria-describedby={hasElementTrigger ? undefined : describedBy}
      >
        {p.children}
      </span>
      <div
        ref={tooltipElement}
        id={s.tooltipId}
        role='tooltip'
        className={p.cls('tooltipContent', { 'is-visible': s.isVisible }, p.className, p.tooltipClassName)}
      >
        <Render content={p.content} />
        <div ref={arrowElement} className={p.cls('arrow')} aria-hidden='true'>
          <div className={p.cls('triangle')} />
        </div>
      </div>
    </span>
  );
});

Tooltip.displayName = 'Tooltip';
