# Icon React renderer

@pastweb/react-components/Icon renders the framework-neutral Icon contract from
@pastweb/components-core/Icon as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Icon renders an inline SVG or image URL from a direct source, local collection,
or Iconify-compatible API. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use Icon for a compact visual symbol. Icons are decorative by default. Supply
`ariaLabel` only when the icon communicates meaning that is not already present
in nearby text. Do not use an icon as an unlabeled interactive control. Prefer
a visible text label alongside an icon when the symbol is part of a control.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component classes. |
| `ariaLabel` | `string` | no | `""` | Names a meaningful icon and gives it the image role. Pass an empty string to keep the icon decorative. |
| `className` | `string` | no | `""` | Adds classes to the root. |
| `src` | `string` | no | `""` | Supplies an SVG string, image URL, or data URL. |
| `name` | `string` | no | `""` | Selects an icon using `collection:icon` syntax. |
| `collection` | `Collection` | no | `{}` | Supplies trusted local icon sources by collection and name. |
| `apiUrl` | `string` | no | `https://api.iconify.design` | Selects the Iconify-compatible API endpoint. |

SVG strings are injected as markup and therefore must come from trusted sources.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaHidden` | `true \| undefined` | Is `true` when the icon is decorative; otherwise omitted. Renderers use this value directly for `aria-hidden`. |
| `ariaLabel` | `string \| undefined` | Normalized accessible name. Empty labels are omitted. |
| `collectionName` | `string` | Collection segment parsed from `name`. |
| `iconData` | `IconData \| string` | Inline SVG markup when the source is an SVG string. |
| `iconName` | `string` | Icon segment parsed from `name`. |
| `role` | `'img' \| undefined` | Is `img` when `ariaLabel` supplies a name; otherwise omitted. |
| `src` | `string` | Image URL when the source is not inline SVG. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Icon_root_default_color` | `root` | `default` | `color` | `var(--pw_text_strong_color)` | Icon foreground. | Web, Capacitor, NativeScript |
| `--pw_Icon_graphic_default_width` | `graphic` | `default` | `width` | `1em` | Graphic width. | Web, Capacitor, NativeScript |
| `--pw_Icon_graphic_default_height` | `graphic` | `default` | `height` | `1em` | Graphic height. | Web, Capacitor, NativeScript |


## Keyboard interaction

- Icon is not interactive. It does not enter the tab order.

## Accessibility notes

- Decorative icons are removed from the accessibility tree with `aria-hidden`.
- Meaningful icons expose `role="img"` and one accessible name on the root.
  Nested images use empty alternative text to prevent duplicate announcements.
- The default `ariaLabel` is an empty string, which keeps the icon decorative.
  Pass a task-specific name when the icon is meaningful.
- Icons used inside controls do not replace the control's visible or accessible
  label.

## Known limitations

- Inline SVG markup must come from trusted sources.
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
[components-core Icon documentation](@pastweb/components-core/Icon/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Icon as R } from '@pastweb/react-components/Icon';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Icon/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Icon = forwardRef<HTMLElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Icon } from '@/react/components/Icon';

type IconProps = ComponentProps<typeof Icon>;

export function MyComponent(props: IconProps) {
  return <Icon {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Icon.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Image pattern: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK images guidance: https://design-system.service.gov.uk/styles/images/
