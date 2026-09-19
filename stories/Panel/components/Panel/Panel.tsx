import { forwardRef } from 'react';
import { Panel as P } from '@pastweb/react-components/Panel';
import { cl } from '@/styles';
import type { PanelProps } from './types';

import classes from '@pastweb/components-core/Panel/style.module.scss';

const cls = cl.setClasses(classes);

export const Panel = forwardRef<HTMLElement, PanelProps>((props, ref) => (
  <P {...props} ref={ref} cls={cls} />
));

Panel.displayName = 'Panel';
