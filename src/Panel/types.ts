import type { ReactNode } from 'react';
import type { Content } from '@pastweb/react';
import type { PanelDefaultProps as PDP, PanelProps as PP } from '@pastweb/components-core/Panel';

export type { PanelMediator, PanelState } from '@pastweb/components-core/Panel';

export type PanelProps = Omit<PP, 'title'> & {
  title?: Content;
  children?: ReactNode;
};

export type PanelDefaultProps = Omit<PDP, 'title'> & {
  title?: Content;
  children?: ReactNode;
};
