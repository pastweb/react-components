import { forwardRef } from 'react';
import {
  GlobalContext,
  useBeforeUnmount,
  useMediator,
  useSlots,
  withDefaultProps,
} from '@pastweb/react';
import { tabsMediator } from '@pastweb/components-core/Tabs';
import { DEFAULT_PROPS, TABS_CONTEXT_KEY } from './constants';
import type { TabsDefaultProps, TabsProps, TabsMediator } from './types';

export const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const p = withDefaultProps<TabsDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TabsMediator>(tabsMediator, p);
  const s = m.state;
  const c = m.getContext();
  const { Slots, Slot } = useSlots(p.children);

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [TABS_CONTEXT_KEY]: c }}>
      <Slots>
        <div
          ref={ref}
          className={p.cls('Tabs', s.isDisabled && 'is-disabled', p.className)}
          aria-disabled={s.isDisabled}
        >
          <ul
            className={p.cls('tabsList', s.className)}
            role='tablist'
            aria-label={s.ariaLabel}
            aria-orientation={s.orientation}
          >
            <Slot name='tabs' />
          </ul>
          <Slot
            name='content'
            map={(content, index) => {
              const isActive = c.activeTab === index;

              return (
                <div
                  key={index}
                  id={c.getContentId(index)}
                  className={p.cls('tabContent', s.className, isActive && 'is-active')}
                  role='tabpanel'
                  aria-labelledby={c.getTabId(index)}
                  tabIndex={isActive ? 0 : undefined}
                  hidden={isActive ? undefined : true}
                >
                  {content}
                </div>
              );
            }}
          />
        </div>
      </Slots>
    </GlobalContext>
  );
});

Tabs.displayName = 'Tabs';
