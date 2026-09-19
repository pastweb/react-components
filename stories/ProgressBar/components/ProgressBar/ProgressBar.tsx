import { forwardRef } from 'react';
import { ProgressBar as PB } from '@pastweb/react-components/ProgressBar';
import { cl } from '@/styles';
import type { ProgressBarProps } from './types';

import classes from '@pastweb/components-core/ProgressBar/style.module.scss';

const cls = cl.setClasses(classes);

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => (
  <PB {...props} ref={ref} cls={cls} />
));

ProgressBar.displayName = 'ProgressBar';
