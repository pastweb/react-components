import { forwardRef } from 'react';
import { Checkbox as C } from '@pastweb/react-components/Checkbox';
import { cl } from '@/styles';
import type { CheckboxProps } from './types';

import classes from '@pastweb/components-core/Checkbox/style.module.scss';

const cls = cl.setClasses(classes);

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>((props, ref) => (
  <C {...props} ref={ref} cls={cls} />
));

Checkbox.displayName = 'Checkbox';
