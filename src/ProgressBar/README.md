# ProgressBar React renderer

@pastweb/react-components/ProgressBar renders the framework-neutral ProgressBar contract from
@pastweb/components-core/ProgressBar as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

ProgressBar communicates the completion of a determinate task in linear or
circular form. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use it when a numeric completion value is known, such as an upload or processing
task. Use a separate indeterminate status indicator when completion cannot be
calculated. Keep important status text available as accessible value text, not
only as a visual bar.

Do not use it as a multi-step form progress indicator. GOV.UK guidance is to
avoid step trackers that show every question at once.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and part classes. |
| `ariaLabel` | `string` | no | `"Progress"` | Accessible name for the progressbar. Pass an empty string to omit the name. |
| `total` | `number` | conditional | - | Total used with `current`. |
| `current` | `number` | conditional | - | Current value used with `total`. |
| `percentage` | `number` | conditional | - | Direct percentage; clamped from 0 to 100. |
| `label` | `string \| (values) => string` | no | `"%"` | Visible and accessible value text; use an empty string to hide it. |
| `type` | `'linear' \| 'circular'` | no | `'linear'` | Visual presentation. |
| `size` | `number` | no | `100` | Circular SVG coordinate size. |
| `className` | `string` | no | `""` | Additional root classes. |

Provide either `percentage` or both `total` and `current`.

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Uses the rounded progress-bar radius token. |
| `is-outlined` | Uses the page background for the unfilled track so the bar reads as outlined. |
| `is-full-width` | Expands the progress bar to the available width. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name. Empty labels are omitted. |
| `circumference` | `number` | Circular stroke length. |
| `labelContent` | `string \| null` | Visible value label, or `null` when `label` is empty. |
| `offset` | `number` | Circular stroke offset for the remaining portion. |
| `percentage` | `number` | Completion from 0 to 100. Renderers use this for `aria-valuenow`. |
| `radius` | `number` | Circular track radius from `size`. |
| `valueText` | `string` | Accessible value text. Falls back to `percentage%` when the label is hidden. |
| `width` | `string` | Linear filler width as a percentage string. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_ProgressBar_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Unfilled track colour. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Linear border colour. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Linear corner radius. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_rounded_border-radius` | `root` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Corner radius for `is-rounded`. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Linear border style. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Linear border width. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_label_default_color` | `label` | `default` | `color` | `inherit` | Value-label colour. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_fill_default_background-color` | `fill` | `default` | `background-color` | border colour | Linear completion colour. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_fill_default_stroke` | `fill` | `default` | `stroke` | border colour | Circular completion stroke. | Web, Capacitor |
| `--pw_ProgressBar_linear_default_height` | `linear` | `default` | `height` | `2em` | Linear bar height. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_circular_default_width` | `circular` | `default` | `width` | `5em` | Circular width. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_circular_default_height` | `circular` | `default` | `height` | `5em` | Circular height. | Web, Capacitor, NativeScript |
| `--pw_ProgressBar_circle_default_stroke-width` | `circle` | `default` | `stroke-width` | `0.5em` | Circular stroke width. | Web, Capacitor |
| `--pw_ProgressBar_circle_default_stroke-linecap` | `circle` | `default` | `stroke-linecap` | `round` | Circular stroke cap. | Web, Capacitor |


## Keyboard interaction

- ProgressBar is not interactive. It does not enter the tab order.

## Accessibility notes

- The web renderer exposes the `progressbar` role, a name, and values from 0 to
  100. The SVG is decorative.
- The default accessible name is `Progress`. An explicit empty string omits the
  name.
- Visible `label` content is also used as `aria-valuetext`. Hiding the label
  still exposes a numeric value text.
- Shared web styles support `forced-colors` and disable non-essential
  transitions under `prefers-reduced-motion`.

## Known limitations

- ProgressBar is determinate only. It does not represent unknown remaining time.
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
[components-core ProgressBar documentation](@pastweb/components-core/ProgressBar/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { ProgressBar as R } from '@pastweb/react-components/ProgressBar';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/ProgressBar/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const ProgressBar = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { ProgressBar } from '@/react/components/ProgressBar';

type ProgressBarProps = ComponentProps<typeof ProgressBar>;

export function MyComponent(props: ProgressBarProps) {
  return <ProgressBar {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/ProgressBar.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Meter pattern: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
- GOV.UK components: https://design-system.service.gov.uk/components/
