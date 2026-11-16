# Select React renderer

@pastweb/react-components/Select renders the framework-neutral Select contract from
@pastweb/components-core/Select as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Select chooses one value from a listbox attached to a trigger. The trigger is
either a styled native button (`content`) or a custom control (`target`). Its
rendering contract follows the WAI-ARIA Combobox/Listbox pattern and targets
WCAG 2.2 Level AA.

## When to use

Use Select when the user must pick one option from a known list. Do not use it
for free-text entry. Prefer a native radio group for a very small set of options
that should stay visible.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `id` | `string` | no | generated | Supplies the host ID. Generated IDs use the `select` prefix. |
| `ariaLabel` | `string` | no | `"Select an option"` | Names the trigger when there is no visible `label`. Pass an empty string to omit the accessible name. |
| `name` | `string` | no | - | Optional form name. |
| `label` | `string` | no | `""` | Visible label. When set, it names the trigger and `ariaLabel` is omitted. |
| `labelPlacement` | `Placement` | no | `"top-start"` | Places the visible label relative to the trigger. |
| `placeholder` | `string` | no | `"Select"` | Default text of the styled `content` trigger when that slot is empty. |
| `disabled` | `boolean` | no | - | Makes the Select unavailable. |
| `loading` | `boolean` | no | - | Marks the Select busy and unavailable. |
| `className` | `string` | no | `""` | Adds classes to the root. The `is-loading` class also enables loading. |
| `tabIndex` | `number` | no | `0` | Controls sequential keyboard focus order. |
| `value` | `any` | no | - | Controlled selected value. |
| `offset` | `number` | no | `3` | Listbox offset from the trigger. |
| `closeOnSelect` | `boolean` | no | `true` | Closes the listbox after a selection. |
| `hideOnClick` | `boolean` | no | `true` | Closes the listbox after activation inside the options. |
| `onChange` | `(value: any) => void` | no | noop | Reports the selected value. |

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Uses the rounded radius token on `.selectButton` and the listbox. Custom `target` triggers are not styled by this class. |
| `is-full-width` | Expands the Select to the available width. |

## Mediator API

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Resolved host ID. Generated IDs use the `select` prefix; an explicit `id` is exposed as `_${id}`. |
| `hide` | `() => void` | Closes the listbox. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized trigger accessible name. Omitted when `label` is set or `ariaLabel` is empty. |
| `highlightIndex` | `number \| null` | Keyboard highlight index in the listbox. |
| `inputId` | `string` | Root ID. Same value as mediator `id`. |
| `isDisabled` | `true \| undefined` | Is `true` when the Select is disabled; otherwise omitted. |
| `isLoading` | `true \| undefined` | Is `true` when the Select is loading; otherwise omitted. |
| `isOpen` | `boolean` | Whether the listbox is open. |
| `isUnavailable` | `true \| undefined` | Is `true` when disabled or loading. |
| `labelId` | `string` | Visible-label relationship ID in the form `label${id}`. |
| `listboxId` | `string` | Listbox relationship ID in the form `listbox${id}`. |
| `triggerId` | `string` | Trigger relationship ID in the form `trigger${id}`. |
| `value` | `any` | Current selected value. |

## Mediator context

SelectItem reads this API through the renderer context hook. Live getters stay synchronized with mediator state.

| Context property | Type | Description |
|---|---|---|
| `hide` | `() => void` | Closes the listbox. |
| `onChange` | `(value: any) => void` | Selects a value. |
| `onOptionKeyDown` | `(event, value, disabled?) => void` | Handles option keyboard activation. |
| `registerItem` | `() => number` | Registers a SelectItem and returns its index. |
| `state` | `SelectState` | Live mediator state for descendants. |

## Slots

Provide `content` for the styled button trigger, or `target` for a custom
trigger. Each trigger is mounted only when its slot has content. If neither
slot is provided, no trigger is rendered. Do not put another button inside
either trigger slot.

| SlotName | Description | Default content |
|---|---|---|
| `target` | Replaces the native trigger. It receives the trigger ID, ARIA state, keyboard handler, toggle handler, and tab index through slot props; the replacement must apply them to one focusable control. | The native `content` trigger. |
| `content` | Labelled content of the styled native-button trigger (`.selectButton`), which includes a decorative arrow. When present, the button is rendered. | `placeholder` |
| `options` | Supplies listbox options such as `SelectItem`. | Empty. |
| default | Supplies additional listbox content. | Empty. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Select_root_default_min-width` | `root` | `default` | `min-width` | `12em` | Minimum control width. The control can grow with trigger content. | Web, Capacitor, NativeScript |
| `--pw_Select_options_default_width` | `options` | `default` | `width` | `max-content` | Listbox width, sized to option content. | Web, Capacitor |
| `--pw_Select_options_default_max-height` | `options` | `default` | `max-height` | `16em` | Listbox max height; overflow scrolls vertically. | Web, Capacitor |
| `--pw_Select_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Control and listbox background. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_color` | `root` | `default` | `color` | `var(--pw_text_strong_color)` | Control and option foreground. | Web, Capacitor, NativeScript |
| `--pw_Select_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Visible label colour. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Listbox border colour. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Listbox border width. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Listbox border style. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Listbox corner radius. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_padding` | `root` | `default` | `padding` | `var(--pw_padding)` | Option padding. | Web, Capacitor, NativeScript |
| `--pw_Select_root_default_margin` | `root` | `default` | `margin` | vertical/horizontal margin | Outer spacing. | Web, Capacitor, NativeScript |
| `--pw_Select_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |


## Keyboard interaction

- `Enter` or `Space` on the trigger toggles the listbox.
- `ArrowDown` opens and highlights the first option, or moves down.
- `ArrowUp` opens and highlights the last option, or moves up.
- `Home` and `End` move to the first and last option while open.
- `Escape` closes an open listbox and restores trigger focus.
- `Tab` closes an open listbox and continues document order.

## Accessibility notes

- Provide either a `content` trigger or a `target` trigger. Each trigger exposes
  expanded, controls, disabled, and busy state.
- The `content` trigger is a native button with a decorative arrow. Do not place
  another button in the `content` slot.
- A `target` replacement receives the required trigger semantics as slot props. Apply them to one focusable control and do not nest controls.
- Visible `label` text is the accessible name. `ariaLabel` is used only when there is no visible label.
- The visible `label` is associated with the `content` button through `for` and
  `triggerId`. The `target` trigger is named with `aria-labelledby` when a
  visible label is present.
- Disabled and loading states are unavailable and cannot open the listbox.
- Closed options use `hidden` so they leave the accessibility tree and tab order.
- The listbox is sized to option content and at least as wide as the trigger. It
  flips only to the opposite edge when the viewport has no room below, and
  scrolls vertically when options exceed the max height.
- Shared web styles provide a visible focus indicator, forced-colours treatment,
  and reduced-motion behavior.

## Known limitations

- Content-slot and target-slot content should not introduce a nested button.
- Listbox positioning uses web layout measurement.
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
[components-core Select documentation](@pastweb/components-core/Select/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Select as R } from '@pastweb/react-components/Select';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Select/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Select = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Select } from '@/react/components/Select';

type SelectProps = ComponentProps<typeof Select>;

export function MyComponent(props: SelectProps) {
  return <Select {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Select.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Combobox/Listbox pattern: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- GOV.UK select: https://design-system.service.gov.uk/components/select/
