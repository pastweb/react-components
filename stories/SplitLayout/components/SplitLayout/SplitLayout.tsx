import { forwardRef } from 'react';
import { SplitLayout as SL } from '@pastweb/react-components/SplitLayout';
import { cl } from '@/styles';
import type { SplitLayoutProps } from './types';

import classes from '@pastweb/components-core/SplitLayout/style.module.scss';

const cls = cl.setClasses(classes);

export const SplitLayout = forwardRef<HTMLDivElement, SplitLayoutProps>((props, ref) => (
  <SL {...props} ref={ref} cls={cls} />
));

SplitLayout.displayName = 'SplitLayout';
