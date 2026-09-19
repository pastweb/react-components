import type {
  DropDownDefaultProps as DDDP,
  DropDownProps as DDP,
} from '@pastweb/components-core/DropDown';
import type { ReactNode } from 'react';

export type {
  AlignedPlacement,
  DropDownContext,
  DropDownMediator,
  Placement,
  Side,
  VisibleTarget,
} from '@pastweb/components-core/DropDown';

export type DropDownProps = DDP & {
  children: ReactNode;
};

export type DropDownDefaultProps = DDDP & {
  children: ReactNode;
};
