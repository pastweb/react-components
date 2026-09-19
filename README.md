# @pastweb/react-components

`@pastweb/react-components` is the React rendering package for the shared
component contracts in [`@pastweb/components-core`](../components-core/README.md).
It turns the framework-neutral mediators, accessibility rules, public types,
and XJS/XTS templates from components-core into React components while keeping
the shared behaviour in one place.

## Features

- **React-native rendering** — Provides React components, forwarded refs,
  lifecycle integration, slots, and contexts for Pastweb component contracts.
- **Shared behaviour** — Reuses the mediator logic, public props, keyboard
  interactions, and accessibility relationships defined by
  `@pastweb/components-core`.
- **SSR-aware integration** — Uses the public `@pastweb/react` primitives for
  mediator creation, context, slots, and mounted-element coordination.
- **Composable exports** — Exposes component groups through tree-shakeable
  entry points such as `@pastweb/react-components/Accordion`.
- **Styles remain shared** — Imports component CSS modules from
  `@pastweb/components-core`; this package does not duplicate component styles.

## Installation

```bash
pnpm add @pastweb/react-components @pastweb/components-core @pastweb/react react react-dom
```

The renderer expects the corresponding `@pastweb/components-core` component
styles and a `cls` function that maps component part names to those styles.

## Documentation Overview

Each component has an interactive Storybook page with React usage, public
props, accessibility notes, executable controls, and the story renderer source.
Run the documentation locally with:

```bash
pnpm storybook
```

The package is organised by component. Each component directory contains its
React renderer, renderer-specific types, constants when needed, and context
hooks for composing custom descendants.

## Summary

- React renderers for `@pastweb/components-core`
- Shared mediator behaviour and accessibility semantics
- React refs, lifecycle hooks, slots, and contexts through `@pastweb/react`
- Interactive component documentation in Storybook
