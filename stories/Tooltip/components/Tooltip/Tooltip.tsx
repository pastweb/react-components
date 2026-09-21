import { forwardRef } from 'react';
import { Tooltip as T } from '@pastweb/react-components/Tooltip';
import { cl } from '@pastweb/tools';
import type { TooltipProps } from './types';

import classes from '@pastweb/components-core/Tooltip/style.module.scss';

const cls = cl.setClasses(classes);

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>((props, ref) => (
  <T {...props} ref={ref} cls={cls} />
));

Tooltip.displayName = 'Tooltip';
