import { forwardRef } from 'react';
import { useMediator, useMounted, useRef, withDefaultProps } from '@pastweb/react';
import { scrollAreaMediator } from '@pastweb/components-core/ScrollArea';
import { DEFAULT_PROPS } from './constants';
import type {
  ScrollAreaDefaultProps,
  ScrollAreaMediator,
  ScrollAreaProps,
} from './types';

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>((props, ref) => {
  const p = withDefaultProps<ScrollAreaDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ScrollAreaMediator>(scrollAreaMediator, p);
  const s = m.state;
  const contentElement = useRef<HTMLDivElement | null>(null);

  useMounted(() => {
    if (!contentElement.value) return;
    const alignment = m.getScrollAlignment();
    if (alignment.horizontal === 'end') {
      contentElement.value.scrollLeft = contentElement.value.scrollWidth - contentElement.value.clientWidth;
    }
    if (alignment.vertical === 'end') {
      contentElement.value.scrollTop = contentElement.value.scrollHeight - contentElement.value.clientHeight;
    }
  });

  return (
    <div
      ref={ref}
      id={p.id}
      className={p.cls('ScrollArea', {
        'hide-x': p.hideX,
        'hide-y': p.hideY,
        'scroll-bottom': p.scrollBottom,
        'scroll-right': p.scrollRight,
      }, p.className)}
    >
      <div
        ref={contentElement}
        className={p.cls('content')}
        style={m.getContentStyle()}
        role='region'
        aria-label={s.ariaLabel}
        tabIndex={p.tabIndex}
      >
        {p.children}
      </div>
    </div>
  );
});

ScrollArea.displayName = 'ScrollArea';
