# Tag React renderer

@pastweb/react-components/Tag renders the framework-neutral Tag contract from
@pastweb/components-core/Tag as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Tag displays a short, non-interactive category or status label. Its rendering
contract targets WCAG 2.2 Level AA.

## When to use

Use Tag for a compact category or status. Visible text must describe the
status. Colour may reinforce meaning but must not be the only indicator. Use
`closeButton` only to dismiss the tag itself, not to start another action.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `""` | Accessible name when visible content is insufficient. Pass an empty string to omit it. |
| `className` | `string` | no | `""` | Additional classes. |
| `closeButton` | `boolean` | no | - | Displays the native close button. |
| `closeLabel` | `string` | no | `"Close tag"` | Names the close button. |
| `onClose` | `() => void` | no | noop | Reports close intent. |
| `rounded` | `boolean` | no | - | Applies `is-rounded`. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Tag_root_default_color` | `root` | `default` | `color` | `var(--pw_text_color)` | Tag foreground. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Tag background. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Border colour. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Border width. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Border style. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Corner radius. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_rounded_border-radius` | `root` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Rounded variant radius. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_padding` | `root` | `default` | `padding` | `0.125em 0.625em` | Inner spacing. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_font-size` | `root` | `default` | `font-size` | `var(--pw_small_font-size)` | Text size. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_font-weight` | `root` | `default` | `font-weight` | `var(--pw_bold_font-weight)` | Text weight. | Web, Capacitor, NativeScript |
| `--pw_Tag_root_default_letter-spacing` | `root` | `default` | `letter-spacing` | `0.04em` | Uppercase tracking. | Web, Capacitor, NativeScript |
| `--pw_Tag_close-button_default_min-width` | `close-button` | `default` | `min-width` | `1.563em` | Close control width, scaled to Tag size. | Web, Capacitor, NativeScript |
| `--pw_Tag_close-button_default_height` | `close-button` | `default` | `height` | `1.563em` | Close control height, scaled to Tag size. | Web, Capacitor, NativeScript |


## Keyboard interaction

- Without `closeButton`, Tag is not interactive and does not enter the tab order.
- The close action is a native button operable with `Enter` or `Space`.

## Accessibility notes

- Visible content is the default accessible name. `ariaLabel` supplements it
  when the visible text is insufficient.
- The close action is a native button named by `closeLabel`.
- Status meaning is carried by the text. Colour is decorative reinforcement.
- Shared web styles use uppercase status text, a Panel-style close control
  scaled to the Tag font size, visible `:focus-visible` indication, and
  forced-colours treatment.

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
[components-core Tag documentation](@pastweb/components-core/Tag/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Tag as R } from '@pastweb/react-components/Tag';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Tag/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Tag = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Tag } from '@/react/components/Tag';

type TagProps = ComponentProps<typeof Tag>;

export function MyComponent(props: TagProps) {
  return <Tag {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Tag.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA APG patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK Tag: https://design-system.service.gov.uk/components/tag/
