import type { ForwardedRef, MouseEvent, ReactNode } from 'react';
import type { ButtonDefaultProps as BDP, ButtonProps as BP } from '@pastweb/components-core/Button';

export type { ButtonMediator, ButtonState } from '@pastweb/components-core/Button';

export type ButtonProps = Omit<BP, 'onClick'> & {
  ref?: ForwardedRef<HTMLElement | null> | ((node: HTMLElement | null) => void);
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode | ReactNode[];
};

export type ButtonDefaultProps = Omit<BDP, 'onClick'> & {
  ref?: ForwardedRef<HTMLElement | null> | ((node: HTMLElement | null) => void);
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode | ReactNode[];
};
