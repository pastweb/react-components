import { getContext } from '@pastweb/react';
import { DATETIME_PICKER_TRIGGER_PROPS_CONTEXT_KEY } from '@pastweb/components-core/DateTimePicker';
import type { DateTimePickerTargetProps } from './types';

/**
 * Reads the nearest DateTimePicker target bindings.
 *
 * @example
 * ```tsx
 * function CustomTarget() {
 *   const targetProps = useTargetProps();
 *
 *   return <button {...targetProps}>Choose a date</button>;
 * }
 * ```
 */
export function useTargetProps(): DateTimePickerTargetProps {
  return getContext<DateTimePickerTargetProps>(DATETIME_PICKER_TRIGGER_PROPS_CONTEXT_KEY);
}
