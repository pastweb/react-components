# Checkbox React renderer

@pastweb/react-components/Checkbox renders the framework-neutral Checkbox contract from
@pastweb/components-core/Checkbox as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Checkbox renders a native binary choice with a visible label or explicit
accessible name. Its rendering contract follows the WAI-ARIA Checkbox pattern
and targets WCAG 2.2 Level AA.

## When to use

Use a checkbox when users may independently select or clear one option. Provide
a concise visible label that describes the choice. Do not use a checkbox when
exactly one option must be selected from a group; use radio buttons then.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `"Checkbox"` | Names the checkbox when no visible `label` is supplied. Pass an empty string to omit the accessible name. |
| `checkChar` | `string` | no | `✔` | Supplies the default checked mark. |
| `className` | `string` | no | `""` | Adds classes to the wrapper. |
| `id` | `string` | no | generated | Supplies the native input ID. Generated IDs use the `checkbox` prefix. |
| `disabled` | `boolean` | no | - | Makes the choice unavailable. |
| `label` | `string` | no | `""` | Supplies the visible accessible label. |
| `labelPlacement` | `Placement` | no | `'top-start'` | Places the visible label around the box. |
| `name` | `string` | no | - | Supplies the form field name. |
| `value` | `boolean` | no | - | Controls the checked state. |
| `tabIndex` | `number` | no | `0` | Controls sequential focus order. Prefer the default document order. |
| `onChange` | `(checked: boolean) => void` | no | noop | Reports checked-state changes. |

## Mediator API

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Resolved input ID. Generated IDs use the `checkbox` prefix; an explicit `id` is exposed as `_${id}`. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no visible `label` is present. Empty labels are omitted. |
| `isDisabled` | `true \| undefined` | Is `true` when the checkbox is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled`, `disabled`, and `aria-disabled`. |
| `value` | `boolean` | Checked state consumed as `.is-checked` and the native `checked` property. |

## Slots

| SlotName | Description | Default content | Props |
|---|---|---|---|
| `check` | Replaces the decorative checked mark. | `<span>{checkChar}</span>` | `{ checkChar }` |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Checkbox_root_default_margin` | `root` | `default` | `margin` | shared margins | Component spacing. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_root_default_size` | `root` | `default` | `size` | line-height plus padding and border | Box width and height, with a 44px web minimum. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Box background. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Box border colour. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Box border width. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Box border style. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Box corner radius. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_check_default_size` | `check` | `default` | `font-size` | `1.5em` | Checked mark size. | Web, Capacitor, NativeScript |
| `--pw_Checkbox_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Label colour. | Web, Capacitor, NativeScript |


## Keyboard interaction

- `Tab` and `Shift+Tab` move focus to and from the native checkbox in document order.
- `Space` toggles the checked state through native checkbox behavior.

## Accessibility notes

- The input remains a native checkbox. One wrapping label supplies the visible
  accessible name, avoiding multiple labels for the same control.
- When visible label text is absent, the mediator exposes `ariaLabel`. The
  default name is `Checkbox`. An explicit empty string omits the name.
- Disabled checkboxes use the native `disabled` property, `aria-disabled="true"`,
  and the `is-disabled` class.
- Checked state is exposed through the native `checked` property and the
  `is-checked` class.
- The decorative check is hidden from assistive technology. Replacement `check`
  slot content must remain decorative.
- Shared web styles provide at least a 44 by 44 CSS-pixel target, visible focus,
  forced-colours treatment, and reduced-motion behavior.

## Known limitations

- The custom checked mark is visual only. Do not place interactive content in
  the `check` slot.
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
[components-core Checkbox documentation](@pastweb/components-core/Checkbox/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Checkbox as R } from '@pastweb/react-components/Checkbox';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Checkbox/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Checkbox = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Checkbox } from '@/react/components/Checkbox';

type CheckboxProps = ComponentProps<typeof Checkbox>;

export function MyComponent(props: CheckboxProps) {
  return <Checkbox {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Checkbox.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Checkbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
- GOV.UK Checkboxes guidance: https://design-system.service.gov.uk/components/checkboxes/
