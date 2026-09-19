import { forwardRef } from 'react';
import { Input as I } from '@pastweb/react-components/Input';
import { cl } from '@/styles';
import type { InputProps } from './types';

import classes from '@pastweb/components-core/Input/style.module.scss';

const cls = cl.setClasses(classes);

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => (
  <I {...props} ref={ref} cls={cls} />
));

Input.displayName = 'Input';
