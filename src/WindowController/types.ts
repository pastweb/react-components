import type {
  WindowControllerDefaultProps as WCDP,
  WindowControllerProps as WCP,
} from '@pastweb/components-core/WindowController';
import type { ReactElement } from 'react';

export type {
  CloseOptions,
  WindowContext,
  WindowControllerMediator,
  WindowControllerState,
} from '@pastweb/components-core/WindowController';

export type WindowControllerProps = WCP & {
  children: ReactElement;
};

export type WindowControllerDefaultProps = WCDP & {
  children: ReactElement;
};
