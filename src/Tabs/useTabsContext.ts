import { getContext } from '@pastweb/react';
import { TABS_CONTEXT_KEY } from './constants';
import type { TabDefaultProps } from './Tab/types';
import type { TabsContext } from './types';

/**
 * Reads the nearest Tabs live state, registered Tab props, and command methods.
 *
 * Use this hook when extending Tab or customizing panel content from stored
 * Tab props, such as wrapping a panel in a scroll area.
 *
 * @example
 * ```tsx
 * function TabScrollArea({ index, children }) {
 *   const { tabs } = useTabsContext<ExtendedTabProps>();
 *   const scrollArea = tabs[index]?.scrollArea;
 *
 *   if (scrollArea === false) return children;
 *
 *   return <ScrollArea {...scrollArea}>{children}</ScrollArea>;
 * }
 * ```
 */
export function useTabsContext<T = TabDefaultProps>(): TabsContext<T> {
  return getContext<TabsContext<T>>(TABS_CONTEXT_KEY);
}
