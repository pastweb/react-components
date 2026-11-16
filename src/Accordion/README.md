# Accordion React renderer

`@pastweb/react-components/Accordion` renders the framework-neutral Accordion
mediators from `@pastweb/components-core/Accordion` as React components.

`Accordion` creates the shared context consumed by its panel children.
`AccordionPanel` renders the heading, native trigger button, animated content
region, and expanded/collapsed accessibility state. Both components forward
their root element through React refs so an application extension can attach
styles and expose the element to its consumers.

This package is a renderer layer. State transitions, IDs, defaults, event
ordering, and accessibility relationships remain in the shared mediator. React
owns JSX, refs, lifecycle cleanup, context publishing, and conversion of
`Template` children into named slots.

The shared contract is documented at
`@pastweb/components-core/Accordion/README.md`.

## Props

### Accordion

| Prop | Type | Default | Description |
|---|---|---|---|
| `cls` | `(...args: ClassValue[]) => string` | required | Resolves component and state classes. It is normally supplied by the application extension. |
| `className` | `string` | `""` | Adds classes to the Accordion root. |
| `ariaLabel` | `string` | `"Accordion"` | Accessible name for the Accordion group. Pass an empty string to omit the group semantics. |
| `disabled` | `boolean` | `undefined` | Disables all panel triggers. |
| `id` | `string` | generated | Sets the root ID. |
| `rtl` | `boolean` | `undefined` | Enables right-to-left layout. |
| `transitionDuration` | `number` | `500` | Default panel transition duration in milliseconds. |
| `children` | `ReactElement \| ReactElement[]` | empty | Ordered `AccordionPanel` children. |

### AccordionPanel

| Prop | Type | Default | Description |
|---|---|---|---|
| `cls` | `(...args: ClassValue[]) => string` | required | Resolves component and state classes. It is normally supplied by the application extension. |
| `className` | `string` | `""` | Adds classes to the panel root. |
| `disabled` | `boolean` | `undefined` | Disables the native trigger button. |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `2` | Heading level required by the surrounding document. |
| `id` | `string` | generated | Sets the stable base ID used by trigger and panel relationships. |
| `isOpen` | `boolean` | `undefined` | Sets the initial expanded state. |
| `landmark` | `boolean` | `undefined` | Adds `role="region"` to the content. Enable selectively to avoid landmark proliferation. |
| `onOpenChange` | `(isOpen: boolean) => void` | `undefined` | Reports a user-requested state change. React consumers use this callback directly. |
| `title` | `string \| number` | `""` | Default accessible trigger content. |
| `rtl` | `boolean` | `undefined` | Enables right-to-left layout for this panel. |
| `transitionDuration` | `number` | `500` | Panel transition duration in milliseconds. |
| `children` | `ReactNode \| ReactNode[]` | empty | Panel content and optional `Template` children. |

The internal `cls` prop is part of the renderer contract because styles are
consumed as CSS modules. Application wrappers normally hide it from their
public props and provide it automatically.

## Slots and context

### Accordion slots

| Slot | React representation | Description |
|---|---|---|
| `default` | `children` | Supplies the ordered `AccordionPanel` children. |

### AccordionPanel slots

| Slot | React representation | Description |
|---|---|---|
| `header` | `<Template name='header'>...</Template>` | Replaces the content inside the native trigger button without replacing the heading or button. |
| `default` | ordinary `children` | Supplies the panel content. |

The `header` template must provide a meaningful accessible name. Decorative
icons must use `aria-hidden='true'`. The renderer keeps the required heading,
button, IDs, ARIA attributes, keyboard handler, and focus behavior around every
custom template.

`Accordion` publishes the core Accordion context for its descendants. Consumers
normally compose `AccordionPanel` inside `Accordion` rather than reading the
context directly.

## Renderer API

The renderer requires a `cls` function because component styles are consumed as
CSS modules. An application extension imports the public style module and
extends the shared application class processor with `cl.setClasses`.

```tsx
import { forwardRef } from 'react';
import { Accordion as A } from '@pastweb/react-components/Accordion';
import { cl } from '@/styles';
import type { AccordionProps } from './types';

import classes from '@pastweb/components-core/Accordion/style.module.scss';

const cls = cl.setClasses(classes);

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  return <A {...props} ref={ref} cls={cls} />;
});
```

`AccordionPanel` uses its nested style module and forwards its semantic section
ref in the same way:

```tsx
import { forwardRef } from 'react';
import { cl } from '@/styles';
import { AccordionPanel as AP } from '@pastweb/react-components/Accordion';
import type { AccordionPanelProps } from './types';

import classes from '@pastweb/components-core/Accordion/AccordionPanel/style.module.scss';

const cls = cl.setClasses(classes);

export const AccordionPanel = forwardRef<HTMLElement, AccordionPanelProps>((props, ref) => {
  return <AP {...props} ref={ref} cls={cls} />;
});
```

`onOpenChange` remains a regular React callback. The renderer invokes it with
the next open state, so no event-emitter bridge is required:

```tsx
<AccordionPanel
  title='Security'
  onOpenChange={isOpen => {
    console.log('Security panel is', isOpen ? 'open' : 'closed');
  }}
>
  Manage your password and sign-in options.
</AccordionPanel>
```

## Usage

```tsx
import { Accordion, AccordionPanel } from '@/react/components/Accordion';
import { Template } from '@pastweb/react';

export function MyComponent() {
  return (
    <Accordion ariaLabel='Account help'>
      <AccordionPanel title='Change my password'>
        <p>Use the account settings page to change your password.</p>
      </AccordionPanel>

      <AccordionPanel title='Enable two-factor authentication'>
        <Template name='header'>
          <span>Enable two-factor authentication</span>
        </Template>
        <p>Choose an authenticator app from the account security settings.</p>
      </AccordionPanel>
    </Accordion>
  );
}
```

Use `transitionDuration` on `Accordion` to set the default panel animation in
milliseconds. Set it on an individual `AccordionPanel` only when that panel
needs a different duration.

## Keyboard and accessibility

- `Tab` and `Shift+Tab` move through panel triggers and focusable open content
  in normal document order.
- `Enter` and `Space` toggle a panel through native button behavior.
- `aria-expanded`, `aria-controls`, and `aria-labelledby` establish the
  trigger/content relationship.
- Collapsed content is inert and hidden from the accessibility tree while its
  transition remains mounted for animation.
- `role="region"` is opt-in through `landmark` to avoid excessive landmarks.
- Shared styles retain visible focus and support reduced-motion and forced-colors
  preferences.

## Standards

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [GOV.UK Accordion guidance](https://design-system.service.gov.uk/components/accordion/)
