import { forwardRef } from 'react';
import { Placeholder as P } from '@pastweb/react-components/Placeholder';
import { cl } from '@pastweb/tools';
import type { PlaceholderProps } from './types';

import classes from '@pastweb/components-core/Placeholder/style.module.scss';

const cls = cl.setClasses(classes);

export const Placeholder = forwardRef<HTMLDivElement, PlaceholderProps>((props, ref) => (
  <P {...props} ref={ref} cls={cls} />
));

Placeholder.displayName = 'Placeholder';
