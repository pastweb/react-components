# Carousel React renderer

@pastweb/react-components/Carousel renders the framework-neutral Carousel contract from
@pastweb/components-core/Carousel as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Carousel presents one item from an ordered collection and provides controls for
moving through the collection. Its web contract follows the WAI-ARIA carousel
pattern.

## When to use

Use a carousel only when the content has a meaningful sequence and users can
understand the page without seeing every slide.

## Carousel props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `ariaLabel` | `string` | no | `'Carousel'` | Names the carousel region. Supply a content-specific label. |
| `className` | `string` | no | `""` | Adds classes to the carousel. |
| `current` | `number` | no | `0` | Sets the current slide index. |
| `disabled` | `boolean` | no | - | Prevents navigation and disables controls. |
| `id` | `string` | no | generated | Supplies the carousel ID. Generated IDs use the `carousel` prefix. |
| `showCommands` | `boolean` | no | `true` | Renders navigation controls. |
| `prevAriaLabel` | `string` | no | `'Previous slide'` | Names the previous control. |
| `nextAriaLabel` | `string` | no | `'Next slide'` | Names the next control. |
| `onCurrentChange` | `(current: number) => void` | no | - | Reports navigation changes. |

## CarouselItem props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves item classes. |
| `className` | `string` | no | `""` | Adds classes to the slide. |
| `disabled` | `boolean` | no | - | Disables the slide and exposes its disabled state. |

## Mediator state

`carouselMediator` exposes renderer-ready state for the root semantics and
track presentation:

| State | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized carousel name. |
| `ariaLive` | `'off' \| 'polite'` | Live-region mode for slide changes. |
| `ariaRoleDescription` | `'carousel' \| undefined` | Carousel role description when the root is named. |
| `className` | `string` | Complete root class name. |
| `current` | `number` | Current slide index. |
| `isDisabled` | `true \| undefined` | Renderer-ready disabled and ARIA value. |
| `itemsCount` | `number` | Number of registered CarouselItem instances. |
| `prevAriaLabel` / `nextAriaLabel` | `string` | Normalized navigation-control names. |
| `role` | `'region' \| undefined` | Region role when the root is named. |
| `transform` | `string` | Renderer-ready track transform. |

`carouselItemMediator` reads the Carousel context internally and exposes the
following renderer-ready state:

| State | Type | Description |
|---|---|---|
| `ariaHidden` | `true \| undefined` | Hides an inactive slide from the accessibility tree. |
| `ariaLabel` | `string` | One-based position label in the form `n of total`. |
| `ariaRoleDescription` | `'slide'` | Renderer-ready slide role description. |
| `className` | `string` | Complete item class name, including active and disabled state classes. |
| `index` | `number` | Stable zero-based registration index. |
| `inert` | `true \| undefined` | Prevents interaction with descendants of an inactive slide. |
| `isActive` | `boolean` | Whether this item matches the current Carousel index. |
| `isDisabled` | `true \| undefined` | Normalized local or inherited disabled state. |
| `role` | `'group'` | Renderer-ready slide group role. |

## Carousel mediator context

`carouselMediator.getContext()` exposes live state and stable commands for
`CarouselItem` and custom descendant controls. Framework renderers publish this
contract through `CAROUSEL_CONTEXT_KEY`; command slots do not receive mediator
state or methods as slot props.

| Property or method | Type | Description |
|---|---|---|
| `current` | `number` | Live current slide index. |
| `isDisabled` | `true \| undefined` | Live normalized Carousel disabled state. |
| `itemsCount` | `number` | Live number of registered CarouselItem descendants. |
| `prev` | `() => void` | Selects the previous enabled position when navigation is available. |
| `next` | `() => void` | Selects the next enabled position when navigation is available. |
| `registerItem` | `() => number` | Registers a CarouselItem and returns its stable zero-based index. |

## Slots

| SlotName | Description | Access |
|---|---|---|
| default | Supplies `CarouselItem` children. | - |
| `commands` | Replaces the navigation controls while preserving behavior. | Carousel context |

## Utility classes

The Carousel does not currently define component-specific utility classes.

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Carousel_root_default_max-width` | `root` | `default` | `max-width` | `800px` | Maximum carousel width. | Web, Capacitor |
| `--pw_Carousel_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled carousel opacity. | Web, Capacitor, NativeScript |
| `--pw_Carousel_track_default_transition-duration` | `track` | `default` | `transition-duration` | `0.5s` | Slide movement duration. | Web, Capacitor; NativeScript adapter |
| `--pw_Carousel_control_default_background-color` | `control` | `default` | `background-color` | `rgba(0,0,0,.6)` | Control background. | Web, Capacitor, NativeScript |
| `--pw_Carousel_control_hover_background-color` | `control` | `hover` | `background-color` | `rgba(0,0,0,.8)` | Hover background. | Web, Capacitor |
| `--pw_Carousel_control_default_color` | `control` | `default` | `color` | `white` | Control foreground. | Web, Capacitor, NativeScript |
| `--pw_Carousel_control_default_padding` | `control` | `default` | `padding` | `0.75em 1em` | Control spacing. | Web, Capacitor, NativeScript |
| `--pw_Carousel_control_default_font-size` | `control` | `default` | `font-size` | `1.25em` | Control icon size. | Web, Capacitor, NativeScript |
| `--pw_Carousel_control_default_border-radius` | `control` | `default` | `border-radius` | `var(--pw_border-radius)` | Control corner radius. | Web, Capacitor, NativeScript |
| `--pw_Carousel_control_default_transition-duration` | `control` | `default` | `transition-duration` | `0.3s` | Control state duration. | Web, Capacitor |
| `--pw_CarouselItem_root_default_min-height` | `root` | `default` | `min-height` | `300px` | Minimum slide height. | Web, Capacitor, NativeScript |
| `--pw_CarouselItem_root_default_transition-duration` | `root` | `default` | `transition-duration` | `0.5s` | Slide visual transition duration. | Web, Capacitor; NativeScript adapter |
| `--pw_CarouselItem_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled slide opacity. | Web, Capacitor, NativeScript |


## Keyboard interaction

- `Tab` and `Shift+Tab` move through the carousel and its native controls in document order.
- `ArrowLeft` and `ArrowRight` move to the previous and next slides when the carousel is focused.
- Collapsed or inactive slide content is inert and removed from sequential focus.

## Accessibility notes

- The carousel is a labelled region with `aria-roledescription="carousel"`.
- Slides use `role="group"`, expose their position, and inactive slides are
  `aria-hidden` and inert.
- The default `ariaLabel` is `"Carousel"`. An explicit empty string omits the
  root label, region role, and carousel role description.
- A disabled Carousel passes the same normalized `true` value to its
  `is-disabled` class, control `disabled`/`aria-disabled` attributes, root
  `aria-disabled`, and inherited CarouselItem state.
- Left and Right Arrow navigate; native buttons remain in normal tab order.
- Shared styles honor `prefers-reduced-motion` and `forced-colors`.


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
[components-core Carousel documentation](@pastweb/components-core/Carousel/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Carousel as R } from '@pastweb/react-components/Carousel';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Carousel/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Carousel = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Carousel } from '@/react/components/Carousel';

type CarouselProps = ComponentProps<typeof Carousel>;

export function MyComponent(props: CarouselProps) {
  return <Carousel {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Carousel.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Carousel pattern: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
- GOV.UK guidance: https://design-system.service.gov.uk/components/
