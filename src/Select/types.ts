import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import type {
  SelectContext as SC,
  SelectDefaultProps as SDP,
  SelectMediator as SM,
  SelectProps as SP,
} from '@pastweb/components-core/Select';

export type SelectProps = SP & {
  children?: ReactNode | ReactNode[];
};

export type SelectDefaultProps = SDP & {
  children?: ReactNode | ReactNode[];
};

export type SelectMediator = Omit<SM, 'onKeyDown' | 'onOptionKeyDown' | 'onToggle'> & {
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onOptionKeyDown: (event: KeyboardEvent<HTMLLIElement>, value: any, disabled?: boolean) => void;
  onToggle: (event?: MouseEvent<HTMLElement>) => void;
};

export type SelectContext = Omit<SC, 'onOptionKeyDown'> & {
  onOptionKeyDown: (event: KeyboardEvent<HTMLLIElement>, value: any, disabled?: boolean) => void;
};

export type { SelectState } from '@pastweb/components-core/Select';
