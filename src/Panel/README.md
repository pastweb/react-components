# Panel React renderer

@pastweb/react-components/Panel renders the framework-neutral Panel contract from
@pastweb/components-core/Panel as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Panel groups related content in a bordered, optionally rounded article with a
semantic heading, close action, and footer. Its rendering contract targets
WCAG 2.2 Level AA. It is a content grouping container, not a confirmation or
interruption panel.

## When to use

Use Panel to visually group a self-contained section of page content. Keep
heading levels consistent with the surrounding document. Do not use it as a
modal dialog without adding the separate dialog focus and interaction contract.
Do not use it as a GOV.UK confirmation or interruption panel.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, and state classes. |
| `ariaLabel` | `string` | no | `""` | Names the article when no title is supplied. Pass an empty string to omit the name. |
| `border` | `boolean` | no | `true` | Applies the `has-border` class. The public prop name remains `border`. |
| `borderRadius` | `boolean` | no | `true` | Applies the `has-border-radius` class. The public prop name remains `borderRadius`. |
| `className` | `string` | no | `""` | Adds classes to the root article. |
| `closeButton` | `boolean` | no | `true` | Displays the native close button. |
| `closeLabel` | `string` | no | `"Close panel"` | Names the close button. |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | no | `2` | Selects the native title heading level. |
| `id` | `string` | no | generated | Supplies the stable panel ID and title-ID base. Generated IDs use the `panel` prefix. Explicit IDs are stored as `_${id}`. |
| `title` | `string` | no | `""` | Supplies the default heading content. |
| `contentPadding` | `number \| string` | no | `0` | Sets inline padding on the content area. |
| `onClose` | `() => void` | no | noop | Reports close intent. |
| `rtl` | `boolean` | no | - | Reverses header content order. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no title is present. Empty labels are omitted. |
| `heading` | `PanelHeading` | Native title tag from `headingLevel`, such as `h2`. |
| `id` | `string` | Article ID from an explicit `id` or a generated `panel` prefix. |
| `titleId` | `string \| undefined` | Title relationship ID `title${id}` when heading content is present; otherwise omitted. |

## Slots

| SlotName | Description | Default content |
|---|---|---|
| default | Supplies panel body content. | Empty. |
| `header` | Replaces title and close content inside the semantic header. | Heading and optional close button. |
| `footer` | Supplies content wrapped in the semantic footer. | Empty. |

## CSS classes

| Class | Applied when | Notes |
|---|---|---|
| `Panel` | Always | Root component class. |
| `has-border` | `border` is `true` | Optional article border. |
| `has-border-radius` | `borderRadius` is `true` | Optional article corner radius. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Panel_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_background-color)` | Panel background. | Web, Capacitor, NativeScript |
| `--pw_Panel_root_default_color` | `root` | `default` | `color` | `var(--pw_text_color)` | Panel foreground. | Web, Capacitor, NativeScript |
| `--pw_Panel_root_default_font-size` | `root` | `default` | `font-size` | `var(--pw_font-size)` | Body text size. | Web, Capacitor, NativeScript |
| `--pw_Panel_root_default_font-weight` | `root` | `default` | `font-weight` | `var(--pw_font-weight)` | Body text weight. | Web, Capacitor, NativeScript |
| `--pw_Panel_root_default_line-height` | `root` | `default` | `line-height` | `var(--pw_line-height)` | Body line height. | Web, Capacitor, NativeScript |
| `--pw_Panel_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Optional border colour. | Web, Capacitor, NativeScript |
| `--pw_Panel_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Optional border width. | Web, Capacitor, NativeScript |
| `--pw_Panel_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Optional border style. | Web, Capacitor, NativeScript |
| `--pw_Panel_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Optional corner radius. | Web, Capacitor, NativeScript |
| `--pw_Panel_header_default_padding` | `header` | `default` | `padding` | `var(--pw_padding)` | Header spacing. | Web, Capacitor, NativeScript |
| `--pw_Panel_header_default_background-color` | `header` | `default` | `background-color` | `var(--pw_control_background-color)` | Header background. | Web, Capacitor, NativeScript |
| `--pw_Panel_header_default_border-bottom` | `header` | `default` | `border-bottom` | shared border | Header separator. | Web, Capacitor, NativeScript |
| `--pw_Panel_header_default_color` | `header` | `default` | `color` | `var(--pw_text_strong_color)` | Header foreground. | Web, Capacitor, NativeScript |
| `--pw_Panel_header_default_font-size` | `header` | `default` | `font-size` | `1em` | Heading text size. | Web, Capacitor, NativeScript |
| `--pw_Panel_header_default_font-weight` | `header` | `default` | `font-weight` | `var(--pw_bold_font-weight)` | Heading weight. | Web, Capacitor, NativeScript |
| `--pw_Panel_header_default_line-height` | `header` | `default` | `line-height` | `var(--pw_line-height)` | Heading line height. | Web, Capacitor, NativeScript |
| `--pw_Panel_close-button_default_background-color` | `close-button` | `default` | `background-color` | header background | Close-button background. | Web, Capacitor, NativeScript |
| `--pw_Panel_close-button_hover_background-color` | `close-button` | `hover` | `background-color` | header colour | Hover background. | Web, Capacitor |
| `--pw_Panel_close-button_default_min-width` | `close-button` | `default` | `min-width` | `1.563em` | Close-button width, matching Notification. | Web, Capacitor, NativeScript |
| `--pw_Panel_close-button_default_height` | `close-button` | `default` | `height` | `1.563em` | Close-button height, matching Notification. | Web, Capacitor, NativeScript |
| `--pw_Panel_close-button_default_transition-duration` | `close-button` | `default` | `transition-duration` | `0.5s` | Visual transition duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Panel_close-bar_default_background-color` | `close-bar` | `default` | `background-color` | header colour | Close glyph colour. | Web, Capacitor, NativeScript |
| `--pw_Panel_close-bar_hover_background-color` | `close-bar` | `hover` | `background-color` | close-button background | Hover glyph colour. | Web, Capacitor |
| `--pw_Panel_footer_default_padding` | `footer` | `default` | `padding` | header padding | Footer spacing. | Web, Capacitor, NativeScript |
| `--pw_Panel_footer_default_background-color` | `footer` | `default` | `background-color` | header background | Footer background. | Web, Capacitor, NativeScript |
| `--pw_Panel_footer_default_border-top` | `footer` | `default` | `border-top` | header separator | Footer separator. | Web, Capacitor, NativeScript |


## Keyboard interaction

- The close action is a native button and is operable with `Enter` or `Space`.
- Body content is not interactive unless projected content supplies its own
  controls.

## Accessibility notes

- The default title is a native heading connected to the article through
  `aria-labelledby` and the `title${id}` relationship ID.
- Without a title, `ariaLabel` can provide the article's accessible name. The
  default is an empty string, which omits the name.
- The close action is a native button with a configurable name. Decorative close
  bars are excluded from the accessibility tree.
- A custom header must preserve an appropriate heading and close-action name.
- Shared web styles match the Notification close control size, with visible
  keyboard focus, forced-colours treatment, and reduced-motion behavior.

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
[components-core Panel documentation](@pastweb/components-core/Panel/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Panel as R } from '@pastweb/react-components/Panel';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Panel/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Panel = forwardRef<HTMLElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Panel } from '@/react/components/Panel';

type PanelProps = ComponentProps<typeof Panel>;

export function MyComponent(props: PanelProps) {
  return <Panel {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Panel.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA landmark regions: https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
- GOV.UK Panel guidance: https://design-system.service.gov.uk/components/panel/
- GOV.UK headings guidance: https://design-system.service.gov.uk/styles/headings/
