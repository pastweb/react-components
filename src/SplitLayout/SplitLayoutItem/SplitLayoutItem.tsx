import { forwardRef } from 'react';
import { getContext, useBeforeUnmount, useMediator, useRef, withDefaultProps } from '@pastweb/react';
import { splitLayoutItemMediator } from '@pastweb/components-core/SplitLayout';
import { DEFAULT_SPLIT_LAYOUT_ITEM_PROPS, SPLIT_LAYOUT_CONTEXT_KEY } from './constants';
import type {
  SplitLayoutContext,
  SplitLayoutItemDefaultProps,
  SplitLayoutItemMediator,
  SplitLayoutItemProps,
} from './types';

export const SplitLayoutItem = forwardRef<HTMLDivElement, SplitLayoutItemProps>((props, ref) => {
  const p = withDefaultProps<SplitLayoutItemDefaultProps>(props, DEFAULT_SPLIT_LAYOUT_ITEM_PROPS);
  const m = useMediator<SplitLayoutItemMediator>(splitLayoutItemMediator, p);
  const s = m.state;
  const c = getContext<SplitLayoutContext>(SPLIT_LAYOUT_CONTEXT_KEY);

  const lastPosition = useRef<number | null>(null);
  const isLast = p.index >= c.itemCount - 1;
  const separatorOrientation = c.orientation === 'horizontal' ? 'vertical' : 'horizontal';
  const separatorValue = c.getSeparatorValue(p.index);

  useBeforeUnmount(m.useBeforeUnmount);

  function coordinate(event: { clientX: number; clientY: number }): number {
    return c.orientation === 'horizontal' ? event.clientX : event.clientY;
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>): void {
    if (c.disabled) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    lastPosition.value = coordinate(event);
    c.onResizeStart(p.index);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>): void {
    if (lastPosition.value === null || c.disabled) return;
    const container = event.currentTarget.parentElement;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const total = c.orientation === 'horizontal' ? rect.width : rect.height;
    if (total <= 0) return;
    const nextPosition = coordinate(event);
    c.onResize(((nextPosition - lastPosition.value) / total) * 100);
    lastPosition.value = nextPosition;
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>): void {
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }
    lastPosition.value = null;
    c.onResizeEnd();
  }

  return (
    <>
      <div
        ref={ref}
        id={s.id}
        className={c.cls('pane', p.className)}
        style={{ flexBasis: `${c.getSize(p.index)}%` }}
        role={s.ariaLabel ? 'region' : undefined}
        aria-label={s.ariaLabel}
      >
        {p.children}
      </div>
      {!isLast && (
        <div
          className={c.cls('splitter', `splitter-${c.orientation}`, { 'is-disabled': c.disabled })}
          role='separator'
          tabIndex={c.disabled ? -1 : 0}
          aria-orientation={separatorOrientation}
          aria-label={s.separatorLabel}
          aria-controls={s.id}
          aria-valuemin={separatorValue.min}
          aria-valuemax={separatorValue.max}
          aria-valuenow={separatorValue.now}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onLostPointerCapture={onPointerUp}
          onKeyDown={event => c.onSeparatorKeyDown(event, p.index)}
        />
      )}
    </>
  );
});

SplitLayoutItem.displayName = 'SplitLayoutItem';
