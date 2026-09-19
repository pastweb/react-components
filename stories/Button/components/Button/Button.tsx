import { forwardRef } from 'react';
import { Button as B } from '@pastweb/react-components/Button';
import { cl } from '@/styles';
import type { ButtonProps } from './types';

import classes from '@pastweb/components-core/Button/style.module.scss';

const cls = cl.setClasses(classes);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <B {...props} ref={ref} cls={cls} />
));

Button.displayName = 'Button';
