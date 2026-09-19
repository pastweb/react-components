import type { ToastControllerDefaultProps as TCDP, ToastControllerProps as TCP } from '@pastweb/components-core/ToastController';
import type { ReactElement } from 'react';

export type {
  ToastContext,
  ToastControllerMediator,
  ToastControllerState,
  ToastData,
} from '@pastweb/components-core/ToastController';

export type ToastControllerProps = TCP & {
  children: ReactElement;
};

export type ToastControllerDefaultProps = TCDP & {
  children: ReactElement;
};
