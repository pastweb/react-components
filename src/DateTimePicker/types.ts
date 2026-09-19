import type { ReactNode } from 'react';
import type { DateTimePickerDefaultProps as DDP, DateTimePickerProps as DTP } from '@pastweb/components-core/DateTimePicker';

export type DateTimePickerProps = DTP & { children?: ReactNode };
export type DateTimePickerDefaultProps = DDP & { children?: ReactNode };

export type {
  CalendarDay,
  DateRule,
  DateTimePickerLocale,
  DateTimePickerMediator,
  DateTimePickerMode,
  DateTimePickerState,
  DateTimePickerValue,
} from '@pastweb/components-core/DateTimePicker';
