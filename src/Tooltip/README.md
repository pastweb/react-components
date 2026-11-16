# Tooltip React renderer

@pastweb/react-components/Tooltip renders the framework-neutral Tooltip contract from
@pastweb/components-core/Tooltip as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

Tooltip provides a short, non-interactive description for a focused or hovered
control. Its rendering contract follows the WAI-ARIA Tooltip pattern and
targets WCAG 2.2 Level AA.

## When to use

Use Tooltip to supplement a control’s visible name with extra description. Do
not put essential instructions, errors, or interactive content in a tooltip.
Prefer visible hint text, especially in forms. Hover-only UI is unreliable on
touch devices.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `content` | `string` | no | `""` | Tooltip description. Empty content never opens. |
| `id` | `string` | no | generated | Stable ID used by the trigger description relationship. Generated IDs use the `tooltip` prefix. |
| `placement` | `TooltipPlacement` | no | `'top'` | Preferred side and optional start/end alignment. |
| `offset` | `number` | no | `8` | Renderer positioning gap. |
| `showDelay` | `number` | no | `300` | Pointer-hover opening delay in milliseconds. Focus opens immediately. |
| `hideDelay` | `number` | no | `100` | Pointer-leave closing delay in milliseconds. Blur and Escape close immediately. |
| `disabled` | `boolean` | no | - | Prevents opening and applies `is-disabled`. |
| `className` | `string` | no | `""` | Additional root classes. |
| `tooltipClassName` | `string` | no | `""` | Additional tooltip-surface classes. |

`TooltipPlacement` supports `top`, `right`, `bottom`, and `left`, each
optionally followed by `-start` or `-end`. `Placement` remains a deprecated
alias.

## Mediator state

| Property | Type | Description |
|---|---|---|
| `isDisabled` | `true \| undefined` | Is `true` when the Tooltip is disabled; otherwise omitted. |
| `isVisible` | `boolean` | Whether the tooltip is requested open. |
| `tooltipId` | `string` | Tooltip relationship ID from an explicit `id` or a generated `tooltip` prefix. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_Tooltip_content_default_background-color` | `content` | `default` | `background-color` | `var(--pw_background-color)` | Tooltip background. | Web, Capacitor |
| `--pw_Tooltip_content_default_color` | `content` | `default` | `color` | `var(--pw_text_color)` | Tooltip foreground. | Web, Capacitor |
| `--pw_Tooltip_content_default_border-color` | `content` | `default` | `border-color` | `var(--pw_border-color)` | Border colour. | Web, Capacitor |
| `--pw_Tooltip_content_default_max-width` | `content` | `default` | `max-width` | `20rem` | Maximum tooltip width. | Web, Capacitor |
| `--pw_Tooltip_content_default_font-size` | `content` | `default` | `font-size` | shared font size | Tooltip type size. | Web, Capacitor |
| `--pw_Tooltip_content_default_line-height` | `content` | `default` | `line-height` | `1.5em` | Tooltip line box. With vertical padding this matches the arrow box. | Web, Capacitor |
| `--pw_Tooltip_content_default_padding` | `content` | `default` | `padding` | `0.25em` plus shared horizontal padding | Inner spacing, in `em` so it tracks font size. | Web, Capacitor |
| `--pw_Tooltip_content_default_drop-shadow` | `content` | `default` | `filter` | `0 0 0.2em` shared shadow colour | Shadow that follows the tooltip and arrow. | Web, Capacitor |
| `--pw_Tooltip_arrow_default_size` | `arrow` | `default` | `size` | `1em` | Decorative arrow size, in `em` so it tracks the tooltip font. | Web, Capacitor |


## Keyboard interaction

- Focus on the trigger opens the tooltip immediately.
- Blur closes the tooltip immediately.
- `Escape` dismisses an open tooltip without moving focus.
- The tooltip itself does not enter the tab order.

## Accessibility notes

- The popup uses `role="tooltip"`. The trigger references it with
  `aria-describedby`.
- A single element trigger receives `aria-describedby` on that element. Plain
  text triggers are wrapped in a focusable span.
- Pointer hover opens after `showDelay`. Pointer leave closes after
  `hideDelay` so the pointer can move onto the tooltip (WCAG 1.4.13).
- Touch pointer entry is ignored because hover-only UI is unreliable on touch
  devices.
- Empty `content` never opens.
- The decorative arrow is hidden from assistive technology.
- Shared web styles wrap long text, keep a visible trigger focus indicator,
  support forced colours, and disable non-essential motion under
  `prefers-reduced-motion`.

## Known limitations

- Tooltip content must not be interactive. Use a dialog or disclosure for
  actions or forms.
- Automated accessibility checks do not by themselves establish WCAG
  conformance.


## React renderer contract

The renderer preserves the core contract while adapting it to React:

- the forwarded ref targets the renderer's HTMLSpanElement root or control element;
- callback props remain regular React callbacks with the argument order defined
  by the core mediator;
- default content uses ordinary children; named slots use Template with a
  name prop when the core contract documents named slots;
- the internal cls prop resolves the public CSS-module classes and is usually
  supplied by the application extension.

The complete source-of-truth contract is maintained in the
[components-core Tooltip documentation](@pastweb/components-core/Tooltip/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { Tooltip as R } from '@pastweb/react-components/Tooltip';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/Tooltip/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const Tooltip = forwardRef<HTMLSpanElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { Tooltip } from '@/react/components/Tooltip';

type TooltipProps = ComponentProps<typeof Tooltip>;

export function MyComponent(props: TooltipProps) {
  return <Tooltip {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/Tooltip.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Tooltip pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
- GOV.UK components: https://design-system.service.gov.uk/components/
