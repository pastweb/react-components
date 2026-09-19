import type { SplitLayoutDefaultProps as SLDP, SplitLayoutProps as SLP } from '@pastweb/components-core/SplitLayout';
import type { ReactElement } from 'react';

export type SplitLayoutProps = SLP & {
  children: ReactElement | ReactElement[];
};

export type SplitLayoutDefaultProps = SLDP & {
  children: ReactElement | ReactElement[];
};

export type {
  SplitLayoutContext,
  SplitLayoutMediator,
  SplitLayoutOrientation,
  SplitLayoutState,
} from '@pastweb/components-core/SplitLayout';
