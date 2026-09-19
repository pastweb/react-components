import { forwardRef } from 'react';
import { Accordion as A } from '@pastweb/react-components/Accordion';
import { cl } from '@/styles';
import type { AccordionProps } from './types';

import classes from '@pastweb/components-core/Accordion/style.module.scss';

const cls = cl.setClasses(classes);

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => (
  <A {...props} ref={ref} cls={cls} />
));

Accordion.displayName = 'Accordion';
