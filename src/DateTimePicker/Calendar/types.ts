import type { DateTimePickerDefaultProps, DateTimePickerMediator } from '../types';

export interface CalendarProps {
  mediator: DateTimePickerMediator;
  props: DateTimePickerDefaultProps;
  className?: string;
  calendarRef?: (element: HTMLDivElement | null) => void;
}
