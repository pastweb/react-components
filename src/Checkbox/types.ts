import type {
  CheckboxDefaultProps as CDP,
  CheckboxProps as CP,
} from '@pastweb/components-core/Checkbox';
import type { ReactNode } from 'react';

export type CheckboxProps = CP & {
  children?: ReactNode;
};

export type CheckboxDefaultProps = CDP & {
  children?: ReactNode;
};

export type { CheckboxMediator } from '@pastweb/components-core/Checkbox';
