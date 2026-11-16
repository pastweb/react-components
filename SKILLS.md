# `@pastweb/react-components` implementation skills

This document contains workflow specific to React component renderers. The
general Pastweb rules are inherited from [`../tools/SKILLS.md`](../tools/SKILLS.md)
and the React integration rules from [`../react/SKILLS.md`](../react/SKILLS.md);
do not duplicate or weaken those documents here.

## Start from the core contract

1. Read the matching `@pastweb/components-core/<Component>` README, public
   types, mediator, utilities, styles, and tests before changing a renderer.
2. Identify whether a change belongs in the shared mediator or only at the React
   boundary. Put state transitions, event semantics, validation, IDs, defaults,
   and accessibility relationships in `components-core`.
3. Preserve the core prop names, default behavior, callback ordering, context
   keys, slot names, IDs, and optional-value semantics.
4. Update the renderer, local barrel, package exports, Storybook example, and
   focused tests together when a public rendering API changes.

## Implement the renderer

- Follow the `p`, `m`, optional `s`, `c` declaration order defined in `AGENTS.md`.
  Refs, slots, effects, and derived render values follow that initialization.
- Use `withDefaultProps`, `useMediator`, `useRef`, `useMounted`, and
  `useBeforeUnmount` from `@pastweb/react`. Do not reproduce their lifecycle or
  ref-bridge behavior in a component.
- Keep render functions pure. A JSX event adapter may call a mediator method,
  but must not duplicate mediator state changes, validation, or event ordering.
- Forward refs only to the element required by the public contract. Keep
  renderer-only refs out of `components-core` and preserve callback/object ref
  compatibility through the React bridge.
- Render normalized mediator state directly for semantic and ARIA attributes.
  Do not coerce or rederive values that the mediator already normalized.
- Use the exact component and relationship IDs supplied by the mediator, and
  pair every mediator mount, listener, timer, portal registration, and cleanup.
- Keep shared component styles in `components-core`. This package may compose
  public style modules in Storybook but must not copy or redefine component CSS.

## Slots and contexts

- Use `Slots`, `Template`, and `useSlots` from `@pastweb/react` for slot
  semantics. Keep React-node conversion and fallback rendering at this boundary.
- Preserve the semantic wrapper around every custom slot. Full-control content
  still receives the required role, label, ID, keyboard handlers, ref, and ARIA
  relationships from the core contract.
- When descendants need live mediator commands or state, provide the shared
  mediator context and expose the documented `use<ComponentName>Context` hook.
  Do not tunnel component commands through slot props.
- Keep context values stable when consumers subscribe by identity and clean up
  providers, portals, and window-manager registrations on unmount.

## Storybook workflow

- Keep stories and MDX under `stories/<Component>/`; keep the published build
  scoped to `src/`.
- Define executable variants in `<Component>.stories.tsx` and attached docs in
  `<Component>.mdx`. Story-only renderer components belong under
  `stories/<Component>/components/<Component>/` with local types and barrels.
- In MDX, show implementation files through `?raw` imports and `Source` inside
  `TabsView` aliased as `Tabs`; set implementation tab height to `auto`.
- Use renderer-specific preview headings and story names. Composite components
  need complete parent-context examples for each public subcomponent.
- Declare controls in the order `Shared css Modules`, `Utility Classes`, then
  `Props`. Use `cl.setClasses(...)` from `@pastweb/tools` and the matching
  public style module from `@pastweb/components-core`.
- Load shared preview variables and document styles once from
  `.storybook/preview.scss`; never recreate component styles in a story.
- Keep MDX usage examples copyable, import renderer examples from the documented
  package path, and identify any shared mediator contract they demonstrate.

## README and adapter code-snippet standard

Keep React renderer examples consistent and directly reusable:

- Use two-space indentation in TSX and TypeScript examples.
- Group React, renderer, application utility, and local type imports together in
  that order. Leave one blank line before CSS module imports.
- Import the matching component stylesheet as a module from the public
  `@pastweb/components-core` contract. Use the nested style module for a nested
  renderer.
- Call `cl.setClasses(classes)` immediately after the stylesheet import and
  leave one blank line before exporting the adapter component.
- When an application adapter has the same name as the package renderer, alias
  the renderer import (for example, `Accordion as A`) to make the wrapper
  boundary explicit.
- Keep `forwardRef`, the normalized props, `ref`, `cls={cls}`, and the renderer
  invocation visible in the adapter example. Do not hide the style or ref bridge
  behind an unrelated helper.
- Keep a blank line between import groups and initialization groups; do not
  combine style imports or class-processor setup with unrelated declarations.
- Show callback-prop and renderer-event support together whenever both are part
  of the public contract, preserving the core argument order.
- Copy CSS utility-class documentation from the matching
  `@pastweb/components-core/<Component>/README.md` only when that core README
  defines public utilities. Do not document application-level theme, size, or
  layout classes in renderer READMEs. Internal renderer state classes may be
  described separately when they are part of the rendering contract.
- Use `@pastweb/components-core/<Component>/README.md` when referencing the
  shared documentation from a renderer README. Keep workspace-relative source
  paths out of published package documentation.

## Tests and verification

- Use Vitest, React Testing Library, and `user-event` for rendered behavior.
  Prefer accessible roles, names, states, and keyboard interaction over class or
  implementation-detail assertions.
- Every interactive renderer should cover its accessible name and role,
  keyboard operation, focus/ref behavior, disabled or unavailable behavior,
  ARIA relationships, controlled/uncontrolled changes, and custom slots where
  applicable. Add Axe checks and real-browser coverage when jsdom cannot verify
  the behavior.
- Keep tests under `tests/<feature>/<feature>.<environment>.test.tsx` or `.ts`,
  using `.node.test.*` for renderer-independent behavior and `.web.test.*` for
  DOM behavior. Use `given..., when..., then...` test titles.
- Run focused tests first, then `pnpm test --run`, type validation, package
  build, and Storybook build when the change affects stories or exports.
  Investigate failures rather than masking them with casts or skipped tests.

## Review checklist

Before handoff, verify:

- the renderer follows the core mediator contract and initialization order;
- refs, effects, listeners, timers, contexts, and portals clean up correctly;
- JSX preserves semantic and accessibility requirements;
- no component styles or private implementation details were copied here;
- package exports, peer dependencies, Storybook imports, and public examples are
  accurate; and
- focused tests, the full suite, type checks, builds, and Storybook validation
  pass or their environmental blockers are documented.
