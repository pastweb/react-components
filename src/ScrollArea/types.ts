import type {
  ScrollAreaDefaultProps as SADP,
  ScrollAreaProps as SAP,
} from '@pastweb/components-core/ScrollArea';
import type { ReactNode } from 'react';

export type ScrollAreaProps = SAP & {
  children?: ReactNode;
};

export type ScrollAreaDefaultProps = SADP & {
  children?: ReactNode;
};

export type { ScrollAreaMediator } from '@pastweb/components-core/ScrollArea';
