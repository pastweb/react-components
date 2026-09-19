import { forwardRef } from 'react';
import { SelectItem as SI } from '@pastweb/react-components/Select';
import { cl } from '@/styles';
import type { SelectItemProps } from './types';

import classes from '@pastweb/components-core/Select/SelectItem/style.module.scss';

const cls = cl.setClasses(classes);

export const SelectItem = forwardRef<HTMLLIElement, SelectItemProps>((props, ref) => (
  <SI {...props} ref={ref} cls={cls} />
));

SelectItem.displayName = 'SelectItem';
