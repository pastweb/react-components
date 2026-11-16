# Radio React renderer

@pastweb/react-components/Radio renders the framework-neutral Radio contract from
@pastweb/components-core/Radio as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Radio presents a labelled group in which exactly one enabled option can be
selected. Its rendering contract follows the WAI-ARIA Radio Group pattern and
targets WCAG 2.2 Level AA.

## When to use

Use radios when choices are mutually exclusive and should remain visible. Use
Select for a long option list. Provide a concise group label and clear option
labels. Do not pre-select an option unless a default is required.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, and state classes. |
| `ariaLabel` | `string` | no | `"Radio options"` | Names the group when `label` is absent. Pass an empty string to omit the name. |
| `id` | `string` | no | generated | Stable group and relationship ID base. Generated IDs use the `radio` prefix. Explicit IDs are stored as `_${id}`. |
| `label` | `string` | no | `""` | Visible group label. |
| `labelPlacement` | `Placement` | no | `'top-start'` | Group-label placement. |
| `name` | `string` | no | generated group ID | Shared native form name. |
| `options` | `RadioOption[]` | yes | - | Options to render. |
| `orientation` | `'horizontal' \| 'vertical' \| string` | no | `'horizontal'` | Option layout. |
| `disabled` | `boolean` | no | - | Disables every option and applies `is-disabled`. |
| `value` | `string` | no | `""` | Selected value. |
| `onChange` | `(value, event) => void` | no | noop | Reports selection. |
| `className` | `string` | no | `""` | Additional root classes. |

`RadioOption` accepts `label`, `value`, optional `id`, `name`, `disabled`,
`tabIndex`, and `labelPosition`. The option default is `labelPosition: 'right'`.
Do not set `tabIndex` on every option; native radios
keep only the selected or first available option in sequential tab order.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized group name when no visible `label` is present. Empty labels are omitted. |
| `groupId` | `string` | Group ID from an explicit `id` or a generated `radio` prefix. |
| `groupLabelId` | `string \| undefined` | Label relationship ID `label${groupId}` when visible label text is present; otherwise omitted. |
| `isDisabled` | `true \| undefined` | Is `true` when the group is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled`, `aria-disabled`, and native `disabled`. |
| `value` | `string` | Selected option value. |

Option IDs are `option${groupId}${index}` unless an option supplies an explicit
`id`.

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Radio_root_default_margin` | `root` | `default` | `margin` | shared margins | Group spacing. | Web, Capacitor, NativeScript |
| `--pw_Radio_root_default_font-size` | `root` | `default` | `font-size` | `var(--pw_font-size)` | Group text size. | Web, Capacitor, NativeScript |
| `--pw_Radio_root_default_font-weight` | `root` | `default` | `font-weight` | `var(--pw_semibold_font-weight)` | Group text weight. | Web, Capacitor, NativeScript |
| `--pw_Radio_root_default_line-height` | `root` | `default` | `line-height` | `var(--pw_line-height)` | Group line height. | Web, Capacitor, NativeScript |
| `--pw_Radio_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled appearance. | Web, Capacitor, NativeScript |
| `--pw_Radio_option_default_margin` | `option` | `default` | `margin` | shared margins | Horizontal option spacing. | Web, Capacitor, NativeScript |
| `--pw_Radio_option_vertical_margin` | `option` | `vertical` | `margin` | `1em 0.5em` | Vertical option spacing. | Web, Capacitor, NativeScript |
| `--pw_Radio_control_default_width` | `control` | `default` | `width` | `2.375em` | Control width. | Web, Capacitor, NativeScript |
| `--pw_Radio_control_default_height` | `control` | `default` | `height` | `2.375em` | Control height. | Web, Capacitor, NativeScript |
| `--pw_Radio_control_default_background-color` | `control` | `default` | `background-color` | `var(--pw_control_background-color)` | Control background. | Web, Capacitor, NativeScript |
| `--pw_Radio_control_default_border-color` | `control` | `default` | `border-color` | `var(--pw_border-color)` | Control border colour. | Web, Capacitor, NativeScript |
| `--pw_Radio_control_default_border-radius` | `control` | `default` | `border-radius` | `var(--pw_rounded_border-radius)` | Control shape. | Web, Capacitor, NativeScript |
| `--pw_Radio_control_default_border-style` | `control` | `default` | `border-style` | `var(--pw_border-style)` | Control border style. | Web, Capacitor, NativeScript |
| `--pw_Radio_control_default_border-width` | `control` | `default` | `border-width` | `var(--pw_border-width)` | Control border width. | Web, Capacitor, NativeScript |
| `--pw_Radio_control_default_transition-duration` | `control` | `default` | `transition-duration` | `var(--pw_transition-duration)` | Indicator transition duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Radio_control_hover_box-shadow` | `control` | `hover` | `box-shadow` | shared inset shadow | Hover treatment. | Web, Capacitor |
| `--pw_Radio_control_focus_box-shadow` | `control` | `focus` | `box-shadow` | shared focus shadow | Keyboard focus treatment. | Web, Capacitor |
| `--pw_Radio_indicator_default_width` | `indicator` | `default` | `width` | `1em` | Indicator width. | Web, Capacitor, NativeScript |
| `--pw_Radio_indicator_default_height` | `indicator` | `default` | `height` | `1em` | Indicator height. | Web, Capacitor, NativeScript |
| `--pw_Radio_indicator_default_background-color` | `indicator` | `default` | `background-color` | `var(--pw_text_strong_color)` | Selected indicator colour. | Web, Capacitor, NativeScript |
| `--pw_Radio_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Label colour. | Web, Capacitor, NativeScript |


## Keyboard interaction

- Native radio inputs provide arrow-key selection within the group.
- `Tab` and `Shift+Tab` move sequential focus to the selected or first available
  option.
- Disabled options and a disabled group are not operable.

## Accessibility notes

- Native radio inputs provide group semantics, checked state, and form behavior.
  The visual control is decorative; the native input remains in the
  accessibility tree and tab order.
- The visible group label is connected through `aria-labelledby`. When it is
  absent, `ariaLabel` names the group. The default name is `Radio options`.
- Disabled state is reflected through `.is-disabled`, native `disabled`, and
  `aria-disabled`.
- Shared web styles provide visible keyboard focus, forced-colours treatment,
  and reduced-motion behavior.

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
[components-core Radio documentation](@pastweb/components-core/Radio/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Radio as R } from '@pastweb/react-components/Radio';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Radio/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Radio = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Radio } from '@/react/components/Radio';

type RadioProps = ComponentProps<typeof Radio>;

export function MyComponent(props: RadioProps) {
  return <Radio {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Radio.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Radio Group pattern: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
- GOV.UK radios: https://design-system.service.gov.uk/components/radios/
