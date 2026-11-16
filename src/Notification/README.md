# Notification React renderer

@pastweb/react-components/Notification renders the framework-neutral Notification contract from
@pastweb/components-core/Notification as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Notification presents a short, politely announced message with optional title,
close action, and footer content. Its rendering contract targets WCAG 2.2
Level AA.

## When to use

Use Notification for non-urgent status information that may remain in the page.
Use an alert pattern for urgent information requiring immediate attention, and a
dialog when users must make a decision before continuing.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, and state classes. |
| `ariaLabel` | `string` | no | `""` | Names the optional notification region. Pass an empty string to omit the region role. |
| `className` | `string` | no | `""` | Adds classes to the root article. |
| `closeButton` | `boolean` | no | `true` | Displays the native close button. |
| `closeLabel` | `string` | no | `"Close notification"` | Names the close button. |
| `onClose` | `() => void` | no | noop | Reports close intent. |
| `rtl` | `boolean` | no | `false` | Reverses header content order. |
| `title` | `string` | no | - | Supplies the default title content. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name. Empty labels are omitted. |
| `role` | `'region' \| undefined` | Is `region` when `ariaLabel` supplies a name; otherwise omitted. |

## Slots

| SlotName | Description | Default content | Props |
|---|---|---|---|
| default | Supplies the politely announced message. | Empty. | - |
| `header` | Replaces title and close-button content inside the semantic header. | Title and optional close button. | `{ title, onClose }` |
| `footer` | Supplies content wrapped in the semantic footer. | Empty. | - |

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-full-width` | Expands the notification to the available width. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Notification_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Notification background. | Web, Capacitor, NativeScript |
| `--pw_Notification_root_default_color` | `root` | `default` | `color` | `var(--pw_text_color)` | Message foreground. | Web, Capacitor, NativeScript |
| `--pw_Notification_root_default_padding` | `root` | `default` | `padding` | `var(--pw_padding)` | Inner spacing. | Web, Capacitor, NativeScript |
| `--pw_Notification_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Border colour. | Web, Capacitor, NativeScript |
| `--pw_Notification_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Border width. | Web, Capacitor, NativeScript |
| `--pw_Notification_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Border style. | Web, Capacitor, NativeScript |
| `--pw_Notification_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Corner radius. | Web, Capacitor, NativeScript |
| `--pw_Notification_root_default_box-shadow` | `root` | `default` | `box-shadow` | shared shadow | Elevation. | Web, Capacitor |
| `--pw_Notification_header_default_color` | `header` | `default` | `color` | `var(--pw_text_strong_color)` | Title foreground. | Web, Capacitor, NativeScript |
| `--pw_Notification_header_default_font-size` | `header` | `default` | `font-size` | `1em` | Title text size. | Web, Capacitor, NativeScript |
| `--pw_Notification_header_default_font-weight` | `header` | `default` | `font-weight` | `var(--pw_semibold_font-weight)` | Title weight. | Web, Capacitor, NativeScript |
| `--pw_Notification_header_default_line-height` | `header` | `default` | `line-height` | `var(--pw_line-height)` | Title line height. | Web, Capacitor, NativeScript |
| `--pw_Notification_header_default_margin-bottom` | `header` | `default` | `margin-bottom` | `0.5em` | Header spacing. | Web, Capacitor, NativeScript |
| `--pw_Notification_close-button_default_background-color` | `close-button` | `default` | `background-color` | `transparent` | Close-button background. | Web, Capacitor, NativeScript |
| `--pw_Notification_close-button_hover_background-color` | `close-button` | `hover` | `background-color` | header colour | Hover background. | Web, Capacitor |
| `--pw_Notification_close-button_default_min-width` | `close-button` | `default` | `min-width` | `1.563em` | Close-button width, matching Panel. | Web, Capacitor, NativeScript |
| `--pw_Notification_close-button_default_height` | `close-button` | `default` | `height` | `1.563em` | Close-button height, matching Panel. | Web, Capacitor, NativeScript |
| `--pw_Notification_close-button_default_transition-duration` | `close-button` | `default` | `transition-duration` | `0.5s` | Visual transition duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Notification_close-bar_default_background-color` | `close-bar` | `default` | `background-color` | header colour | Close glyph colour. | Web, Capacitor, NativeScript |
| `--pw_Notification_close-bar_hover_background-color` | `close-bar` | `hover` | `background-color` | notification background | Hover glyph colour. | Web, Capacitor |
| `--pw_Notification_footer_default_margin-top` | `footer` | `default` | `margin-top` | `0.5em` | Footer spacing. | Web, Capacitor, NativeScript |


## Keyboard interaction

- The close action is a native button and is operable with `Enter` or `Space`.
- Message content is not interactive unless projected content supplies its own
  controls.

## Accessibility notes

- Only message content is the polite live region; the interactive close button
  is outside it.
- The close action is a native button with a configurable accessible name.
- `ariaLabel` creates a named region when consumers need direct navigation to a
  persistent notification. The default is an empty string, which omits the
  region role. Avoid unnecessary repeated regions.
- Shared web styles match the Panel close control size, with visible keyboard
  focus, forced-colours treatment, and reduced-motion behavior.

## Known limitations

- Automated accessibility checks do not by themselves establish WCAG
  conformance.


## React renderer contract

The renderer preserves the core contract while adapting it to React:

- the forwarded ref targets the renderer's HTMLElement root or control element;
- callback props remain regular React callbacks with the argument order defined
  by the core mediator;
- default content uses ordinary children; named slots use Template with a
  name prop when the core contract documents named slots;
- the internal cls prop resolves the public CSS-module classes and is usually
  supplied by the application extension.

The complete source-of-truth contract is maintained in the
[components-core Notification documentation](@pastweb/components-core/Notification/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Notification as R } from '@pastweb/react-components/Notification';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Notification/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Notification = forwardRef<HTMLElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Notification } from '@/react/components/Notification';

type NotificationProps = ComponentProps<typeof Notification>;

export function MyComponent(props: NotificationProps) {
  return <Notification {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Notification.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Status and alert patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK notification banner: https://design-system.service.gov.uk/components/notification-banner/
