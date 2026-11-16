# Buttons React renderer

`@pastweb/react-components/Buttons` renders the framework-neutral Buttons
mediator from `@pastweb/components-core/Buttons` as a React group for related
native `Button` controls.

The renderer owns the group wrapper, React ref, lifecycle cleanup, and context
publishing. The shared mediator owns defaults, group state, accessible naming,
and the disabled context consumed by descendant Pastweb Buttons.

Use `Buttons` when related actions belong to the same decision or workflow.
Keep the primary action first in the expected reading direction and use a
toolbar component instead when the collection needs toolbar arrow-key behavior.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `cls` | `(...args: ClassValue[]) => string` | required | Resolves component and state classes. It is normally supplied by the application extension. |
| `ariaLabel` | `string` | `'Button group'` | Supplies the group's accessible name. Pass an empty string to omit the group semantics. |
| `className` | `string` | `""` | Adds classes to the group wrapper. The renderer also adds `is-disabled` from mediator state. |
| `disabled` | `boolean` | `undefined` | Disables descendant Pastweb Buttons and marks the group unavailable. |
| `id` | `string` | generated | Supplies the group ID. |
| `children` | `ReactNode` | required | Supplies related Button controls in their intended reading and action order. |

The internal `cls` prop is part of the renderer contract because styles are
consumed as CSS modules. Application wrappers normally omit it from their
public props and provide it automatically.

The forwarded React ref targets the group wrapper `HTMLDivElement`.

## CSS utility classes

These utility classes are defined by the core Buttons stylesheet and can be
passed through `className`:

| Utility class | Description |
|---|---|
| `is-rounded` | Rounds the group's exposed first and last button corners. |
| `is-full-width` | Expands the group to the available width and distributes its buttons evenly. |

Theme and size utilities belong to the consuming application and are not part
of this renderer README. The complete CSS-token contract is maintained by the
[`components-core Buttons documentation`](@pastweb/components-core/Buttons/README.md).

## Context and state

`Buttons` publishes the core Buttons context for descendant Button mediators.
The context carries the normalized group disabled state, which each Button
combines with its own local `disabled` prop.

The renderer adds `is-disabled` and `aria-disabled` when the mediator reports a
disabled group. The wrapper receives `role='group'` and `aria-label` when the
normalized accessible label is present; an explicitly empty label omits both
optional group semantics.

## Renderer API

The renderer requires a `cls` function because component styles are consumed as
CSS modules. An application extension imports the public Buttons style module
and extends the shared application class processor with `cl.setClasses`.

```tsx
import { forwardRef } from 'react';
import { Buttons as B } from '@pastweb/react-components/Buttons';
import { cl } from '@/styles';
import type { ButtonsProps } from './types';

import classes from '@pastweb/components-core/Buttons/style.module.scss';

const cls = cl.setClasses(classes);

export const Buttons = forwardRef<HTMLDivElement, ButtonsProps>((props, ref) => {
  return <B {...props} ref={ref} cls={cls} />;
});
```

The wrapper must preserve the `children` passed to the renderer so descendant
Button components can consume the published context.

## Usage

```tsx
import { Button } from '@/react/components/Button';
import { Buttons } from '@/react/components/Buttons';

export function MyComponent() {
  return (
    <Buttons ariaLabel='Account actions' className='is-rounded'>
      <Button>Save changes</Button>
      <Button>Cancel</Button>
    </Buttons>
  );
}
```

## Accessibility and keyboard interaction

- The wrapper uses `role='group'` only when it has a meaningful accessible
  name. The default name is `'Button group'`; an explicitly empty label omits
  the group role and label.
- Descendant Buttons retain their normal tab order and native keyboard
  behavior.
- Group disabling is shared through context, so descendant Pastweb Buttons
  receive the same disabled state without duplicating application logic.
- Use a toolbar component with documented arrow-key behavior instead when the
  collection represents a persistent application toolbar.
- Keep one primary call to action in a group so the next step remains clear.
- Shared styles retain visible focus and support reduced-motion and
  forced-colors preferences.

## Standards

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [GOV.UK Button guidance](https://design-system.service.gov.uk/components/button/)
