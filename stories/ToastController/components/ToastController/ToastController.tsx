import { forwardRef } from 'react';
import { ToastController as T } from '@pastweb/react-components/ToastController';
import { cl } from '@pastweb/tools';
import type { ToastControllerProps } from './types';

import classes from '@pastweb/components-core/ToastController/style.module.scss';

const cls = cl.setClasses(classes);

export const ToastController = forwardRef<HTMLDivElement, ToastControllerProps>((props, ref) => (
  <T {...props} ref={ref} cls={cls} />
));

ToastController.displayName = 'ToastController';
