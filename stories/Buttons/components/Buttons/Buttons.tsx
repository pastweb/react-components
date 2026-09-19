import { forwardRef } from 'react';
import { Buttons as B } from '@pastweb/react-components/Buttons';
import { cl } from '@/styles';
import type { ButtonsProps } from './types';

import classes from '@pastweb/components-core/Buttons/style.module.scss';

const cls = cl.setClasses(classes);

export const Buttons = forwardRef<HTMLDivElement, ButtonsProps>((props, ref) => {
  return (
    <B {...props} ref={ref} cls={cls} />
  );
});

Buttons.displayName = 'Buttons';
