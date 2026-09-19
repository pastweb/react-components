import { forwardRef } from 'react';
import { Stepper as S } from '@pastweb/react-components/Stepper';
import { cl } from '@/styles';
import type { StepperProps } from './types';

import classes from '@pastweb/components-core/Stepper/style.module.scss';

const cls = cl.setClasses(classes);

export const Stepper = forwardRef<HTMLDivElement, StepperProps>((props, ref) => (
  <S {...props} ref={ref} cls={cls} />
));

Stepper.displayName = 'Stepper';
