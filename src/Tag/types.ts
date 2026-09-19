import type { TagDefaultProps as TDP, TagProps as TP } from '@pastweb/components-core/Tag';
import type { ReactNode } from 'react';

export type TagProps = TP & {
  children: ReactNode;
};

export type TagDefaultProps = TDP & {
  children: ReactNode;
};
