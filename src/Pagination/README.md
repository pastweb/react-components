# Pagination React renderer

@pastweb/react-components/Pagination renders the framework-neutral Pagination contract from
@pastweb/components-core/Pagination as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Pagination provides bounded navigation through a known number of result pages.
Its rendering contract targets WCAG 2.2 Level AA and follows GOV.UK pagination
guidance for landmarks, current-page identification, and page naming.

## When to use

Use Pagination when a collection is split into stable, addressable pages. Prefer
“load more” when preserving context matters more than direct page access. Do not
use it for linear form journeys; use a continue action and a back link instead.
Do not show pagination when there is only one page. Keep the current page
synchronized with the URL when pages are navigable resources.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, and state classes. |
| `total` | `number` | yes | - | Supplies the number of pages. Values are floored and clamped to zero or greater. |
| `current` | `number` | yes | - | Supplies the current one-based page. It is clamped to the available range. |
| `ariaLabel` | `string` | no | `"Pagination"` | Names the navigation landmark. Pass an empty string to omit the name. Provide a unique name when more than one pagination control is on the page. |
| `disabled` | `boolean` | no | - | Makes every navigation action unavailable. |
| `onChange` | `(page: number) => void` | no | noop | Reports a valid changed page. |
| `className` | `string` | no | `""` | Adds classes to the navigation root. |
| `prev` | `unknown` | no | `◄` | Supplies previous visual content. |
| `next` | `unknown` | no | `►` | Supplies next visual content. |
| `prevAriaLabel` | `string` | no | `"Previous page"` | Names the previous control. |
| `nextAriaLabel` | `string` | no | `"Next page"` | Names the next control. |
| `pageAriaLabel` | `(page: number) => string` | no | `Page N` | Names a numbered page control. |
| `jumpBackAriaLabel` | `string` | no | `"Jump backward through pages"` | Names the backward ellipsis jump control. |
| `jumpForwardAriaLabel` | `string` | no | `"Jump forward through pages"` | Names the forward ellipsis jump control. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized navigation name. Empty labels are omitted. |
| `current` | `number` | Clamped one-based page. Renderers use this for `.is-active` and `aria-current="page"`. |
| `isDisabled` | `true \| undefined` | Is `true` when every action is unavailable; otherwise omitted. Renderers use this value directly for `.is-disabled` and page-control `disabled`. |
| `isNextDisabled` | `true \| undefined` | Is `true` when next is unavailable; otherwise omitted. |
| `isPrevDisabled` | `true \| undefined` | Is `true` when previous is unavailable; otherwise omitted. |
| `pages` | `PaginationItem[]` | Visible numbered pages and ellipsis jump controls. |

## Utility classes

Apply these classes through `className`.

| Class | Description |
|---|---|
| `is-rounded` | Uses the rounded control radius token. |
| `is-full-width` | Expands the navigation to the available width. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Pagination_button_default_margin` | `button` | `default` | `margin` | `var(--pw_margin)` | Control spacing. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_padding` | `button` | `default` | `padding` | `var(--pw_padding)` | Control inner spacing. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_background-color` | `button` | `default` | `background-color` | `var(--pw_background-color)` | Control background. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_border-color` | `button` | `default` | `border-color` | `var(--pw_border-color)` | Control border colour. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_border-width` | `button` | `default` | `border-width` | `var(--pw_border-width)` | Control border width. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_border-style` | `button` | `default` | `border-style` | `var(--pw_border-style)` | Control border style. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_border-radius` | `button` | `default` | `border-radius` | `var(--pw_border-radius)` | Control corner radius. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_rounded_border-radius` | `button` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Rounded control radius. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_color` | `button` | `default` | `color` | `var(--pw_text_strong_color)` | Control foreground. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_font-size` | `button` | `default` | `font-size` | `var(--pw_font-size)` | Control text size. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_font-weight` | `button` | `default` | `font-weight` | `var(--pw_semibold_font-weight)` | Control text weight. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_line-height` | `button` | `default` | `line-height` | `var(--pw_line-height)` | Control line height. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_default_transition-duration` | `button` | `default` | `transition-duration` | `var(--pw_transition-duration)` | Visual state duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Pagination_button_disabled_opacity` | `button` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled control opacity. | Web, Capacitor, NativeScript |
| `--pw_Pagination_button_hover_box-shadow` | `button` | `hover` | `box-shadow` | shared inset shadow | Hover treatment. | Web, Capacitor |
| `--pw_Pagination_button_focus_box-shadow` | `button` | `focus` | `box-shadow` | shared focus shadow | Keyboard focus treatment. | Web, Capacitor |
| `--pw_Pagination_page_default_margin` | `page` | `default` | `margin` | shared page margin | Page-control spacing. | Web, Capacitor, NativeScript |
| `--pw_Pagination_page_active_color` | `page` | `active` | `color` | strong text colour | Current-page foreground. | Web, Capacitor, NativeScript |
| `--pw_Pagination_page_active_font-weight` | `page` | `active` | `font-weight` | bold | Current-page weight. | Web, Capacitor, NativeScript |
| `--pw_Pagination_page_active_background-color` | `page` | `active` | `background-color` | control background | Current-page background. | Web, Capacitor, NativeScript |


## Keyboard interaction

- Previous, next, page, and jump controls are native buttons and are operable
  with `Enter` or `Space` when available.
- `Tab` and `Shift+Tab` move through available controls in document order.
- Disabled controls, including previous on the first page and next on the last
  page, are not operable.

## Accessibility notes

- The component is a named navigation landmark containing native buttons in a
  list. Native buttons are used because page changes are reported through
  `onChange` rather than URL navigation.
- The current numbered control exposes `aria-current="page"`.
- Ellipses are explicit jump controls with meaningful accessible names, not
  mislabeled page numbers. GOV.UK treats ellipses as non-interactive; this
  contract keeps them operable so skipped ranges remain reachable by keyboard.
- Previous and next remain in the layout and become native-disabled at the ends
  of the range. All controls also mirror the disabled component state.
- Shared web styles provide at least a 44 by 44 CSS-pixel target, visible focus,
  forced-colours treatment, and reduced-motion behavior.

## Known limitations

- Automated accessibility checks do not by themselves establish WCAG
  conformance.


## React renderer contract

The renderer preserves the core contract while adapting it to React:

- the forwarded ref targets the renderer's HTMLElement root or control element;
- callback props remain regular React callbacks with the argument order defined
  by the core mediator;
- default content uses ordinary children; named slots use Template with a
  name prop when the core contract documents named slots;
- the internal cls prop resolves the public CSS-module classes and is usually
  supplied by the application extension.

The complete source-of-truth contract is maintained in the
[components-core Pagination documentation](@pastweb/components-core/Pagination/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Pagination as R } from '@pastweb/react-components/Pagination';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Pagination/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Pagination = forwardRef<HTMLElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Pagination } from '@/react/components/Pagination';

type PaginationProps = ComponentProps<typeof Pagination>;

export function MyComponent(props: PaginationProps) {
  return <Pagination {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Pagination.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA landmark regions: https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/
- GOV.UK pagination: https://design-system.service.gov.uk/components/pagination/
