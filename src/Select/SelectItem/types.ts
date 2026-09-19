import type { KeyboardEvent, ReactNode } from 'react';
import type { SelectItemProps as SIP, SelectItemDefaultProps as SIDP } from '@pastweb/components-core/Select';

export type { SelectContext } from '../types';

export type SelectItemProps = Omit<SIP, 'onKeyDown'> & {
  children: ReactNode;
  onKeyDown?: (event: KeyboardEvent<HTMLLIElement>) => void;
};

export type SelectItemDefaultProps = Omit<SIDP, 'onKeyDown'> & {
  children: ReactNode;
  onKeyDown: (event: KeyboardEvent<HTMLLIElement>) => void;
};
