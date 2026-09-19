import { forwardRef } from 'react';
import { Tab as T } from '@pastweb/react-components/Tabs/Tab/Tab';
import { cl } from '@/styles';;
import type { TabProps } from './types';

import tclasses from '@pastweb/components-core/Tabs/Tab/style.module.scss';

const cls = cl.setClasses(tclasses);

export const Tab = forwardRef<HTMLLIElement, TabProps>((props, ref) => (
  <T {...props} ref={ref} cls={cls} />
));

Tab.displayName = 'Tab';
