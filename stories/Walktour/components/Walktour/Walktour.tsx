import { forwardRef } from 'react';
import { Walktour as W } from '@pastweb/react-components/Walktour';
import { cl } from '@pastweb/tools';
import type { WalktourProps } from './types';

import classes from '@pastweb/components-core/Walktour/style.module.scss';

const cls = cl.setClasses(classes);

export const Walktour = forwardRef<HTMLDivElement, WalktourProps>((props, ref) => (
  <W {...props} ref={ref} cls={cls} />
));

Walktour.displayName = 'Walktour';
