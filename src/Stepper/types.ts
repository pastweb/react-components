import type { Step as S, StepperDefaultProps as SD, StepDefaultProps as SDP, StepperProps as SP } from '@pastweb/components-core/Stepper';
import type { Content } from '@pastweb/react';

export type Step = Omit<S, 'content'> & {
  content?: Content;
};

export type StepDefaultProps = Omit<SDP, 'content'> & {
  content?: Content;
};

export type StepperProps = Omit<SP, 'steps'> & {
  steps: Step[];
};

export type StepperDefaultProps = Omit<SD, 'steps'> & {
  steps: Step[];
};

export type {
  StepperMediator,
  StepperState,
  StepperStepState,
} from '@pastweb/components-core/Stepper';
