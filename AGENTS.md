# `@pastweb/react-components` contribution guide

## Package identity

`@pastweb/react-components` contains React renderers for the public,
framework-neutral component contracts in `@pastweb/components-core`. It owns
React rendering, lifecycle, refs, slots, context, and Storybook integration; it
must not duplicate mediator behavior or component styles.

Apply the inherited public-package guidance from:

- [`../tools/AGENTS.md`](../tools/AGENTS.md) and
  [`../tools/SKILLS.md`](../tools/SKILLS.md) for shared architecture, helpers,
  APIs, documentation, tests, and release safety.
- [`../react/AGENTS.md`](../react/AGENTS.md) and
  [`../react/SKILLS.md`](../react/SKILLS.md) for React hooks, refs, JSX,
  contexts, portals, stores, SSR, and React testing.

This package adds only the renderer- and Storybook-specific rules below.

## Architectural boundaries

- Read the matching `@pastweb/components-core` README, types, mediator, and
  tests before implementing or changing a renderer.
- Keep state transitions, validation, event ordering, IDs, accessibility
  contracts, and default behavior in `components-core`.
- Keep React-specific JSX, refs, lifecycle effects, context bridges, and slot
  conversion in this package.
- Do not import private or closed-source packages, and do not copy private
  architecture or application logic into this public package.
- Do not import, bundle, export, or own component CSS/SCSS here. Renderers must
  consume the public style contracts from `@pastweb/components-core` or the
  application integration layer.

## Renderer implementation standards

- Start every component with normalized props and its mediator in this exact
  order: `p`, then `m`. If the mediator exposes state, declare `const s =
  m.state` immediately after `m`; derive context as `c` immediately after `s`,
  or immediately after `m` when there is no state.

  ```tsx
  function MyComponent(props: MyComponentProps) {
    const p = withDefaultProps<MyComponentDefaultProps>(props, DEFAULT_PROPS);
    const m = useMediator<MyComponentMediator>(myComponentMediator, p);
    const s = m.state;
    const c = m.getContext();

    // Refs, slots, effects, and JSX follow.
  }
  ```

- Pass `p` to `useMediator` only when the mediator consumes props. Normalize `p`
  first when JSX needs it even if the mediator has no props parameter.
- Keep invariant roles, element types, tab indices, and other static attributes
  directly in JSX. Do not add them to mediator state only for rendering.
- Keep class composition in JSX when it depends only on local props or state.
  Render mediator-owned complete class composition directly when it includes
  inherited context, positioning, or coordinated values.
- Consume normalized mediator state directly for roles, labels, disabled,
  busy, selected, and other ARIA-facing values. Preserve `undefined` so React
  omits optional attributes.
- Use `useRef` and `useMounted` from `@pastweb/react`, never renderer-local
  ref/lifecycle substitutes. Pair mediator cleanup with
  `useBeforeUnmount(m.useBeforeUnmount)` where the contract provides it.
- Keep behavior in the mediator. JSX handlers may adapt a native event and call
  the mediator, but must not duplicate state transitions or validation.

## Accessibility and usability

- Treat WCAG 2.2 Level AA as the minimum target and follow the relevant WAI-ARIA
  APG pattern, the `components-core` contract, and GOV.UK guidance where an
  equivalent component exists.
- Prefer native HTML semantics over reconstructed ARIA widgets. Preserve
  accessible names, roles, values, relationships, keyboard behavior, focus
  restoration, and visible focus treatment.
- Use mediator-provided IDs directly. Do not create a second renderer-owned ID,
  reformat a mediator ID, or replace required ARIA relationships.
- Preserve the required semantic shell around custom slots. A slot must not
  remove required headings, controls, IDs, ARIA attributes, keyboard handlers,
  or focus behavior.
- Keep inactive, collapsed, and modal content out of the active tab order and
  assistive-technology tree according to the core contract. Do not hide focused
  content with `aria-hidden`.
- Respect reduced-motion and forced-colors behavior defined by shared styles.
  Automated accessibility checks do not by themselves establish WCAG
  conformance.

References: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/), and [GOV.UK Design System components](https://design-system.service.gov.uk/components/).

## Storybook organization

- Keep Storybook files in `stories/<Component>/` outside the published `src/`
  tree. The library build must remain scoped to `src/`.
- Use `<Component>.stories.tsx` for executable stories and `<Component>.mdx`
  for attached documentation, canvases, and controls.
- Story-only renderers belong in
  `stories/<Component>/components/<Component>/`, with local `types.ts` and
  `index.ts` barrels. Re-export the component group from
  `stories/<Component>/components/index.ts`.
- In MDX usage examples import the documented renderer from
  `@/react/components/<Component>` and name the example function `MyComponent`.
  Import integration primitives such as `Template` from their own package.
- Organize MDX as metadata, component introduction, implementation source,
  then a named renderer preview with `Canvas` and `Controls`. Prefix preview
  headings with the renderer name and export stories using that renderer name.
- Give public subcomponents their own story files, implementation sections, and
  preview stories. A subcomponent story must render the complete parent context
  and bind controls only to the first child instance.
- Use Storybook `TabsView` locally as `Tabs`, import exact implementation files
  with Vite's `?raw` suffix, render each with `Source`, and set
  `style={{ height: 'auto' }}` on implementation tabs.
- Group Storybook styling controls under the exact `Shared css Modules` and
  `Utility Classes` categories, in that order before `Props`. Use
  `cl.setClasses(...)` from `@pastweb/tools` and import component style modules
  only from `@pastweb/components-core/<Component>/style.module.scss`.
- Load shared Storybook foundations once from `.storybook/preview.scss` using
  the public `@pastweb/tools` and `@pastweb/components-core` style variables.
  Do not recreate component styles in Storybook preview files.

## Related guidance

Detailed package-specific workflows are in [`SKILLS.md`](./SKILLS.md). General
helper organization, mediator design, API compatibility, documentation,
testing, and release rules remain inherited from `@pastweb/tools` and
`@pastweb/react`.
