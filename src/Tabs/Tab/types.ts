import type { ReactNode } from 'react';
import type { TabProps as TP, TabDefaultProps as TDP } from '@pastweb/components-core/Tabs';
export type {
  TabButtonReference,
  TabMediator,
  TabMediatorVars,
  TabState,
} from '@pastweb/components-core/Tabs';

export type TabProps = TP & {
  /** Content of the Tab */
  children: ReactNode;
};

export type TabDefaultProps = TDP & {
  /** Content of the Tab */
  children: ReactNode;
};
