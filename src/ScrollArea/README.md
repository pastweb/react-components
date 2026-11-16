# ScrollArea React renderer

@pastweb/react-components/ScrollArea renders the framework-neutral ScrollArea contract from
@pastweb/components-core/ScrollArea as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

ScrollArea provides a named, keyboard-focusable viewport for overflowing
content. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use it when content must remain within a bounded layout. Avoid nested scroll
areas and never hide an axis when that would make content unreachable.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and part classes. |
| `ariaLabel` | `string` | no | `"Scrollable content"` | Names the region. Pass an empty string to omit the name. Prefer a specific label. |
| `id` | `string` | no | - | Root ID. |
| `className` | `string` | no | `""` | Additional root classes. |
| `hideX` | `boolean` | no | - | Applies `hide-x` and suppresses horizontal overflow. |
| `hideY` | `boolean` | no | - | Applies `hide-y` and suppresses vertical overflow. |
| `scrollRight` | `boolean` | no | - | Applies `scroll-right` and requests initial horizontal end alignment. |
| `scrollBottom` | `boolean` | no | - | Applies `scroll-bottom` and requests initial vertical end alignment. |
| `contentPadding` | `number \| string` | no | - | Inline padding scoped to `.content`. |
| `tabIndex` | `number` | no | `0` | Makes the scroll viewport keyboard focusable. |

The default slot supplies scrollable content.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized region name. Empty labels are omitted. |

`getContentStyle()` returns `{ padding }` when `contentPadding` is provided,
including `0`. `getScrollAlignment()` returns semantic `start` or `end` axes
for the renderer to apply after layout.

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_ScrollArea_content_default_scrollbar-color` | `content` | `default` | `scrollbar-color` | `#e3e3e3 transparent` | Standards scrollbar colours. | Web, Capacitor |
| `--pw_ScrollArea_content_default_scrollbar-width` | `content` | `default` | `scrollbar-width` | `thin` | Standards scrollbar width. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar_default_width` | `scrollbar` | `default` | `width` | `12px` | WebKit vertical width. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar_default_height` | `scrollbar` | `default` | `height` | `12px` | WebKit horizontal height. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-track_default_background-color` | `scrollbar-track` | `default` | `background-color` | `#fcfcfc` | Track colour. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-thumb_default_background-color` | `scrollbar-thumb` | `default` | `background-color` | `#dfdfdf` | Thumb colour. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-thumb_hover_background-color` | `scrollbar-thumb` | `hover` | `background-color` | `#7a7a7a` | Hover thumb colour. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-thumb_default_border-radius` | `scrollbar-thumb` | `default` | `border-radius` | `6px` | Thumb corners. | Web, Capacitor |
| `--pw_ScrollArea_scrollbar-corner_default_background-color` | `scrollbar-corner` | `default` | `background-color` | `#fbfbfb` | Corner colour. | Web, Capacitor |


## Keyboard interaction

- `Tab` and `Shift+Tab` move sequential focus to the named viewport.
- Arrow keys, `PageUp`, `PageDown`, `Home`, and `End` scroll native overflow
  when the viewport is focused.

## Accessibility notes

- The web viewport is a named `region` and is keyboard focusable.
- Renderers consume `getScrollAlignment()` after layout instead of reversing
  visual content order.
- Hiding an axis must not make content unreachable.
- Shared web styles provide a visible `:focus-visible` indicator.

## Known limitations

- Nested scroll areas make keyboard scrolling harder to discover.
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
[components-core ScrollArea documentation](@pastweb/components-core/ScrollArea/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { ScrollArea as R } from '@pastweb/react-components/ScrollArea';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/ScrollArea/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const ScrollArea = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { ScrollArea } from '@/react/components/ScrollArea';

type ScrollAreaProps = ComponentProps<typeof ScrollArea>;

export function MyComponent(props: ScrollAreaProps) {
  return <ScrollArea {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/ScrollArea.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA landmark regions: https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
- GOV.UK components: https://design-system.service.gov.uk/components/
