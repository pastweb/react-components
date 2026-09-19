import { forwardRef } from 'react';
import { Tabs as T } from '@pastweb/react-components/Tabs/Tabs';
import { cl } from '@/styles';
import type { TabsProps } from './types';

import classes from '@pastweb/components-core/Tabs/style.module.scss';

const cls = cl.setClasses(classes);

export const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => (
  <T {...props} ref={ref} cls={cls} />
));

Tabs.displayName = 'Tabs';
