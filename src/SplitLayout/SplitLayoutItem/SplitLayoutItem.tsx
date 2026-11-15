import { forwardRef } from 'react';
import { getContext, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/react';
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

  const isLast = p.index >= c.itemCount - 1;
  const separatorOrientation = c.orientation === 'horizontal' ? 'vertical' : 'horizontal';
  const separatorValue = c.getSeparatorValue(p.index);

  useBeforeUnmount(m.useBeforeUnmount);

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
          onPointerDown={m.onPointerDown}
          onPointerMove={m.onPointerMove}
          onPointerUp={m.onPointerUp}
          onPointerCancel={m.onPointerUp}
          onLostPointerCapture={m.onPointerUp}
          onKeyDown={event => c.onSeparatorKeyDown(event, p.index)}
        />
      )}
    </>
  );
});

SplitLayoutItem.displayName = 'SplitLayoutItem';
