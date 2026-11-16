# Toggle React renderer

@pastweb/react-components/Toggle renders the framework-neutral Toggle contract from
@pastweb/components-core/Toggle as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Toggle represents an immediate binary setting. The web renderer uses a native
checkbox with `role="switch"`. Its rendering contract follows the WAI-ARIA
Switch pattern and targets WCAG 2.2 Level AA.

## When to use

Use Toggle for an immediate on/off setting. Use Checkbox for a form choice that
is submitted later. Prefer a pair of radios when both options need visible
labels, such as “On” and “Off”.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `"Toggle"` | Names the switch when no visible `label` is supplied. Pass an empty string to omit it. |
| `className` | `string` | no | `""` | Additional root classes. |
| `disabled` | `boolean` | no | - | Disables the control and applies `is-disabled`. |
| `id` | `string \| number` | no | generated | Native control ID. Generated IDs use the `toggle` prefix. |
| `label` | `string` | no | `""` | Visible accessible label. |
| `labelPlacement` | `Placement` | no | `'top-start'` | Visual label position. |
| `name` | `string` | no | - | Native form name. |
| `onChange` | `(checked, event) => void` | no | noop | Reports state changes. |
| `tabIndex` | `number` | no | `0` | Sequential focus order. |
| `value` | `boolean` | no | - | Controlled checked state. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no visible `label` is present. |
| `inputId` | `string` | Native input ID from an explicit `id` or a generated `toggle` prefix. |
| `isDisabled` | `true \| undefined` | Is `true` when the Toggle is disabled; otherwise omitted. |
| `value` | `boolean` | Checked state used for `.is-checked`, native `checked`, and `aria-checked`. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Toggle_root_default_margin` | `root` | `default` | `margin` | shared margins | Component spacing. | Web, Capacitor, NativeScript |
| `--pw_Toggle_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled appearance. | Web, Capacitor, NativeScript |
| `--pw_Toggle_background_default_width` | `track` | `default` | `width` | `4em` | Track width. | Web, Capacitor, NativeScript |
| `--pw_Toggle_background_default_height` | `track` | `default` | `height` | `2.75em` | Track height, with a 44px web target. | Web, Capacitor, NativeScript |
| `--pw_Toggle_root_default_background-color` | `track` | `default` | `background-color` | `var(--pw_control_background-color)` | Unchecked track. | Web, Capacitor, NativeScript |
| `--pw_Toggle_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Label colour. | Web, Capacitor, NativeScript |


## Keyboard interaction

- `Space` toggles the native switch.
- `Tab` and `Shift+Tab` move sequential focus.

## Accessibility notes

- The web renderer uses a native checkbox with `role="switch"` and
  `aria-checked`.
- One wrapping label supplies the visible accessible name. When visible label
  text is absent, the mediator exposes `ariaLabel`.
- Disabled switches use native `disabled`, `aria-disabled="true"`, and
  `is-disabled`.
- Shared web styles provide at least a 44 by 44 CSS-pixel target, visible
  `:focus-visible` indication, forced-colours treatment, and reduced-motion
  behavior.

## Known limitations

- GOV.UK prefers radios or checkboxes when both options need equal visible
  labels. Use Toggle only for an immediate setting.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.


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
[components-core Toggle documentation](@pastweb/components-core/Toggle/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Toggle as R } from '@pastweb/react-components/Toggle';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Toggle/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Toggle = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Toggle } from '@/react/components/Toggle';

type ToggleProps = ComponentProps<typeof Toggle>;

export function MyComponent(props: ToggleProps) {
  return <Toggle {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Toggle.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Switch pattern: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
- GOV.UK radios: https://design-system.service.gov.uk/components/radios/
