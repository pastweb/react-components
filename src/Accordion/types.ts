import type {
  AccordionDefaultProps as ADP,
  AccordionProps as AP,
  AccordionPanelDefaultProps as APDP,
  AccordionPanelProps as APP,
} from '@pastweb/components-core/Accordion';
import type { ReactElement, ReactNode } from 'react';

export type {
  AccordionContext,
  AccordionMediator,
  AccordionPanelControlReference,
  AccordionPanelMediator,
  AccordionPanelState,
  AccordionState,
} from '@pastweb/components-core/Accordion';

export type AccordionPanelProps = APP & {
  children: ReactNode | ReactNode[];
};

export type AccordionPanelDefaultProps = APDP & {
  children: ReactNode | ReactNode[];
};

export type AccordionProps = AP & {
  children: ReactElement | ReactElement[];
};

export type AccordionDefaultProps = ADP & {
  children: ReactElement | ReactElement[];
};
