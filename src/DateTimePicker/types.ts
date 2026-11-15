import type { ReactNode, RefObject } from 'react';
import type {
  DateTimePickerDefaultProps as DDP,
  DateTimePickerProps as DTP,
  DateTimePickerTriggerProps as DTPTP,
} from '@pastweb/components-core/DateTimePicker';

export type DateTimePickerProps = DTP & { children?: ReactNode };
export type DateTimePickerDefaultProps = DDP & { children?: ReactNode };

export type DateTimePickerTargetProps = DTPTP & {
  ref: RefObject<HTMLButtonElement | null>;
};

export type {
  CalendarDay,
  DateRule,
  DateTimePickerLocale,
  DateTimePickerMediator,
  DateTimePickerMode,
  DateTimePickerState,
  DateTimePickerTriggerProps,
  DateTimePickerValue,
} from '@pastweb/components-core/DateTimePicker';
