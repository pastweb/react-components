import { forwardRef } from 'react';
import { DropDown as D } from '@pastweb/react-components/DropDown';
import { cl } from '@/styles';
import type { DropDownProps } from './types';

import classes from '@pastweb/components-core/DropDown/style.module.scss';

const cls = cl.setClasses(classes);

export const DropDown = forwardRef<HTMLDivElement, DropDownProps>((props, ref) => (
  <D {...props} ref={ref} cls={cls} />
));

DropDown.displayName = 'DropDown';
