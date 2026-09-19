import type { ReactNode } from 'react';
import type {
  InputDefaultProps as IDP,
  InputProps as IP,
} from '@pastweb/components-core/Input';

export type {
  InputKeyEvent,
  InputMediator,
  InputReference,
  InputState,
} from '@pastweb/components-core/Input';

export type InputProps = IP & {
  children?: ReactNode | ReactNode[];
};

export type InputDefaultProps = IDP & {
  children?: ReactNode | ReactNode[];
};
