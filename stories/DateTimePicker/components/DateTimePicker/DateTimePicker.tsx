import { forwardRef } from 'react';
import { DateTimePicker as D } from '@pastweb/react-components/DateTimePicker';
import { cl } from '@pastweb/tools';
import type { DateTimePickerProps } from './types';

import classes from '@pastweb/components-core/DateTimePicker/style.module.scss';

const cls = cl.setClasses(classes);

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>((props, ref) => (
  <D {...props} ref={ref} cls={cls} />
));

DateTimePicker.displayName = 'DateTimePicker';
