# Agent Instructions

This package is open source.

## Scope

`react-components` contains the React renderers for the public component
contracts and mediator logic provided by `@pastweb/components-core`. It translates
the framework-neutral XJS/XTS templates documented by each core component into
React components without owning shared component behavior or styles.

The corresponding `components-core` README template is the canonical rendering
and accessibility contract. React renderers must implement it using native React
DOM semantics and SSR-safe patterns.

## General Rules

- Start every component definition by normalizing props and creating the mediator in that exact order: `p`, then `m`. When the mediator exposes state, declare `const s = m.state;` immediately after `m`. Derive context as `c` immediately after `s`, or immediately after `m` when there is no state. Do not insert refs, slot setup, computed renderer values, effects, or other declarations into this initialization sequence.

  ```tsx
    function MyComponent(props: MyComponentProps) {
      const p = withDefaultProps<MyComponentDefaultProps>(props, DEFAULT_PROPS);
      const m = useMediator<MyComponentMediator>(myComponentMediator, p);
      const s = m.state;
      const c = m.getContext();

    // Refs, slots, effects, and rendering follow.
  }
  ```

- Pass `p` to `useMediator` only when the mediator declares and consumes props.
  When the mediator has no props parameter, still normalize `p` first when the
  rendering template needs it, but call `useMediator(mediator)` without a
  second argument. Do not pass unused renderer props into a mediator merely for
  consistency with other components.
- Keep invariant rendering attributes hardcoded in the JSX template when they
  are not calculated, normalized, or updated by the mediator. Static roles,
  native element types, fixed tab indices, and similar constants must not be
  added to mediator state solely so the renderer can read them back.
- Keep class-name composition in JSX when classes depend only on local prop
  values or normalized state properties, such as a base class,
  `p.className`, and local `is-*` classes. When the shared mediator exposes a
  complete `s.className` because composition includes inherited parent classes,
  positioning helpers, context values, or other coordinated inputs, render
  `className={s.className}` directly. Do not duplicate, append, or partially
  recompute mediator-owned class composition in the React template.

- When a component consumes context rather than providing mediator context, keep the same `p`, `m`, optional `s`, `c` declaration order and assign `c` with the appropriate context hook. Shared mediators must accept normalized component props rather than requiring a React context value during construction.
- When custom descendants or replacement-slot content need component-owned
  commands or live mediator state, provide the mediator context under its shared
  context key and expose a public `use<ComponentName>Context` hook. Do not pass
  those methods or state values through `Slot` props; custom slot content must
  consume the hook instead. Keep `Slot` props only for renderer-specific or
  invocation-specific values that the shared component context cannot provide.
  Export the context type used by every public context hook and include a TSDoc
  example showing a custom descendant consuming it.
- Consume normalized semantic and accessibility values directly from mediator
  state. Do not rederive `role`, accessible labels, disabled state, busy state,
  or other ARIA-facing values from `p` when the mediator exposes them through
  `s`.
- Preserve mediator `undefined` values so React omits optional attributes and
  properties. Do not add renderer-side `|| undefined`, boolean coercion, or
  equivalent ternaries to already normalized state such as `s.role`,
  `s.ariaLabel`, or `s.isDisabled`.
- Use the same normalized state value for every representation of one semantic
  state, including its root `is-*` class, native property, and corresponding
  ARIA attribute. Tests must cover both the active value and omission in the
  inactive state.
- Import `useRef` from `@pastweb/react`, not from React. Read and write its referenced value through `.value`, never `.current`; the compatibility `.current` property exists for React ref attachment only.
- Import `useMounted` from `@pastweb/react`. When mounted element or view references support shared behavior, pass only the required references to the mediator's `useMounted` method; shared effects and reference coordination belong in the mediator.
- Register mediator cleanup methods with the matching `@pastweb/react` hook, for example `useBeforeUnmount(m.useBeforeUnmount)`.
- Helper functions must include TSDoc with at least one `@example` block when they are exported or moved into shared utility files.
- If a helper function needs helper-specific constants or types, make that helper a directory with an `index.ts` barrel, a `constants.ts` file, and a `types.ts` file.
- Type exported object constants, including `DEFAULT_PROPS`, on the declaration itself. Put the type immediately after the constant name. Do not use a trailing `satisfies` clause.
- In a mediator file, put value imports first and all `import type` statements last.
- If `utils.ts` grows over 200 lines, replace it with a `utils/` directory containing an `index.ts` barrel and one file per helper function, named after the exported helper.
- If a function file grows over 50 lines because it contains helper functions, move those helpers into a sibling `utils.ts` file and import them from there.
- README files must follow the `open-source/tools` README style: short package description, `## Features`, multi-manager `## Installation` when installable, `## Documentation Overview`, `## Summary`, then API sections with syntax, parameters, returns, examples, and notes where useful.
- In README documentation and TSDoc examples, when importing from `@pastweb/tools`, prefer the `@pastweb/tools` root import whenever the documented symbol is exported from the root package; use subpath imports only for symbols that are not root-exported or when documenting a subpath-specific entrypoint.
- Test titles must use the `given..., when..., then...` convention.
- Use `.node.test.ts` for Node tests and `.web.test.ts` for DOM/jsdom tests.
- Use Vitest for tests. Import test helpers from `vitest` and use `vi` for mocks.
- Put tests in `tests/<feature>/<feature>.<environment>.test.ts`, matching the convention used by `open-source/tools`.
- Do not import from `../../closed-source/`.
- Keep shared component behavior in `components-core`; keep only React rendering, lifecycle, ref, context, and integration behavior here.
- Do not duplicate or override mediator rules in a renderer when the behavior belongs in the framework-neutral contract.
- Do not import, bundle, export, or own component CSS/SCSS in this package.
- Keep documentation safe for public release.

## Accessibility and Usability Standard

- Treat WCAG 2.2 Level AA as the minimum accessibility target.
- Follow the relevant WAI-ARIA Authoring Practices Guide pattern and the semantic and behavioral contract documented by `components-core`. Use the GOV.UK Design System as additional public-service usability guidance where an equivalent component exists.
- Prefer native HTML elements over elements with reconstructed ARIA roles. Do not render a clickable `div`, `span`, or `header` when a native `button` or link supplies the required semantics and keyboard behavior.
- Render correct accessible names, roles, values, states, and relationships. Keep ARIA state synchronized with mediator state on every render.
- Use the component and relationship IDs exposed by the shared mediator. Do
  not create a second renderer-owned ID with React `useId`, append renderer
  suffixes, or reformat mediator IDs. Map mediator IDs directly to DOM
  properties and call the mediator's `useBeforeUnmount` cleanup hook.
- Use semantic heading levels and document structure. When a component supports a configurable heading level, render the corresponding native heading element.
- Ensure all interaction is operable by keyboard. Prefer native control keyboard behavior; implement additional WAI-ARIA pattern keys only when required by the core contract.
- Preserve normal tab order and visible `:focus-visible` treatment. If closing content contains focus, restore focus to the appropriate visible control before or as the content becomes unavailable.
- Collapsed or inactive content must not remain focusable or exposed as active content. Coordinate `hidden`, `inert`, conditional rendering, and transition state as required by the core contract; do not use `aria-hidden` on focusable content as a substitute.
- Decorative icons must use `aria-hidden="true"` and must not add noise to the accessible name. Meaningful images and icons need an accessible alternative.
- Preserve the required semantic shell around slots. Custom content slots must not remove headings, controls, IDs, ARIA attributes, keyboard handlers, or focus behavior. Full-control render slots must receive all required props and refs.
- Forward supported native HTML attributes and refs to the documented element without allowing consumers to silently replace required accessibility state.
- Respect `prefers-reduced-motion` and `forced-colors` behavior defined by shared styles. React behavior and tests must not require an animation to run when reduced motion is requested.
- Do not add repeated `role="region"` landmarks by default. Render optional landmarks only when the core contract enables them.
- Do not claim that a component or package is WCAG compliant solely because automated accessibility tests pass.

## React Testing Rules

- Test public behavior through accessible roles, names, states, and user interaction rather than primarily through implementation classes or DOM traversal.
- Prefer Testing Library `getByRole` queries and `user-event` for keyboard and pointer interaction. Use class assertions only for visual-state behavior that has no semantic equivalent.
- Every interactive component test suite must cover its accessible name and role, keyboard operation, focus behavior, disabled or unavailable behavior, and state-related ARIA attributes.
- Test ID relationships and uniqueness when a component uses `aria-controls`, `aria-labelledby`, `aria-describedby`, or similar references.
- Test that collapsed, hidden, modal, or inactive content cannot be reached incorrectly by keyboard navigation.
- Add automated Axe checks for rendered accessibility rules and real-browser tests for behavior that jsdom cannot validate, while retaining manual keyboard and assistive-technology verification as a release requirement for new interaction patterns.
- Test custom slots to ensure they preserve the required semantic wrapper and accessible behavior.
- When a custom slot consumes a component context hook, test its command
  behavior and the React update produced by at least one live context value.
- Where relevant, verify reduced-motion, RTL, forced-colours-compatible state hooks, controlled props, uncontrolled defaults, and change callbacks.

## Storybook Rules

- Keep Storybook outside the published `src/` tree in the package-level
  `stories/<Component>/` directory. For example:

  ```txt
  stories/
    Accordion/
      Accordion.mdx
      Accordion.stories.tsx
      AccordionPanel.stories.tsx
      components/
        index.ts
        Accordion/
          Accordion.tsx
          index.ts
          types.ts
          AccordionPanel/
            AccordionPanel.tsx
            index.ts
            types.ts
  ```

  Configure Storybook to discover `../stories/**/*.mdx` and
  `../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`. Keep the library build
  scoped to `src/`; include `stories/` only in TypeScript validation.

- Define executable stories and variants in `<Component>.stories.tsx` using
  Component Story Format. Use `<Component>.mdx` for the component's attached
  documentation page, live canvases, and controls.
- In every MDX `React usage` example, import the documented component from
  `@/react/components/<Component>` and name the example function
  `MyComponent`. Keep imports for shared React integration primitives, such as
  `Template`, from their own package.
- Keep story-only React renderers in
  `stories/<Component>/components/<Component>/`. Put the root renderer, its
  story-facing prop types, and its barrel export in that directory. Give each
  public subcomponent its own nested directory containing
  `<Subcomponent>.tsx`, `types.ts`, and `index.ts`. Re-export the complete
  component group from `stories/<Component>/components/index.ts`.
- Define story-facing prop types in the component group's `types.ts` file. Base
  them on the public renderer props and omit integration-only properties such
  as `cls` when the story wrapper supplies those properties internally.
- Organize each component MDX page in this order: the attached `Meta` block,
  component title and introductory description, root implementation section,
  then the root preview section containing its `Canvas` and `Controls`.
- Prefix every preview heading with the renderer name, using
  `<RendererName> Preview` rather than a generic `Preview` heading.
- Name each exported preview story after the renderer, such as `Accordion` or
  `AccordionPanel`, rather than exporting a generic `Preview` story. Alias the
  imported story renderer as `<RendererName>Component` when its local binding
  would otherwise conflict with the story export.
- For a composite component with public subcomponents, give every subcomponent
  its own `<Subcomponent>.stories.tsx` file and its own implementation and
  preview sections in the parent component's MDX page. Organize each
  subcomponent section like the root component section: implementation source,
  named preview canvas, then controls.
- A subcomponent story must render the same complete composite example as the
  root story so the subcomponent has its required parent context. Bind the
  subcomponent story args only to the first child instance; keep the remaining
  child instances fixed so controls demonstrate their effect in context.
- Name implementation headings `<RendererName> implementation`. Use
  Storybook's `TabsView` under the local MDX name `Tabs`, with one source tab
  for every implementation file such as `<RendererName>.tsx`, `types.ts`,
  `constants.ts` when present, and `index.ts`. Import each exact story-renderer
  file with Vite's `?raw` suffix and render it with `Source`; do not manually
  duplicate implementation code inside MDX. Set `style={{ height: 'auto' }}`
  on every implementation `Tabs` block so it follows the source height instead
  of creating a large gap before the preview.
- When a story exposes utility-class controls, group them under the one-line
  `Utility\u00a0Classes` category and render that category before `Props`.
  Declare utility values before default/component props in the story's `args`
  object because Storybook uses argument insertion order to determine category
  order. Keep the ordinary `className` control in `Props`; utility controls are
  additional controls that add or remove their class in the preview.
- Import component-specific CSS modules from
  `@pastweb/components-core/<Component>/style.module.scss`. Nested components
  must use their own corresponding module, such as
  `@pastweb/components-core/Accordion/AccordionPanel/style.module.scss`.
- Create each story renderer's `cls` function with `cl.setClasses(...)` from
  `@pastweb/tools`, following the public React project integration pattern.
- Load shared preview foundations once from `.storybook/preview.scss`. It must
  use the `@pastweb/tools` CSS variables and document styles together with the
  `@pastweb/components-core` CSS variables.
- Do not recreate component styles in Storybook preview files. Preview styles
  may only compose the shared public SCSS foundations required by every story.
- Keep Storybook files excluded from the published library build and ensure
  both the static Storybook build and TypeScript validation pass after changes.

## Standards References

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/patterns/
- GOV.UK Design System components: https://design-system.service.gov.uk/components/
