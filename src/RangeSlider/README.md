# RangeSlider React renderer

@pastweb/react-components/RangeSlider renders the framework-neutral RangeSlider contract from
@pastweb/components-core/RangeSlider as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

RangeSlider selects one numeric value from a bounded range using the native
range control. Its rendering contract follows the WAI-ARIA Slider pattern and
targets WCAG 2.2 Level AA.

## When to use

Use it when an approximate value is acceptable and the range is meaningful. Use
a numeric input when users must enter an exact value. Always supply a visible
`label` or a specific `ariaLabel`.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, and state classes. |
| `ariaLabel` | `string` | no | `"Range value"` | Names the slider when no visible label is supplied. Pass an empty string to omit the name. |
| `id` | `string` | no | generated | Stable native input ID. Generated IDs use the `rangeSlider` prefix. Explicit IDs are stored as `_${id}`. |
| `label` | `string` | no | `""` | Visible native label. |
| `labelPlacement` | aligned placement | no | `'top-start'` | Label placement. |
| `min` | `number` | yes | - | Minimum. |
| `max` | `number` | yes | - | Maximum. |
| `step` | `number` | no | browser default | Increment. |
| `value` | `number` | no | range midpoint | Current value. |
| `disabled` | `boolean` | no | - | Disables the native input and applies `is-disabled`. |
| `onChange` | `(value, event) => void` | no | noop | Reports each value change. |
| `onMouseUp` | `(value) => void` | no | noop | Compatibility callback reporting committed pointer or keyboard value. |
| `className` | `string` | no | `""` | Additional root classes. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no visible `label` is present. Empty labels are omitted. |
| `inputId` | `string` | Native input ID from an explicit `id` or a generated `rangeSlider` prefix. |
| `isDisabled` | `true \| undefined` | Is `true` when the slider is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled` and native `disabled`. |
| `value` | `string` | Clamped current value as a string for the native range input. |

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-full-width` | Expands the slider to the available width. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_RangeSlider_root_default_margin` | `root` | `default` | `margin` | shared margins | Component spacing. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled appearance. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_height` | `track` | `default` | `height` | `0.8em` | Track height. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_background-color` | `track` | `default` | `background-color` | `var(--pw_control_background-color)` | Track background. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_border-color` | `track` | `default` | `border-color` | `var(--pw_border-color)` | Track and thumb border. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_border-radius` | `track` | `default` | `border-radius` | `var(--pw_border-radius)` | Track corners. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_border-style` | `track` | `default` | `border-style` | `var(--pw_border-style)` | Track and thumb border style. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_track_default_border-width` | `track` | `default` | `border-width` | `var(--pw_border-width)` | Track and thumb border width. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_width` | `thumb` | `default` | `width` | `1.562em` | Pointer target width. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_height` | `thumb` | `default` | `height` | `1.562em` | Pointer target height. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_background-color` | `thumb` | `default` | `background-color` | track background | Thumb background. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_border-radius` | `thumb` | `default` | `border-radius` | `50%` | Thumb shape. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_thumb_default_transition-duration` | `thumb` | `default` | `transition-duration` | `var(--pw_transition-duration)` | Thumb visual duration. | Web, Capacitor; NativeScript adapter |
| `--pw_RangeSlider_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Label colour. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_label_default_font-size` | `label` | `default` | `font-size` | `var(--pw_font-size)` | Label font size. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_label_default_font-weight` | `label` | `default` | `font-weight` | `var(--pw_semibold_font-weight)` | Label font weight. | Web, Capacitor, NativeScript |
| `--pw_RangeSlider_label_default_line-height` | `label` | `default` | `line-height` | `var(--pw_line-height)` | Label line height. | Web, Capacitor, NativeScript |


## Keyboard interaction

- Arrow keys, `Home`, `End`, `PageUp`, and `PageDown` adjust the native range
  value.
- `Tab` and `Shift+Tab` move sequential focus to the available slider.

## Accessibility notes

- The native input supplies slider role, values, keyboard operation, and
  disabled behavior.
- The visible label is connected through `for`/`id`. When it is absent,
  `ariaLabel` names the slider. The default name is `Range value`.
- Disabled state is reflected through `.is-disabled` and native `disabled`.
- Shared web styles provide a visible `:focus-visible` indicator, forced-colours
  treatment, and reduced-motion behavior.

## Known limitations

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
[components-core RangeSlider documentation](@pastweb/components-core/RangeSlider/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { RangeSlider as R } from '@pastweb/react-components/RangeSlider';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/RangeSlider/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const RangeSlider = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { RangeSlider } from '@/react/components/RangeSlider';

type RangeSliderProps = ComponentProps<typeof RangeSlider>;

export function MyComponent(props: RangeSliderProps) {
  return <RangeSlider {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/RangeSlider.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Slider pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/
- GOV.UK form controls: https://design-system.service.gov.uk/components/
