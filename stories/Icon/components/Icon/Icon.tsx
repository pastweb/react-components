import { forwardRef } from 'react';
import { Icon as I } from '@pastweb/react-components/Icon';
import { cl } from '@/styles';
import type { IconProps } from './types';

import classes from '@pastweb/components-core/Icon/style.module.scss';

const cls = cl.setClasses(classes);

export const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => (
  <I {...props} ref={ref} cls={cls} />
));

Icon.displayName = 'Icon';
