import { forwardRef, useEffect } from 'react';
import { GlobalContext, useBeforeUnmount, useMediator, useMounted, useRef, useSlots, withDefaultProps } from '@pastweb/react';
import { DATETIME_PICKER_TRIGGER_PROPS_CONTEXT_KEY, DEFAULT_PROPS, dateTimePickerMediator } from '@pastweb/components-core/DateTimePicker';
import { Calendar } from './Calendar';
import type { DateTimePickerDefaultProps, DateTimePickerMediator, DateTimePickerProps, DateTimePickerTargetProps } from './types';

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>((props, ref) => {
  const p = withDefaultProps<DateTimePickerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<DateTimePickerMediator>(dateTimePickerMediator, p);
  const s = m.state;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const timeToggleRef = useRef<HTMLButtonElement | null>(null);
  const { Slots, Slot } = useSlots(p.children);
  const targetProps: DateTimePickerTargetProps = {
    ref: triggerRef,
    id: s.triggerId,
    role: 'button',
    tabIndex: p.disabled ? -1 : 0,
    'aria-label': p.label ? undefined : p.ariaLabel,
    'aria-labelledby': p.label ? s.labelId : undefined,
    'aria-disabled': p.disabled || undefined,
    'aria-haspopup': 'dialog',
    'aria-expanded': s.isOpen,
    onClick: m.toggle,
    onKeyDown: m.onKeyDown,
  } as const;

  const mountMediator = () => m.useMounted(triggerRef.value, calendarRef.value, timeToggleRef.value);

  useMounted(mountMediator);
  useEffect(mountMediator, [s.isOpen]);
  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [DATETIME_PICKER_TRIGGER_PROPS_CONTEXT_KEY]: targetProps }}>
      <Slots>
        <div ref={ref} id={s.inputId} className={p.cls('DateTimePicker', `label-${p.labelPlacement}`, p.className, { 'is-disabled': p.disabled })}>
        <div className={p.cls('field')}>
          <div className={p.cls('control')}>
            <Slot name='target'>
              <button {...targetProps} type='button' className={p.cls('trigger')} disabled={p.disabled}>
                <span className={p.cls('triggerValue', { placeholder: !m.displayValue() })}>{m.displayValue() || p.placeholder}</span>
                <span className={p.cls('arrow')} aria-hidden='true'>▼</span>
              </button>
            </Slot>
            {p.name ? <input type='hidden' name={p.name} value={m.serializedValue()} /> : null}
          </div>
          {p.label ? <label id={s.labelId} className={p.cls('label', p.labelPlacement)} htmlFor={s.triggerId}>{p.label}</label> : null}
        </div>
      {p.inline ? (
        <Calendar mediator={m} props={p} className={p.inline ? 'inlineCalendar' : 'popupCalendar'} calendarRef={calendarRef} timeToggleRef={timeToggleRef} />
      ) : null}
      {!p.inline && s.isOpen ? (
        <Calendar mediator={m} props={p} className={p.inline ? 'inlineCalendar' : 'popupCalendar'} calendarRef={calendarRef} timeToggleRef={timeToggleRef} />
      ) : null}
        </div>
      </Slots>
    </GlobalContext>
  );
});

DateTimePicker.displayName = 'DateTimePicker';
