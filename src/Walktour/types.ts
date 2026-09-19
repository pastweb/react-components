import type { Content, RefObject } from '@pastweb/react';
import type { WalktourDefaultProps as WDP, WalktourProps as WP, WalktourStep as WS } from '@pastweb/components-core/Walktour';

export type WalktourStep = Omit<WS, 'ref' | 'title' | 'description'> & {
  ref?: WS['ref'] | RefObject<HTMLElement | null>;
  title?: Content;
  description: Content;
};

export type WalktourProps = Omit<WP, 'steps'> & {
  steps: WalktourStep[];
};

export type WalktourDefaultProps = Omit<WDP, 'steps'> & {
  steps: WalktourStep[];
};

export type {
  WalktourCardPosition,
  WalktourMediator,
  WalktourHole,
  WalktourPlacement,
  WalktourRect,
  WalktourState,
  WalktourViewport,
} from '@pastweb/components-core/Walktour';
