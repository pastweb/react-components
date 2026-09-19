import { forwardRef } from 'react';
import { Toggle as T } from '@pastweb/react-components/Toggle';
import { cl } from '@/styles';
import type { ToggleProps } from './types';

import classes from '@pastweb/components-core/Toggle/style.module.scss';

const cls = cl.setClasses(classes);

export const Toggle = forwardRef<HTMLDivElement, ToggleProps>((props, ref) => (
  <T {...props} ref={ref} cls={cls} />
));

Toggle.displayName = 'Toggle';
