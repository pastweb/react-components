import type { ReactNode } from 'react';
import type {
  SplitLayoutItemDefaultProps as SLIDP,
  SplitLayoutItemProps as SLIP,
} from '@pastweb/components-core/SplitLayout';

export type { SplitLayoutContext, SplitLayoutItemMediator } from '@pastweb/components-core/SplitLayout';

export type SplitLayoutItemProps = SLIP & { children?: ReactNode };
export type SplitLayoutItemDefaultProps = SLIDP & { children?: ReactNode };
