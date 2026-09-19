import { forwardRef } from 'react';
import { Notification as N } from '@pastweb/react-components/Notification';
import { cl } from '@/styles';
import type { NotificationProps } from './types';

import classes from '@pastweb/components-core/Notification/style.module.scss';

const cls = cl.setClasses(classes);

export const Notification = forwardRef<HTMLElement, NotificationProps>((props, ref) => (
  <N {...props} ref={ref} cls={cls} />
));

Notification.displayName = 'Notification';
