# Tabs React renderer

@pastweb/react-components/Tabs renders the framework-neutral Tabs contract from
@pastweb/components-core/Tabs as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Tabs switches between related sections of content in the same view. Its
rendering contract follows the WAI-ARIA Tabs pattern with automatic activation
and targets WCAG 2.2 Level AA.

## When to use

Use Tabs when users need to switch among a small set of related panels without
leaving the page. Do not use Tabs for site navigation, for a sequence of form
questions, or when users must compare two sections at once. Prefer separate
pages, headings with in-page links, or an accordion when those are simpler.
Keep labels short. Put a heading that repeats the tab label at the start of
each panel.

## Tabs props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component, part, state, and utility classes. |
| `activeTab` | `number` | no | `0` | Controls the active zero-based index. |
| `ariaLabel` | `string` | no | `"Tabs"` | Names the tab list. An explicit empty string omits the label. |
| `className` | `string` | no | `""` | Adds root classes, including utilities that determine layout and inherited descendant styling. |
| `disabled` | `boolean` | no | - | Disables all Tab controls and applies `is-disabled` to the root. |
| `onChange` | `(index: number) => void` | no | noop | Reports requested selection changes. |

## Tab props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves the Tab part, state, and inherited utility classes. |
| `ariaLabel` | `string` | no | - | Supplies an accessible name when the visible label is insufficient. |
| `className` | `string` | no | `""` | Adds classes to this Tab list item. |
| `disabled` | `boolean` | no | - | Makes this Tab unavailable for activation and keyboard selection. |
| `onClick` | `() => void` | no | noop | Reports successful activation after the Tabs mediator updates selection. |

## Mediator state

### Tabs state

| Property | Type | Description |
|---|---|---|
| `activeTab` | `number` | Current normalized zero-based active index. |
| `ariaLabel` | `string \| undefined` | Normalized tab-list accessible label. |
| `className` | `string` | Utility classes inherited by Tab mediators and applied to generated panels. |
| `isDisabled` | `true \| undefined` | Normalized root disabled state. |
| `orientation` | `'horizontal' \| 'vertical'` | Orientation derived from positioning utility classes. |

### Tab state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Optional normalized accessible name. |
| `className` | `string` | Complete Tab class name, including active, disabled, local, and inherited utility classes. |
| `controlsId` | `string` | ID of the corresponding tab panel. |
| `id` | `string` | Stable ID referenced by the corresponding panel. |
| `index` | `number` | Stable zero-based registration index. |
| `isActive` | `boolean` | Whether this Tab is selected. |
| `isDisabled` | `true \| undefined` | Normalized local or inherited disabled state. |
| `tabIndex` | `0 \| -1` | Roving tab-order value. |

## Tabs mediator context

`tabsMediator.getContext()` exposes live selection, the registered Tab props
array, relationship IDs, and navigation methods consumed by Tab mediators, the
Tabs renderer, and extensions through `useTabsContext`.

| Property or method | Type | Description |
|---|---|---|
| `activeTab` | `number` | Live active zero-based index. |
| `state` | `TabsState` | Live Tabs mediator state, including inherited class names and disabled state. |
| `tabs` | `TabDefaultProps[]` | Registered Tab props in visual order. |
| `consumeTabFocus` | `(index: number) => boolean` | Consumes a pending keyboard-focus request for a Tab index. |
| `getContentId` | `(index: number) => string` | Returns the stable panel relationship ID for an index. |
| `getTabId` | `(index: number) => string` | Returns the stable Tab relationship ID for an index. |
| `onTabKeyDown` | `(event: TabsKeyEvent, index: number) => void` | Applies orientation-aware roving keyboard navigation. |
| `registerTab` | `(props: TabDefaultProps) => number` | Stores Tab props in order and returns the Tab index. The props object identity is the registration key. |
| `setActiveTab` | `(index: number) => void` | Requests selection of an available Tab index. |
| `unregisterTab` | `(props: TabDefaultProps) => void` | Removes a Tab registration. Remaining indexes follow array order. |

## Slots

| Component | SlotName | Description | Default content |
|---|---|---|---|
| Tabs | `tabs` | Supplies ordered Tab controls inside the mediator-owned `tablist`. | Empty. |
| Tabs | `content` | Supplies matching panel children in the same order as the tabs. Tabs wraps each child in a `role="tabpanel"` container with the `tabContent` part class. | Empty. |
| Tab | default | Supplies the visible Tab label. | Empty. |

## Keyboard interaction

- `Tab` and `Shift+Tab` move sequential focus. The tab list contains one
  tab stop: the selected Tab. The next stop is the active panel when it has
  `tabindex="0"`, then focusable content inside that panel.
- Left and Right activate the previous or next enabled Tab in a horizontal
  list. Up and Down do the same in a vertical list. Navigation wraps.
- `Home` and `End` activate the first and last enabled Tab.
- `Enter` and `Space` activate the focused Tab through native button behavior.
- Disabled Tabs are skipped.

## Utility classes

Positioning classes are applied to the `Tabs` root through `className`; the
root stylesheet coordinates the generated list, tabs, and panels. Orientation
is derived from these classes for layout, `aria-orientation`, and arrow-key
navigation.

| Class | Result |
|---|---|
| `is-top`, `is-top-left` | List above the content, aligned to the start. |
| `is-top-right` | List above the content, aligned to the end. |
| `is-bottom`, `is-bottom-left` | List below the content, aligned to the start. |
| `is-bottom-right` | List below the content, aligned to the end. |
| `is-left`, `is-left-top` | List to the left of the content, aligned to the top. |
| `is-left-bottom` | List to the left of the content, aligned to the bottom. |
| `is-right`, `is-right-top` | List to the right of the content, aligned to the top. |
| `is-right-bottom` | List to the right of the content, aligned to the bottom. |
| `is-full-width` | Makes horizontal Tab labels share the full list width and vertical Tab labels share the full list height. |
| `has-vertical-labels` | On Tabs, gives every Tab a vertical writing mode when combined with an `is-left*` or `is-right*` utility. |
| `has-vertical-label` | On one Tab, gives only that label a vertical writing mode when combined with inherited `is-left*` or `is-right*` positioning. |
| `no-content-padding`, `no-padding` | Removes padding from every generated `tabContent` panel. |
| `no-content-border`, `no-border` | Removes borders from every generated `tabContent` panel. |

Left and right positioning utilities produce vertical Tabs using Up/Down arrow
keys. Top, bottom, and the default layout produce horizontal Tabs using
Left/Right arrow keys. Consumers do not set orientation separately. Tab buttons
remain horizontal unless `has-vertical-labels` is applied to Tabs or
`has-vertical-label` is applied to an individual Tab.

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Tabs_root_disabled_opacity` | root | disabled | `opacity` | `var(--pw_disabled_opacity)` | Opacity applied once when the complete Tabs component is disabled. | Browser, Capacitor |
| `--pw_Tabs_tab_default_background-color` | tab | default | `background-color` | `var(--pw_control_background-color)` | Background of an inactive tab. | Browser, Capacitor |
| `--pw_Tabs_tab_default_border-color` | tab | default | `border-color` | `var(--pw_border-color)` | Border colour of a tab. | Browser, Capacitor |
| `--pw_Tabs_tab_default_border-width` | tab | default | `border-width` | `var(--pw_border-width)` | Border width of a tab. | Browser, Capacitor |
| `--pw_Tabs_tab_default_border-style` | tab | default | `border-style` | `var(--pw_border-style)` | Border style of a tab. | Browser, Capacitor |
| `--pw_Tabs_tab_default_border-radius` | tab | default | `border-radius` | `var(--pw_border-radius)` | Corner radius of a tab. | Browser, Capacitor |
| `--pw_Tabs_tab_default_padding` | tab | default | `padding` | `var(--pw_padding)` | Inner spacing of a tab. | Browser, Capacitor |
| `--pw_Tabs_tab_default_color` | tab | default | `color` | `var(--pw_text_strong_color)` | Foreground colour of a tab. | Browser, Capacitor |
| `--pw_Tabs_tab_default_font-size` | tab | default | `font-size` | `var(--pw_font-size)` | Font size of a tab. | Browser, Capacitor |
| `--pw_Tabs_tab_default_transition-duration` | tab | default | `transition-duration` | `var(--pw_transition-duration)` | Duration of visual tab-state transitions. | Browser, Capacitor |
| `--pw_Tabs_tab_active_background-color` | tab | active | `background-color` | `var(--pw_background-color)` | Background of the active tab. | Browser, Capacitor |
| `--pw_Tabs_tab_hover-size_box-shadow` | tab | hover-size | `box-shadow` | `var(--pw_size_box-shadow)` | Size portion of the inactive-tab hover shadow. | Browser, Capacitor |
| `--pw_Tabs_tab_hover-color_box-shadow` | tab | hover-color | `box-shadow` | `var(--pw_color_box-shadow)` | Colour portion of the inactive-tab hover shadow. | Browser, Capacitor |
| `--pw_Tabs_content_default_border-color` | content | default | `border-color` | `var(--pw_border-color)` | Border colour of a tab panel. | Browser, Capacitor |
| `--pw_Tabs_content_default_border-radius` | content | default | `border-radius` | `var(--pw_border-radius)` | Radius applied to the exposed outer corners of a tab panel. | Browser, Capacitor |
| `--pw_Tabs_content_default_border-style` | content | default | `border-style` | `var(--pw_border-style)` | Border style of a tab panel. | Browser, Capacitor |
| `--pw_Tabs_content_default_border-width` | content | default | `border-width` | `var(--pw_border-width)` | Border width of a tab panel. | Browser, Capacitor |
| `--pw_Tabs_content_default_background-color` | content | default | `background-color` | `var(--pw_background-color)` | Background of a tab panel. | Browser, Capacitor |
| `--pw_Tabs_content_default_padding` | content | default | `padding` | `var(--pw_padding)` | Inner spacing of a tab panel. | Browser, Capacitor |


The standard composition supplies `Tab` controls through the named `tabs`
template and matching panel children through the named `content` template.
`Tabs` wraps each `content` child in a `role="tabpanel"` container:


`Tabs` owns the complete tab-list markup and the panel wrappers. Supply one
`content` child per Tab, in the same order. Generated panels use the
`tabContent` part class.

## useTabsContext

React renderers expose `useTabsContext()` for descendants of Tabs. It returns
the live Tabs context, including `activeTab`, `state`, `tabs` (registered Tab
props in visual order), and the navigation helpers.

Call it inside the Tabs tree. The wrapper that renders `<Tabs>` is outside the
provider and cannot read the context.


`registerTab` stores each Tab's props object in `context.tabs`. Extra props on
an extended Tab, such as `scrollArea`, are available at the matching index
when wrapping `content` slot children.

`Tab` delegates registration, relationship IDs, active and disabled state,
inherited positioning classes, class-name composition, activation, keyboard
navigation, and mounted-reference focus coordination to `tabMediator`:


The web template renders a `role="tablist"`, native buttons with `role="tab"`,
and matching `role="tabpanel"` containers linked by IDs. Native renderers map
the same state to an accessible selectable collection and content views, using
platform focus APIs rather than ARIA.

## Accessibility notes

- The selected Tab has `aria-selected="true"` and `tabindex="0"`. Other Tabs
  have `aria-selected="false"` and `tabindex="-1"`.
- Each Tab uses `aria-controls` to point at its panel. Each panel uses
  `aria-labelledby` to point at its Tab. Panels stay mounted; inactive panels
  use `hidden`.
- The tab list is named with `aria-label`. Pass a task-specific label when
  possible; an empty string omits the name.
- Left and right positioning utilities set `aria-orientation="vertical"`.
- Disabled Tabs use native `disabled` and `aria-disabled`.
- Shared web styles keep a 24 by 24 CSS-pixel minimum target, visible
  `:focus-visible` indication, forced-colours treatment, and reduced-motion
  behavior.

## Known limitations

- GOV.UK treats Tabs as experimental and prefers a table of contents plus
  stacked sections when JavaScript is unavailable. This package does not
  provide that no-JS fallback.
- Do not put a second tab list inside a panel. Do not use Tabs as primary
  navigation.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.


## React renderer contract

The renderer preserves the core contract while adapting it to React:

- the forwarded ref targets the renderer's HTMLDivElement root or control element;
- callback props remain regular React callbacks with the argument order defined
  by the core mediator;
- default content uses ordinary children; named slots use Template with a
  name prop when the core contract documents named slots;
- the internal cls prop resolves the public CSS-module classes and is usually
  supplied by the application extension.

The complete source-of-truth contract is maintained in the
[components-core Tabs documentation](@pastweb/components-core/Tabs/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Tabs as R } from '@pastweb/react-components/Tabs';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Tabs/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Tabs = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Tabs } from '@/react/components/Tabs';

type TabsProps = ComponentProps<typeof Tabs>;

export function MyComponent(props: TabsProps) {
  return <Tabs {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Tabs.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Tabs pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- GOV.UK Tabs: https://design-system.service.gov.uk/components/tabs/
