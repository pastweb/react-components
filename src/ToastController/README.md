# ToastController React renderer

@pastweb/react-components/ToastController renders the framework-neutral ToastController contract from
@pastweb/components-core/ToastController as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

ToastController presents a temporary, politely announced status message. Its
rendering contract targets WCAG 2.2 Level AA.

## When to use

Use ToastController for non-urgent confirmation or status that can disappear.
Use Notification for a persistent in-page message, an alert pattern for urgent
information, and a dialog when the user must decide before continuing.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `""` | Names the status region. Pass an empty string to omit it. |
| `portal` | `Portal` | no | - | Portal configuration. |
| `portalElement` | `HTMLElement` | no | - | Portal container. |
| `entryId` | `string` | no | - | Portal entry ID. |
| `placement` | `PLACEMENT` | no | `top-right` | Viewport placement. |
| `padding` | `number` | no | `15` | Inner padding in pixels. |
| `delay` | `number` | no | `5` | Auto-dismiss delay in seconds. |
| `timeUpdate` | `number` | no | `10` | Timer tick interval. |
| `animation` | `Animation` | no | `slide` | Entry and exit animation. |
| `closeOnEscKey` | `boolean` | no | - | Dismisses on `Escape`. |
| `pauseTimerOnOver` | `boolean` | no | - | Pauses the timer on pointer or keyboard focus. |
| `resetTimerOnPause` | `boolean` | no | - | Resets the timer when pausing. |
| `onClose` | `() => void` | no | noop | Reports close intent. |
| `onDestroy` | `() => void` | no | noop | Reports portal removal. |
| `onKeyDown` | `(event) => void` | no | noop | Observes keyboard input. |

## XTS rendering contract


ToastController is a browser-only portal controller. Create it only while its
portal element is available; it is not part of initial server rendering.

## Keyboard interaction

- `Escape` dismisses the toast when `closeOnEscKey` is enabled.
- The toast does not enter sequential tab order. Interactive content inside it
  remains operable.

## Accessibility notes

- The toast is a polite `status` live region. It does not move focus on open.
- The auto-dismiss timer pauses while the pointer is over the toast, while it
  has keyboard focus, and while it is not fully visible.
- Time limits can be paused (`pauseTimerOnOver`) and dismissed early (`Escape`
  or a consumer close control).
- Shared web styles keep a visible `:focus-visible` indicator and disable
  non-essential motion under `prefers-reduced-motion`.

## Known limitations

- A visible close control is not built in. Supply one in the toast content when
  users must dismiss without waiting.
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
[components-core ToastController documentation](@pastweb/components-core/ToastController/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { ToastController as R } from '@pastweb/react-components/ToastController';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/ToastController/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const ToastController = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { ToastController } from '@/react/components/ToastController';

type ToastControllerProps = ComponentProps<typeof ToastController>;

export function MyComponent(props: ToastControllerProps) {
  return <ToastController {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/ToastController.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Status and alert patterns: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK notification banner: https://design-system.service.gov.uk/components/notification-banner/
