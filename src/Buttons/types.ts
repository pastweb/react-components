import type { ButtonsDefaultProps as BDP, ButtonsProps as BP } from '@pastweb/components-core/Buttons';
import type { ReactNode } from 'react';

export type { ButtonsContext, ButtonsMediator, ButtonsState } from '@pastweb/components-core/Buttons';

export type ButtonsProps = BP & {
  children: ReactNode;
};

export type ButtonsDefaultProps = BDP & {
  children: ReactNode;
};
