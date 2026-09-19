import { Fragment } from 'react';
import { getWeekNumber } from '@pastweb/components-core/DateTimePicker';
import type { CalendarProps } from './types';

export function Calendar({ mediator: m, props: p, className, calendarRef }: CalendarProps) {
  const s = m.state;

  return (
    <div
      ref={calendarRef}
      className={p.cls('calendar', className, {
        'is-multiple': p.mode === 'multiple',
        'is-range': p.mode === 'range',
        'is-time-open': s.isTimePickerOpen,
        'is-time-only': p.noCalendar,
      })}
      role='dialog'
      aria-label={p.ariaLabel}
      onKeyDown={m.onKeyDown}
      onMouseLeave={() => m.setHoverDate(null)}
    >
      {!p.noCalendar ? (
        <div className={p.cls('calendarContent')} inert={s.isTimePickerOpen}>
          <header className={p.cls('header')}>
            <button type='button' className={p.cls('navigation')} aria-label={p.previousMonthAriaLabel} onClick={() => m.navigate(-1)}>{p.prevMonth}</button>
            <span className={p.cls('month')} aria-live='polite'>
              {p.yearSelect ? s.locale.months[s.viewDate.getMonth()] : m.monthLabel()}
              {p.yearSelect ? (
                <select className={p.cls('yearSelect')} value={s.viewDate.getFullYear()} aria-label={p.yearSelectAriaLabel} onChange={event => m.selectYear(Number(event.target.value))}>
                  {s.years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              ) : null}
            </span>
            <button type='button' className={p.cls('navigation')} aria-label={p.nextMonthAriaLabel} onClick={() => m.navigate(1)}>{p.nextMonth}</button>
          </header>
          <div className={p.cls('weekdays')}>
            {p.weekNumbers ? <span className={p.cls('weekNumber')}>#</span> : null}
            {s.weekdayNames.map(name => <span key={name} className={p.cls('weekday')} aria-label={name}>{name.slice(0, 2)}</span>)}
          </div>
          <div className={p.cls('days', { 'has-week-numbers': p.weekNumbers })}>
            {s.days.map((day, index) => (
              <Fragment key={day.date.toISOString()}>
                {p.weekNumbers && index % 7 === 0 ? <span className={p.cls('weekNumber')}>{getWeekNumber(day.date)}</span> : null}
                <button
                  type='button'
                  className={p.cls('day', {
                    'is-outside': !day.isCurrentMonth,
                    'is-selected': day.isSelected,
                    'is-in-range': day.isInRange,
                    'is-range-start': day.isRangeStart,
                    'is-range-end': day.isRangeEnd,
                    'is-today': day.isToday,
                    'is-sat': day.isSaturday,
                    'is-sun': day.isSunday,
                    'is-free-day': day.isFreeDay,
                    'is-holiday': day.isHoliday,
                    'is-focused': day.date.toDateString() === s.focusedDate.toDateString(),
                  }, p.getDayClassName?.(day.date))}
                  disabled={day.isDisabled}
                  aria-pressed={day.isSelected}
                  aria-label={p.formatDate?.(day.date) ?? day.date.toDateString()}
                  onFocus={() => m.focusDate(day.date)}
                  onMouseEnter={() => m.setHoverDate(day.date)}
                  onClick={() => m.selectDate(day.date)}
                >{day.date.getDate()}</button>
              </Fragment>
            ))}
          </div>
          <footer className={p.cls('footer')}>
            <button type='button' className={p.cls('action')} onClick={() => m.selectDate(new Date())}>{s.locale.today}</button>
            {p.enableTime ? <button ref={m.setTimeToggleReference} type='button' className={p.cls('action', 'timeToggle')} aria-label={p.selectTimeAriaLabel} aria-expanded={s.isTimePickerOpen} onClick={m.toggleTimePicker}>⏰︎</button> : null}
            <button type='button' className={p.cls('action')} onClick={m.clear}>{s.locale.clear}</button>
          </footer>
        </div>
      ) : null}
      {p.enableTime ? (
        <section className={p.cls('timePanel', { 'is-open': s.isTimePickerOpen, 'is-time-only': p.noCalendar })} inert={!s.isTimePickerOpen}>
          {!p.noCalendar ? (
            <button type='button' className={p.cls('timeClose', 'is-open')} aria-label={p.backToCalendarAriaLabel} tabIndex={s.isTimePickerOpen ? 0 : -1} onClick={m.toggleTimePicker}>
              <span className={p.cls('timeCloseBar')} />
              <span className={p.cls('timeCloseBar')} />
            </button>
          ) : null}
          <div className={p.cls('time')}>
            <label>{s.locale.hour}
              <select className={p.cls('timeSelect')} tabIndex={s.isTimePickerOpen ? 0 : -1} value={s.selectedDate.getHours()} onChange={event => m.setTime('hour', Number(event.target.value))}>
                {Array.from({ length: 24 }, (_, hour) => <option key={hour} value={hour}>{String(hour).padStart(2, '0')}</option>)}
              </select>
            </label>
            <span className={p.cls('timeSeparator')} aria-hidden='true'>:</span>
            <label>{s.locale.minute}
              <select className={p.cls('timeSelect')} tabIndex={s.isTimePickerOpen ? 0 : -1} value={s.selectedDate.getMinutes() - (s.selectedDate.getMinutes() % p.minuteIncrement)} onChange={event => m.setTime('minute', Number(event.target.value))}>
                {s.minutes.map(minute => <option key={minute} value={minute}>{String(minute).padStart(2, '0')}</option>)}
              </select>
            </label>
          </div>
        </section>
      ) : null}
    </div>
  );
}
