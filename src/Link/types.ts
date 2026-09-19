import type { MouseEvent, ReactNode } from 'react';
import type {
  LinkDefaultProps as LDP,
  LinkProps as LP,
} from '@pastweb/components-core/Link';

export type { LinkClickEvent, LinkMediator, LinkState } from '@pastweb/components-core/Link';

export type LinkProps = Omit<LP, 'onClick'> & {
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export type LinkDefaultProps = Omit<LDP, 'onClick'> & {
  children?: ReactNode;
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
};
