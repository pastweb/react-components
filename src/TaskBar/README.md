# TaskBar React renderer

@pastweb/react-components/TaskBar renders the framework-neutral TaskBar contract from
@pastweb/components-core/TaskBar as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

TaskBar renders one control for each window registered with an application
`WindowManager`. It provides desktop-style selection, restore, and minimization
through the manager's `manageWindow` command.

## When to use

Use TaskBar with one application-level `WindowManager` when several managed
windows can remain open at once. Do not use it for unrelated page navigation or
as a replacement for a toolbar.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `manager` | `WindowManager` | yes | - | The application-level manager whose registered windows are displayed. |
| `className` | `string` | no | `""` | Adds classes to the taskbar root. |
| `ariaLabel` | `string` | no | `"Window taskbar"` | Names the navigation landmark. |
| `getLabel` | `(window: ManagedWindowState) => string` | no | `window.meta.label ?? window.meta.title ?? window.id` | Resolves the accessible and visible task button label. |

## Mediator state and API

| Property | Type | Description |
|---|---|---|
| `state.activeId` | `string \| null` | ID of the manager's active window. |
| `state.windows` | `readonly ManagedWindowState[]` | Registered windows in stable taskbar order. |
| `manageWindow` | `(window: ManagedWindowState) => boolean` | Delegates task-button selection to the manager. It activates an inactive window, minimizes an active visible window, and restores a minimized window. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_TaskBar_root_default_gap` | root | default | `gap` | `0.04em` | Gap between task controls. | Web, Capacitor |
| `--pw_TaskBar_root_default_min-height` | root | default | `min-height` | `3.5em` | Minimum taskbar height. | Web, Capacitor |
| `--pw_TaskBar_root_default_padding` | root | default | `padding` | `0.125em` | Inner taskbar spacing. | Web, Capacitor |
| `--pw_TaskBar_root_default_border-color` | root | default | `border-color` | `var(--pw_border-color)` | Taskbar border colour. | Web, Capacitor |
| `--pw_TaskBar_root_default_border-style` | root | default | `border-style` | `var(--pw_border-style)` | Taskbar border style. | Web, Capacitor |
| `--pw_TaskBar_root_default_border-width` | root | default | `border-width` | `var(--pw_border-width)` | Taskbar border width. | Web, Capacitor |
| `--pw_TaskBar_root_default_border-radius` | root | default | `border-radius` | `var(--pw_border-radius)` | Taskbar corner radius. | Web, Capacitor |
| `--pw_TaskBar_root_default_background-color` | root | default | `background-color` | `var(--pw_control_background-color)` | Taskbar background. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_min-width` | taskButton | default | `min-width` | `2.75em` | Minimum task-button width. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_min-height` | taskButton | default | `min-height` | `2.75em` | Minimum task-button height. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_max-width` | taskButton | default | `max-width` | `16em` | Maximum task-button width before text truncates. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_padding` | taskButton | default | `padding` | `var(--pw_padding)` | Task-button inner spacing. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_margin` | taskButton | default | `margin` | `0.25em` | Task-button spacing. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_border-color` | taskButton | default | `border-color` | `var(--pw_border-color)` | Task-button border colour. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_border-style` | taskButton | default | `border-style` | `var(--pw_border-style)` | Task-button border style. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_border-width` | taskButton | default | `border-width` | `var(--pw_border-width)` | Task-button border width. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_border-radius` | taskButton | default | `border-radius` | `var(--pw_border-radius)` | Task-button corner radius. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_background-color` | taskButton | default | `background-color` | `var(--pw_control_background-color)` | Task-button background. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_color` | taskButton | default | `color` | `inherit` | Task-button text colour. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_font-size` | taskButton | default | `font-size` | `inherit` | Task-button font size. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_font-weight` | taskButton | default | `font-weight` | `var(--pw_semibold_font-weight)` | Task-button font weight. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_line-height` | taskButton | default | `line-height` | `var(--pw_line-height)` | Task-button line height. | Web, Capacitor |
| `--pw_TaskBar_taskButton_default_transition-duration` | taskButton | default | `transition-duration` | `var(--pw_transition-duration)` | Task-button transition duration. | Web, Capacitor |
| `--pw_TaskBar_taskButton_minimised_box-shadow` | taskButton | minimised | `box-shadow` | inset shared shadow | Inset shadow that indicates a minimized window. | Web, Capacitor |


## Keyboard and accessibility behaviour

- The root is a named `nav` landmark and each window is a native button.
- `aria-pressed` identifies the active task. Native button keyboard activation
  runs the same manager command as a pointer click.
- Horizontal overflow remains available when more windows are open than fit in
  the taskbar.
- The taskbar uses the `--pw_z-index_window-max` layer so its controls remain
  reachable when floating managed windows overlap the same workspace.

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
[components-core TaskBar documentation](@pastweb/components-core/TaskBar/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { TaskBar as R } from '@pastweb/react-components/TaskBar';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/TaskBar/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const TaskBar = forwardRef<HTMLElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { TaskBar } from '@/react/components/TaskBar';

type TaskBarProps = ComponentProps<typeof TaskBar>;

export function MyComponent(props: TaskBarProps) {
  return <TaskBar {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/TaskBar.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.
