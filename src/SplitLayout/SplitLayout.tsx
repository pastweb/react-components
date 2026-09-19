import { Children, cloneElement, forwardRef, isValidElement, type ReactElement } from 'react';
import { GlobalContext, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/react';
import { splitLayoutMediator } from '@pastweb/components-core/SplitLayout';
import { DEFAULT_PROPS, SPLIT_LAYOUT_CONTEXT_KEY } from './constants';
import type { SplitLayoutDefaultProps, SplitLayoutMediator, SplitLayoutProps } from './types';

export const SplitLayout = forwardRef<HTMLDivElement, SplitLayoutProps>((props, ref) => {
  const p = withDefaultProps<SplitLayoutDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SplitLayoutMediator>(splitLayoutMediator, p);
  const s = m.state;
  const c = m.getContext();

  const children = Children.toArray(p.children);
  m.setItemCount(children.length);

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [SPLIT_LAYOUT_CONTEXT_KEY]: c }}>
      <div
        ref={ref}
        className={p.cls('SplitLayout', p.orientation, {
          'is-disabled': s.isDisabled,
          'is-resizing': s.activeSeparator !== null,
        }, p.className)}
        role='group'
        aria-label={s.ariaLabel}
      >
        {children.map((child, index) => isValidElement(child)
          ? cloneElement(child as ReactElement<{ index?: number }>, { index })
          : child)}
      </div>
    </GlobalContext>
  );
});

SplitLayout.displayName = 'SplitLayout';
