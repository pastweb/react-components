import { forwardRef } from 'react';
import { Spinner as S } from '@pastweb/react-components/Spinner';
import { cl } from '@/styles';
import type { SpinnerProps } from './types';

import classes from '@pastweb/components-core/Spinner/style.module.scss';

const cls = cl.setClasses(classes);

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => (
  <S {...props} ref={ref} cls={cls} />
));

Spinner.displayName = 'Spinner';
