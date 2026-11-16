# Table React renderer

@pastweb/react-components/Table renders the framework-neutral Table contract from
@pastweb/components-core/Table as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Table provides data-grid primitives for column visibility, ordering, pinning,
sorting, filtering, grouping, expansion, and row selection. The mediator owns
the table state and generated identifiers; framework renderers only connect it
to their native table elements.

## Identifier lifecycle

Each mediator instance creates an identifier with `idCache.getId('table')`.
Renderers use `m.id` as the prefix for header and cell identifiers, keeping ARIA
relationships unique across multiple tables. `m.useBeforeUnmount()` clears both
row identity records and the generated identifier.

## Mediator API

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique generated prefix for table accessibility identifiers. |
| `state` | `TableState` | Reactive columns, rows, controlled values, and drag state. |
| `table` | `TableInstance` | Public table instance used by consumers and slots. |
| `onMounted` | `(element: HTMLTableElement) => void` | Attaches the rendered table so header groups can be measured. |
| `onScroll` | `(event: unknown) => void` | Forwards scrolling from the renderer's scrollable table body. |
| `useBeforeUnmount` | `() => void` | Releases row IDs and the table identifier. |

## Renderer contract


Always register `m.useBeforeUnmount` in the framework renderer. Do not create
table identifiers in a framework-specific hook: a mediator-owned ID makes the
same accessibility contract portable to every supported renderer.

## Body scrolling

Renderers should attach `m.onScroll` to the scrollable element that contains the
table body. The core mediator deliberately forwards the event without assuming
a browser event type, so each renderer can use its native event while consumers
can implement behaviors such as infinite loading.

## React renderer contract

The renderer preserves the core contract while adapting it to React:

- the forwarded ref targets the renderer's HTMLTableElement root or control element;
- callback props remain regular React callbacks with the argument order defined
  by the core mediator;
- default content uses ordinary children; named slots use Template with a
  name prop when the core contract documents named slots;
- the internal cls prop resolves the public CSS-module classes and is usually
  supplied by the application extension.

The complete source-of-truth contract is maintained in the
[components-core Table documentation](@pastweb/components-core/Table/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Table as R } from '@pastweb/react-components/Table';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Table/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Table = forwardRef<HTMLTableElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Table } from '@/react/components/Table';

type TableProps = ComponentProps<typeof Table>;

export function MyComponent(props: TableProps) {
  return <Table {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Table.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.
