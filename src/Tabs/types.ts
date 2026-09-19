import type { ReactNode } from 'react';
import type { TabsProps as TP, TabsDefaultProps as TDP } from '@pastweb/components-core/Tabs';

export type { TabsMediator, TabsContext } from '@pastweb/components-core/Tabs';

export type TabsProps = TP & {
  children: ReactNode;
};

export type TabsDefaultProps = TDP & {
  children: ReactNode;
};
