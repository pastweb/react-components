import { forwardRef } from 'react';
import { SplitLayoutItem as SLI } from '@pastweb/react-components/SplitLayout';
import type { SplitLayoutItemProps } from './types';

export const SplitLayoutItem = forwardRef<HTMLDivElement, SplitLayoutItemProps>((props, ref) => (
  <SLI {...props} ref={ref} />
));

SplitLayoutItem.displayName = 'SplitLayoutItem';
