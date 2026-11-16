# SheetController React renderer

@pastweb/react-components/SheetController renders the framework-neutral SheetController contract from
@pastweb/components-core/SheetController as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

SheetController presents an animated, optionally modal dialog surface from an
edge of its portal container. Its rendering contract follows the WAI-ARIA Dialog
(Modal) pattern and targets WCAG 2.2 Level AA.

## When to use

Use it for secondary tasks that need more space than a popover without
navigating away. Do not use it for essential content that should remain
permanently visible. A modal sheet must include an obvious close control inside
its content.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and part classes. |
| `id` | `string` | no | generated | Supplies the dialog ID. Generated IDs use the `sheetController` prefix. Explicit IDs are stored as `_${id}`. |
| `ariaLabel` | `string` | no | `'Sheet'` | Accessible dialog name. Pass an empty string to omit the name. |
| `className` | `string` | no | `''` | Additional root classes. |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | no | `'left'` | Entry and exit edge. |
| `backdrop` | `boolean` | no | - | Displays the native backdrop button and applies `has-backdrop`. |
| `modal` | `boolean` | no | - | Enables `aria-modal`, focus containment, and `is-modal`. |
| `closeOnBackdropClick` | `boolean` | no | `true` | Allows backdrop activation to close. |
| `closeOnEscape` | `boolean` | no | `true` | Allows Escape to close unless the event is prevented. |
| `animationTime` | `number` | no | `400` | Fallback close duration in milliseconds. |
| `width`, `height` | `number \| string` | no | - | Inline sheet dimensions. |
| `top`, `right`, `bottom`, `left` | `number \| string` | no | - | Inline sheet offsets. |
| `portal`, `portalElement`, `entryId` | portal integration | no | - | Optional host integration used for update/remove/close events. |
| `onClose` | `() => void` | no | noop | Reports completed closure once. |
| `onKeyDown` | `(event: SheetKeyboardEvent) => void` | no | noop | Observes keyboard input before default Escape handling. |

The default slot supplies dialog content. Include a native close button that
calls `useSheetContext().close()`.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized dialog name. Empty labels are omitted. |
| `id` | `string` | Dialog ID from an explicit `id` or a generated `sheetController` prefix. |
| `isClosed` | `boolean` | Is `true` after closure is finalized and the surface should unmount. |
| `isClosing` | `boolean` | Is `true` during the exit animation; content is inert. |
| `isOpen` | `boolean` | Is `true` while the sheet is shown and not closing. |

## CSS classes

| Class | Applied when | Notes |
|---|---|---|
| `SheetController` | Always | Root overlay class. |
| `has-backdrop` | `backdrop` is `true` | Backdrop overlay is present. |
| `is-open` | `isOpen` is `true` | Sheet is visible. |
| `is-modal` | `modal` is `true` | Modal focus containment is active. |
| `is-closing` | `isClosing` is `true` | Exit animation; pointer events disabled. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_SheetController_root_default_width` | `root` | `default` | `width` | `100%` | Overlay width. | Web, Capacitor, NativeScript |
| `--pw_SheetController_root_default_height` | `root` | `default` | `height` | `100%` | Overlay height. | Web, Capacitor, NativeScript |
| `--pw_SheetController_backdrop_default_background-color` | `backdrop` | `default` | `background-color` | shared backdrop | Backdrop colour. | Web, Capacitor, NativeScript |
| `--pw_SheetController_sheet_default_background-color` | `sheet` | `default` | `background-color` | shared background | Sheet background. | Web, Capacitor, NativeScript |
| `--pw_SheetController_sheet_default_color` | `sheet` | `default` | `color` | shared text | Sheet foreground. | Web, Capacitor, NativeScript |
| `--pw_SheetController_sheet_default_box-shadow` | `sheet` | `default` | `box-shadow` | elevation shadow | Sheet elevation. | Web, Capacitor |
| `--pw_SheetController_sheet_default_animation-duration` | `sheet` | `default` | `animation-duration` | `400ms` | Edge animation duration. | Web, Capacitor; native adapter |
| `--pw_SheetController_sheet_default_animation-timing-function` | `sheet` | `default` | `animation-timing-function` | `ease` | Edge animation timing. | Web, Capacitor; native adapter |
| `--pw_SheetController_sheet_default_animation-fill-mode` | `sheet` | `default` | `animation-fill-mode` | `forwards` | Edge animation fill. | Web, Capacitor; native adapter |
| `--pw_SheetController_sheet_default_outline` | `sheet` | `default` | `outline` | shared outline | Keyboard focus indicator. | Web, Capacitor |
| `--pw_SheetController_sheet_default_outline-offset` | `sheet` | `default` | `outline-offset` | `0.125em` | Focus outline offset. | Web, Capacitor |


## Keyboard interaction

- Focus moves to the sheet when mounted.
- `Escape` closes when `closeOnEscape` is enabled, unless the consumer prevents the event.
- Modal sheets keep `Tab` and `Shift+Tab` inside their focusable content.
- Focus returns to the previously focused element when closing or unmounting.

## Accessibility notes

- The web renderer exposes a named `dialog`. `aria-modal` is set only when `modal` is true.
- The backdrop is a native `button` excluded from the tab order and accessibility tree.
- Closing content becomes inert immediately; animation completion or the timer finalizes portal removal.
- Shared web styles keep a visible `:focus-visible` indicator and disable non-essential motion under `prefers-reduced-motion`.

## Known limitations

- Nested sheets require distinct labels so dialog announcements remain understandable.
- A modal sheet still depends on its content to provide a visible close control.
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
[components-core SheetController documentation](@pastweb/components-core/SheetController/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { SheetController as R } from '@pastweb/react-components/SheetController';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/SheetController/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const SheetController = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { SheetController } from '@/react/components/SheetController';

type SheetControllerProps = ComponentProps<typeof SheetController>;

export function MyComponent(props: SheetControllerProps) {
  return <SheetController {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/SheetController.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Dialog (Modal) pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- GOV.UK components: https://design-system.service.gov.uk/components/
