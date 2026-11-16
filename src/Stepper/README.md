# Stepper React renderer

@pastweb/react-components/Stepper renders the framework-neutral Stepper contract from
@pastweb/components-core/Stepper as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Stepper communicates progress through an ordered sequence. `active` remains
one-based for compatibility. A step is interactive only when it supplies
`onClick`; disabled interactive steps use a native disabled button. Its
rendering contract targets WCAG 2.2 Level AA.

## When to use

Use Stepper for a known sequence of stages. Do not use it as a page navigation
control unless each step is also a destination. Prefer a native continue action
and back link for linear form journeys that do not need a visible map of every
stage.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `steps` | `Step[]` | yes | - | Ordered labels, descriptions, indicators and optional actions. |
| `active` | `number` | no | `1` | Current one-based step. |
| `id` | `string` | no | generated | Supplies the host ID. Generated IDs use the `stepper` prefix. Explicit IDs are stored as `_${id}`. |
| `ariaLabel` | `string` | no | `"Progress"` | Names the ordered sequence. Pass an empty string to omit it. |
| `orientation` | `'horizontal' \| 'vertical'` | no | `'horizontal'` | Visual direction. |
| `labelPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | no | `'top'` | Visual label position. Horizontal uses `top` or `bottom` (`top` when omitted or invalid). Vertical uses `left` or `right` (`right` when omitted or invalid). |
| `className` | `string` | no | `""` | Additional root classes. |

`Step` supports `label`, `description`, `content`, `ariaLabel`, `className`,
`disabled`, and `onClick`. The current list item exposes `aria-current="step"`.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized sequence name. Empty labels are omitted. |
| `id` | `string` | Host ID from an explicit `id` or a generated `stepper` prefix. |
| `labelPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | Resolved label side for the current orientation. |

`getStepState(index)` returns `'active'`, `'complete'`, or `'pending'`. Title
and description IDs use `title${id}${index}` and `description${id}${index}`.

## CSS classes

| Class | Applied when | Notes |
|---|---|---|
| `Stepper` | Always | Root component class. |
| `is-horizontal` / `is-vertical` | `orientation` | Axis of the ordered list. |
| `labels-top` / `labels-bottom` / `labels-left` / `labels-right` | resolved `labelPosition` | Horizontal applies `labels-top` or `labels-bottom`. Vertical applies `labels-left` or `labels-right`. |
| `is-active` | current step | Applied to the list item. |
| `is-complete` | earlier steps | Applied to the list item. |
| `is-pending` | later steps | Applied to the list item. |
| `is-disabled` | `step.disabled` | Applied to the list item. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Stepper_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_background-color)` | Component background. | Web, Capacitor, NativeScript |
| `--pw_Stepper_root_disabled_opacity` | `root` | `disabled` | `opacity` | shared disabled opacity | Disabled step appearance. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_default_background-color` | `indicator` | `default` | `background-color` | `var(--pw_control_background-color)` | Indicator background. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_active_border-color` | `indicator` | `active` | `border-color` | strong text | Active indicator border. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_complete_background-color` | `indicator` | `complete` | `background-color` | shared text | Complete indicator background. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_default_outline` | `indicator` | `default` | `outline` | shared outline | Keyboard focus indicator. | Web, Capacitor |
| `--pw_Stepper_indicator-target_default_width` | `indicator-target` | `default` | `width` | `2.75em` | Pointer target width. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator-target_default_height` | `indicator-target` | `default` | `height` | `2.75em` | Pointer target height. | Web, Capacitor, NativeScript |
| `--pw_Stepper_indicator_slot_size` | `indicator` | `default` | `width` / `height` | calculated | Indicator box used to centre labels. | Web, Capacitor |
| `--pw_Stepper_label_default_color` | `label` | `default` | `color` | `var(--pw_text_color)` | Label colour. | Web, Capacitor, NativeScript |


## Keyboard interaction

- Interactive steps are native buttons operable with `Enter` or `Space`.
- Disabled interactive steps are skipped in the tab order.
- Non-interactive steps do not enter the tab order.

## Accessibility notes

- The sequence is a named ordered list. The current item exposes `aria-current="step"`.
- Visible labels name interactive steps through `aria-labelledby`. Empty `ariaLabel` values fall back to `Step N of M` when no visible label is present.
- Indicator glyphs are hidden from assistive technology.
- Connecting lines are decorative.
- Pointer targets remain at least 44 CSS pixels even when the visible indicator is smaller.
- Shared web styles keep a visible `:focus-visible` indicator.

## Known limitations

- Nested steppers require distinct labels so the sequences remain distinguishable.
- Automated accessibility checks do not by themselves establish WCAG conformance.

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
[components-core Stepper documentation](@pastweb/components-core/Stepper/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Stepper as R } from '@pastweb/react-components/Stepper';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Stepper/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Stepper = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Stepper } from '@/react/components/Stepper';

type StepperProps = ComponentProps<typeof Stepper>;

export function MyComponent(props: StepperProps) {
  return <Stepper {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Stepper.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA APG patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK task list: https://design-system.service.gov.uk/components/task-list/
