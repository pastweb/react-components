import type { RefObject } from 'react';
import type { DateTimePickerDefaultProps, DateTimePickerMediator } from '../types';

export interface CalendarProps {
  mediator: DateTimePickerMediator;
  props: DateTimePickerDefaultProps;
  className?: string;
  calendarRef: RefObject<HTMLDivElement | null>;
  timeToggleRef: RefObject<HTMLButtonElement | null>;
}
