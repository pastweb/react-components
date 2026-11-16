# Button React renderer

`@pastweb/react-components/Button` renders the framework-neutral Button
mediator from `@pastweb/components-core/Button` as a native React
`HTMLButtonElement`.

The renderer owns JSX, React refs, lifecycle cleanup, and named slot conversion.
The shared mediator owns defaults, disabled/loading state, click suppression,
and the public accessibility contract. Use the application-level Button
extension when you need the application's CSS modules or loading indicator.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `cls` | `(...args: ClassValue[]) => string` | required | Resolves component and state classes. It is normally supplied by the application extension. |
| `className` | `string` | `""` | Adds classes to the native button. The renderer also adds `is-disabled` and `is-loading` from mediator state. |
| `id` | `string` | generated | Supplies the button ID. |
| `onClick` | `(event: MouseEvent<HTMLButtonElement>) => void` | noop | Handles an available button activation. Loading and disabled states are handled by the mediator before this callback is invoked. |
| `disabled` | `boolean` | `undefined` | Makes the action unavailable and applies the native `disabled` attribute. |
| `loading` | `boolean` | `undefined` | Marks the action busy, suppresses activation, and displays the loading slot without changing the disabled state. |
| `tabIndex` | `number` | `0` | Controls sequential keyboard focus order. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Selects native button behavior. |
| `children` | `ReactNode \| ReactNode[]` | empty | Supplies the accessible label and optional icon content. |

The internal `cls` prop is part of the renderer contract because styles are
consumed as CSS modules. Application wrappers normally omit it from their
public props and provide it automatically.

The forwarded React ref targets the native `HTMLButtonElement`.

## CSS utility classes

These utility classes are defined by the core Button stylesheet and can be
passed through `className`:

| Utility class | Description |
|---|---|
| `is-rounded` | Uses the rounded button radius token. |
| `is-full-width` | Expands the button to the available width. |

Theme and size utilities belong to the consuming application and are not part
of this renderer README. The complete CSS-token contract is maintained by the
[`components-core Button documentation`](@pastweb/components-core/Button/README.md).

## Slots and state

| Slot | React representation | Description |
|---|---|---|
| `default` | ordinary `children` | Supplies the button label and optional icon/content nodes. Each child is wrapped in the renderer's item span. |
| `loading` | `<Template name='loading'>...</Template>` | Replaces the default `Loading...` status content while `loading` is active. |

The renderer adds `is-disabled` when the mediator reports `isDisabled` and
`is-loading` when it reports `isLoading`. Loading buttons remain independently
enabled at the native-property level, but the mediator suppresses activation
and the loading layer receives `role='status'` with `aria-live='polite'`.

## Renderer API

The renderer requires a `cls` function because component styles are consumed as
CSS modules. An application extension imports the public Button style module
and extends the shared application class processor with `cl.setClasses`.

```tsx
import { forwardRef } from 'react';
import { Template } from '@pastweb/react';
import { Button as B } from '@pastweb/react-components/Button';
import { cl } from '@/styles';
import { Spinner } from '../Spinner';
import type { ButtonProps } from './types';

import classes from '@pastweb/components-core/Button/style.module.scss';

const cls = cl.setClasses(classes);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <B {...props} ref={ref} cls={cls}>
    <Template name='loading'>
      <Spinner />
    </Template>
    {props.children}
  </B>
));
```

The application wrapper can provide a framework-specific loading indicator
without moving loading behavior out of the shared mediator. `onClick` remains a
regular React callback and receives the native mouse event only when the button
is available.

## Usage

```tsx
import { Button } from '@/react/components/Button';

export function MyComponent() {
  return (
    <Button className='is-rounded' type='submit'>
      Save changes
    </Button>
  );
}
```

## Accessibility and keyboard interaction

- The renderer always uses a native `<button>` and preserves native keyboard
  activation.
- Disabled buttons use the native `disabled` property, `aria-disabled='true'`,
  and the `is-disabled` state class.
- Loading buttons expose `aria-busy='true'`, render polite status content, and
  suppress the click callback while loading.
- A button may be both disabled and loading when both states are set.
- Keep the accessible name meaningful without relying on a decorative icon.
- `Tab` and `Shift+Tab` move focus through the native button; `Enter` and
  `Space` activate it through native browser behavior.
- Shared styles retain visible focus and support reduced-motion and
  forced-colors preferences.

## Standards

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [GOV.UK Button guidance](https://design-system.service.gov.uk/components/button/)
