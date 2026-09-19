import type { ReactNode } from 'react';
import type { SheetControllerDefaultProps as SCDP, SheetControllerProps as SCP } from '@pastweb/components-core/SheetController';

export type {
  CloseOptions,
  SheetContext,
  SheetControllerMediator,
  SheetControllerState,
  SheetDirection,
  SheetEvent,
  SheetKeyboardEvent,
} from '@pastweb/components-core/SheetController';

export type SheetControllerProps = SCP & {
  children?: ReactNode;
};

export type SheetControllerDefaultProps = SCDP & {
  children?: ReactNode;
};
