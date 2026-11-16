# DateTimePicker React renderer

@pastweb/react-components/DateTimePicker renders the framework-neutral DateTimePicker contract from
@pastweb/components-core/DateTimePicker as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

`DateTimePicker` is a framework-neutral calendar and time-selection mediator. Renderers provide the target and popup integration; the mediator owns value normalization, single/multiple/range selection, calendar navigation, date rules, and keyboard intent.

## Features

- Single, multiple, and range date selection.
- Optional time selection, calendar-only, and time-only modes.
- Controlled or uncontrolled popup visibility and selected values.
- Keyboard calendar navigation, date rules, localized labels, and accessible IDs.
- A renderer-neutral target-props context for custom trigger implementations.


## Values

Use a `Date`, an array of `Date` values, or `null`. `single` returns one date in an array internally and `multiple`/`range` return arrays. The public change callback uses `Date | Date[] | null` so consumers can preserve the same value shape they provide.


## Calendar rules and language

`minDate`, `maxDate`, `disable`, and `enable` constrain selection. Rules accept a date, an inclusive `{ from, to }` range, or a predicate returning `true` when it matches.

The component does not read an application i18n service. Supply the calendar words directly with `locale` when a language is required.


## Rendering modes

The default picker is positioned locally, like `Select`. Set `inline` for an always-visible calendar that does not open and close.


## Calendar presentation

Set `yearSelect` to render a compact year selector beside the month name. Its range follows `minDate` and `maxDate`, or otherwise surrounds the viewed year.

`workingWeekDays` counts working days from Monday (default `5` for Monday–Friday). Remaining days receive the `is-free-day` state. Saturdays and Sundays always receive `is-sat` and `is-sun`; dates listed in `holidaysDates` receive `is-holiday`. Use `getDayClassName` for application-specific states.


## Target and accessibility labels

Renderers use their default target when no `target` slot is supplied. The default target displays date and time values as `<date> - <time>`, caps its width at `20rem`, and horizontally scrolls long multiple selections while keeping the arrow visible. Override the width through `--pw_DateTimePicker_target_default_max-width`.

Set `label` and `labelPlacement` to render a visible label using the same placement utilities as `Select`. `labelPlacement` defaults to `'top-start'` and accepts the standard placement values such as `'bottom'`, `'left-end'`, and `'right-start'`. A visible label is linked to the default target through `aria-labelledby`.


Provide `ariaLabel`, `previousMonthAriaLabel`, `nextMonthAriaLabel`, `yearSelectAriaLabel`, `selectTimeAriaLabel`, and `backToCalendarAriaLabel` when the default English labels do not fit the product vocabulary.


## Renderer integration

Renderers own their target, calendar, and time-toggle references, then provide
them together after mounting. This keeps the mediator independent of framework
ref objects and slot mechanisms.


Custom targets consume renderer-provided bindings from the shared
`DATETIME_PICKER_TRIGGER_PROPS_CONTEXT_KEY`. The core
`DateTimePickerTriggerProps` contract provides the ID, role, tab index, ARIA
attributes, and click/keyboard handlers. Each renderer adapts only its own ref
and event types.

## Summary

Use DateTimePicker when users need to choose a date, date range, or time with
calendar guidance. Use a native date input when the browser-provided control is
sufficient and a richer calendar interface is unnecessary.

## React renderer contract

The renderer preserves the core contract while adapting it to React:

- the forwarded ref targets the renderer's HTMLDivElement root or control element;
- callback props remain regular React callbacks with the argument order defined
  by the core mediator;
- default content uses ordinary children; named slots use Template with a
  name prop when the core contract documents named slots;
- the internal cls prop resolves the public CSS-module classes and is usually
  supplied by the application extension.

The complete source-of-truth contract is maintained in the
[components-core DateTimePicker documentation](@pastweb/components-core/DateTimePicker/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { DateTimePicker as R } from '@pastweb/react-components/DateTimePicker';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/DateTimePicker/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const DateTimePicker = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { DateTimePicker } from '@/react/components/DateTimePicker';

type DateTimePickerProps = ComponentProps<typeof DateTimePicker>;

export function MyComponent(props: DateTimePickerProps) {
  return <DateTimePicker {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/DateTimePicker.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.
