import type { SpinnerDefaultProps as SDP, SpinnerProps as SP } from '@pastweb/components-core/Spinner';
import type { ReactNode } from 'react';

export type SpinnerProps = SP & {
  children?: ReactNode;
};

export type SpinnerDefaultProps = SDP & {
  children?: ReactNode;
};

export type { SpinnerMediator } from '@pastweb/components-core/Spinner';
