# Spinner React renderer

@pastweb/react-components/Spinner renders the framework-neutral Spinner contract from
@pastweb/components-core/Spinner as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Spinner displays a rotating visual indicator and exposes a polite loading
status. Its rendering contract targets WCAG 2.2 Level AA.

## When to use

Use it for short waits when completion cannot be calculated. Use ProgressBar for
determinate work. Do not rely on animation alone: keep the accessible label
specific to the operation.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and part classes. |
| `ariaLabel` | `string` | no | `"Loading"` | Accessible status name. Pass an empty string to omit the name. |
| `decorative` | `boolean` | no | - | Removes status semantics and applies `is-decorative`. |
| `className` | `string` | no | `""` | Additional root classes. |

The default slot supplies the visual glyph and is hidden from assistive
technology.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized status name. Decorative and empty labels are omitted. |
| `ariaLive` | `'polite' \| undefined` | Is `polite` unless decorative. |
| `role` | `'status' \| undefined` | Is `status` unless decorative. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Spinner_root_default_width` | `root` | `default` | `width` | `1.5em` | Indicator width. | Web, Capacitor, NativeScript |
| `--pw_Spinner_root_default_height` | `root` | `default` | `height` | `1.5em` | Indicator height. | Web, Capacitor, NativeScript |
| `--pw_Spinner_root_default_color` | `root` | `default` | `color` | `currentcolor` | Indicator colour. | Web, Capacitor, NativeScript |
| `--pw_Spinner_content_default_animation-duration` | `content` | `default` | `animation-duration` | `2s` | Rotation duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Spinner_content_default_animation-timing-function` | `content` | `default` | `animation-timing-function` | `linear` | Rotation timing. | Web, Capacitor; NativeScript adapter |


## Keyboard interaction

- Spinner is not interactive. It does not enter the tab order.

## Accessibility notes

- The web renderer exposes a named polite status unless decorative.
- Decorative spinners omit role, name, and live region.
- Shared web styles disable non-essential rotation under `prefers-reduced-motion`.

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
[components-core Spinner documentation](@pastweb/components-core/Spinner/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Spinner as R } from '@pastweb/react-components/Spinner';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Spinner/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Spinner = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Spinner } from '@/react/components/Spinner';

type SpinnerProps = ComponentProps<typeof Spinner>;

export function MyComponent(props: SpinnerProps) {
  return <Spinner {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Spinner.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA status guidance: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK components: https://design-system.service.gov.uk/components/
