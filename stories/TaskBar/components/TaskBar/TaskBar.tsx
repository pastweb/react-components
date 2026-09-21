import { forwardRef } from 'react';
import { TaskBar as T } from '@pastweb/react-components/TaskBar';
import { cl } from '@pastweb/tools';
import type { TaskBarProps } from './types';

import classes from '@pastweb/components-core/TaskBar/style.module.scss';

const cls = cl.setClasses(classes);

export const TaskBar = forwardRef<HTMLElement, TaskBarProps>((props, ref) => (
  <T {...props} ref={ref} cls={cls} />
));

TaskBar.displayName = 'TaskBar';
