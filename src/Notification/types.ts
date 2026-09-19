import type { ReactNode } from 'react';
import type {
  NotificationDefaultProps as NDP,
  NotificationProps as NP,
} from '@pastweb/components-core/Notification';

export type {
  NotificationMediator,
  NotificationState,
} from '@pastweb/components-core/Notification';

export type NotificationProps = NP & {
  children?: ReactNode;
};

export type NotificationDefaultProps = NDP & {
  children?: ReactNode;
};
