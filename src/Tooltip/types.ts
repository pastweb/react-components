import type {
  TooltipDefaultProps as TDP,
  TooltipProps as TP,
} from '@pastweb/components-core/Tooltip';
import type { Content } from '@pastweb/react';
import type { ReactNode } from 'react';

export type TooltipProps = Omit<TP, 'content'> & {
  children: ReactNode;
  content?: Content;
};

export type TooltipDefaultProps = Omit<TDP, 'content'> & {
  children: ReactNode;
  content: Content;
};

export type {
  Placement,
  TooltipMediator,
  TooltipPlacement,
  TooltipState,
} from '@pastweb/components-core/Tooltip';
