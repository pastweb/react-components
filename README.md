# @pastweb/react-components

`@pastweb/react-components` is the React rendering package for the shared
component contracts in [`@pastweb/components-core`](https://www.npmjs.com/package/@pastweb/components-core).
It turns the framework-neutral mediators, accessibility rules, public types,
and XJS/XTS templates from components-core into React components while keeping
the shared behaviour in one place.

## Features

- **React rendering** — Provides React components, forwarded refs,
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

Install the React renderer package:

```bash
pnpm add @pastweb/react-components
# or
npm install @pastweb/react-components
# or
yarn add @pastweb/react-components
```

`@pastweb/react` and `@pastweb/components-core` are peer dependencies. The
renderer expects the shared component styles and a `cls` function that maps
component part names to those styles.

## Accessibility standards

Components use native HTML elements whenever the browser already provides the
required semantics and keyboard behavior. Buttons, inputs, links, labels,
headings, landmarks, dialogs, and form controls preserve their native behavior
instead of recreating it with generic elements and ARIA roles.

The renderers follow **WCAG 2.2 Level AA**, the relevant **WAI-ARIA Authoring
Practices** pattern, and applicable **GOV.UK Design System** guidance. They
provide accessible names and relationships, synchronize ARIA state with
component state, preserve focus order, and support keyboard operation. Shared
styles respect reduced-motion and forced-colors preferences.

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

## Licence

This package is distributed under the MIT License. See the
[LICENSE](https://github.com/pastweb/react-components-core/blob/master/LICENSE)
file for the complete terms.
