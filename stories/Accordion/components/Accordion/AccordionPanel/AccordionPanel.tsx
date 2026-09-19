import { forwardRef } from 'react';
import { AccordionPanel as AP } from '@pastweb/react-components/Accordion';
import { cl } from '@/styles';
import type { AccordionPanelProps } from './types';

import classes from '@pastweb/components-core/Accordion/AccordionPanel/style.module.scss';

const cls = cl.setClasses(classes);

export const AccordionPanel = forwardRef<HTMLElement, AccordionPanelProps>((props, ref) => (
  <AP {...props} ref={ref} cls={cls} />
));

AccordionPanel.displayName = 'AccordionPanel';
