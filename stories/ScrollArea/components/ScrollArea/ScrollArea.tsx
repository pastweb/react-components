import { forwardRef } from 'react';
import { ScrollArea as SA } from '@pastweb/react-components/ScrollArea';
import { cl } from '@/styles';
import type { ScrollAreaProps } from './types';

import classes from '@pastweb/components-core/ScrollArea/style.module.scss';

const cls = cl.setClasses(classes);

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>((props, ref) => (
  <SA {...props} ref={ref} cls={cls} />
));

ScrollArea.displayName = 'ScrollArea';
