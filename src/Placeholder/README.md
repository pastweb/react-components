# Placeholder React renderer

@pastweb/react-components/Placeholder renders the framework-neutral Placeholder contract from
@pastweb/components-core/Placeholder as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Placeholder renders a non-interactive shape that stands in for content that has
not loaded yet. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use Placeholder to reserve layout while content loads. Keep placeholders
decorative when several shapes compose one skeleton, and announce loading once
on a parent region or with a single non-decorative Placeholder. Do not rely on
the pulse animation as the only loading signal. Use Spinner for a compact
indeterminate status, and ProgressBar when completion can be calculated.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `"Loading"` | Names the status when the placeholder is not decorative. Pass an empty string to omit the name. |
| `className` | `string` | no | `""` | Adds classes to the root, including shape utilities. |
| `decorative` | `boolean` | no | `true` | Removes status semantics, hides the shape from the accessibility tree, and applies `is-decorative`. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaHidden` | `true \| undefined` | Is `true` when the placeholder is decorative; otherwise omitted. Renderers use this value directly for `aria-hidden`. |
| `ariaLabel` | `string \| undefined` | Normalized status name. Decorative and empty labels are omitted. |
| `ariaLive` | `'polite' \| undefined` | Is `polite` unless decorative. |
| `role` | `'status' \| undefined` | Is `status` unless decorative. |

## Utility classes

Apply these classes through `className`. The default shape is a full-width bar
at Button height using the same `--pw_border-radius` token as Button.
`is-circle`, `is-square`, and `is-block` replace that size. `is-rounded` and
`is-pill` change the corner radius and can combine with the default, square, or
block shapes. A circle keeps a 50% radius.

| Class | Description |
|---|---|
| `is-circle` | Equal sides and a circular radius, for avatars and round media. |
| `is-square` | Equal sides with the default corner radius. |
| `is-block` | A taller full-width rectangle, for images and cards. |
| `is-rounded` | Uses the rounded corner-radius token. |
| `is-pill` | Uses a fully rounded capsule radius. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Placeholder_root_default_color` | `root` | `default` | `color` | `var(--pw_text_color)` | Colour used by the `currentcolor` fill. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_default_background-color` | `root` | `default` | `background-color` | `currentcolor` | Placeholder fill. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_default_opacity` | `root` | `default` | `opacity` | `0.5` | Resting fill opacity. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_pulse_opacity` | `root` | `pulse` | `opacity` | `0.2` | Glow opacity at the midpoint of the pulse. | Web, Capacitor; NativeScript adapter |
| `--pw_Placeholder_root_default_width` | `root` | `default` | `width` | `100%` | Default width. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_default_height` | `root` | `default` | `height` | `2.75em` | Default height, matching Button. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Default corner radius, matching Button. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_rounded_border-radius` | `root` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Corner radius for `is-rounded`. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_pill_border-radius` | `root` | `pill` | `border-radius` | `999px` | Corner radius for `is-pill`. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_circle_width` | `root` | `circle` | `width` | `3em` | Width for `is-circle`. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_circle_height` | `root` | `circle` | `height` | `3em` | Height for `is-circle`. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_square_width` | `root` | `square` | `width` | `3em` | Width for `is-square`. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_square_height` | `root` | `square` | `height` | `3em` | Height for `is-square`. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_block_width` | `root` | `block` | `width` | `100%` | Width for `is-block`. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_block_height` | `root` | `block` | `height` | `8em` | Height for `is-block`. | Web, Capacitor, NativeScript |
| `--pw_Placeholder_root_default_animation-duration` | `root` | `default` | `animation-duration` | `2s` | Pulse duration. | Web, Capacitor; NativeScript adapter |


## Keyboard interaction

- Placeholder is not interactive. It does not enter the tab order.

## Accessibility notes

- Placeholders are decorative by default and are removed from the accessibility
  tree with `aria-hidden`.
- A non-decorative Placeholder exposes `role="status"`, a polite live region,
  and `ariaLabel`. Use that mode only for a single loading signal.
- When several placeholders compose a skeleton, keep them decorative and
  announce loading once on a parent region.
- The pulse animation is suppressed when the user prefers reduced motion.
- Do not use Placeholder as an unlabeled interactive control.

## Known limitations

- Automated accessibility checks do not by themselves establish WCAG
  conformance.
- The fill colour must remain distinguishable from the page background.


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
[components-core Placeholder documentation](@pastweb/components-core/Placeholder/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Placeholder as R } from '@pastweb/react-components/Placeholder';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Placeholder/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Placeholder = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Placeholder } from '@/react/components/Placeholder';

type PlaceholderProps = ComponentProps<typeof Placeholder>;

export function MyComponent(props: PlaceholderProps) {
  return <Placeholder {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Placeholder.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA status guidance: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK components guidance: https://design-system.service.gov.uk/components/
