import { forwardRef } from 'react';
import { useBeforeUnmount, useMediator, useMounted, useRef, withDefaultProps } from '@pastweb/react';
import { tabMediator } from '@pastweb/components-core/Tabs';
import { DEFAULT_TAB_PROPS } from './constants';
import type { TabDefaultProps, TabMediator, TabProps } from './types';

export const Tab = forwardRef<HTMLLIElement, TabProps>((props, ref) => {
  const p = withDefaultProps<TabDefaultProps>(props, DEFAULT_TAB_PROPS);
  const m = useMediator<TabMediator>(tabMediator, p);
  const s = m.state;

  const buttonElement = useRef<HTMLButtonElement | null>(null);

  useMounted(() => {
    if (!buttonElement.value) return;

    m.useMounted(buttonElement.value);
  });

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <li
      ref={ref}
      className={s.className}
      role='presentation'
    >
      <button
        ref={buttonElement}
        type='button'
        id={s.id}
        className={p.cls('tabButton')}
        role='tab'
        aria-label={s.ariaLabel}
        aria-selected={s.isActive}
        aria-controls={s.controlsId}
        aria-disabled={s.isDisabled}
        disabled={s.isDisabled}
        tabIndex={s.tabIndex}
        onClick={m.onActivate}
        onKeyDown={m.onKeyDown}
      >
        <span className={p.cls('tabContent')}>
          {p.children}
        </span>
      </button>
    </li>
  );
});

Tab.displayName = 'Tab';
