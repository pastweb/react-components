# Link React renderer

@pastweb/react-components/Link renders the framework-neutral Link contract from
@pastweb/components-core/Link as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Link renders a native anchor for navigation and prevents unavailable links from
remaining actionable or focusable. Its rendering contract follows the WAI-ARIA
Link pattern and targets WCAG 2.2 Level AA.

## When to use

Use Link to navigate to another resource or location. Use Button for actions on
the current page. Link text should describe its destination without relying on
surrounding text such as “click here.”

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `href` | `string` | no | `"#"` | Supplies the destination. Prefer a real URL. |
| `className` | `string` | no | `""` | Adds classes to the anchor. |
| `disabled` | `boolean` | no | - | Removes navigation and sequential focus. |
| `target` | `'_self' \| '_blank'` | no | `'_self'` | Selects the browsing context. New-window links must communicate that behavior in their accessible content. |
| `id` | `string` | no | - | Supplies the anchor ID. |
| `onClick` | `(event: unknown) => void` | no | noop | Reports available-link activation. Renderers may narrow the event type. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `isDisabled` | `true \| undefined` | Is `true` when the link is unavailable; otherwise omitted. Renderers use this value directly for `.is-disabled`, `aria-disabled`, omitted `href`, and `tabIndex={-1}`. |

## Slots

| SlotName | Description | Default content |
|---|---|---|
| default | Supplies descriptive link content. | Empty. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Link_root_default_color` | `root` | `default` | `color` | `var(--pw_link_color)` | Link foreground. | Web, Capacitor, NativeScript |
| `--pw_Link_root_hover_color` | `root` | `hover` | `color` | `var(--pw_link_hover_color)` | Pointer hover foreground. | Web, Capacitor |
| `--pw_Link_root_default_font-size` | `root` | `default` | `font-size` | `var(--pw_link_font-size)` | Link text size. | Web, Capacitor, NativeScript |
| `--pw_Link_root_default_font-weight` | `root` | `default` | `font-weight` | `var(--pw_link_font-weight)` | Link text weight. | Web, Capacitor, NativeScript |
| `--pw_Link_root_default_line-height` | `root` | `default` | `line-height` | `var(--pw_link_line-height)` | Link line height. | Web, Capacitor, NativeScript |
| `--pw_Link_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |


## Keyboard interaction

- Available links retain native anchor keyboard activation, typically `Enter`.
- `Tab` and `Shift+Tab` move sequential focus to available links. Disabled
  links leave the tab order.

## Accessibility notes

- Available links retain native anchor semantics and keyboard activation.
- Disabled links omit `href`, expose `aria-disabled="true"`, leave sequential
  focus, and prevent activation in the mediator.
- Links opening a new browsing context use `noopener noreferrer`; their content
  should also tell users that a new tab or window will open.
- Shared web styles keep underlining, visible keyboard focus, and
  forced-colours treatment.

## Known limitations

- Placeholders such as `href="#"` do not describe a destination.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.


## React renderer contract

The renderer preserves the core contract while adapting it to React:

- the forwarded ref targets the renderer's HTMLAnchorElement root or control element;
- callback props remain regular React callbacks with the argument order defined
  by the core mediator;
- default content uses ordinary children; named slots use Template with a
  name prop when the core contract documents named slots;
- the internal cls prop resolves the public CSS-module classes and is usually
  supplied by the application extension.

The complete source-of-truth contract is maintained in the
[components-core Link documentation](@pastweb/components-core/Link/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Link as R } from '@pastweb/react-components/Link';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Link/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Link = forwardRef<HTMLAnchorElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Link } from '@/react/components/Link';

type LinkProps = ComponentProps<typeof Link>;

export function MyComponent(props: LinkProps) {
  return <Link {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Link.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Link pattern: https://www.w3.org/WAI/ARIA/apg/patterns/link/
- GOV.UK links guidance: https://www.gov.uk/guidance/content-design/links
