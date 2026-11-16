# FileUploader React renderer

@pastweb/react-components/FileUploader renders the framework-neutral FileUploader contract from
@pastweb/components-core/FileUploader as React components.

This package is a renderer layer. The shared core owns public props, defaults,
mediator state, IDs, event ordering, and accessibility relationships. The React
renderer owns JSX, refs, lifecycle cleanup, context bridges, and conversion of
React children into the slots documented by the core contract.

## Core contract

FileUploader lets users choose files through a native file picker, with an
optional dropzone. Its rendering contract uses a native `input type="file"`
and a visible trigger, and targets WCAG 2.2 Level AA.

## When to use

Use a file uploader only when a file is required to complete the task. Provide
a visible label that describes the file being requested. Do not rely on
drag-and-drop as the only way to add files; keyboard and assistive-technology
users must be able to open the native picker.

## Props

| PropName | Type | Required | Default | Description |
|---|---|---:|---:|---|
| `cls` | `(...args: ClassValue[]) => string` | yes | - | Resolves component and state classes. |
| `accept` | `string` | no | - | Restricts the native picker to matching file types. |
| `ariaLabel` | `string` | no | `"Upload a file"` | Names the trigger when no visible `label` is supplied. Pass an empty string to omit the accessible name. |
| `className` | `string` | no | `""` | Adds classes to the wrapper. |
| `disabled` | `boolean` | no | - | Makes choosing and dropping files unavailable. |
| `dropzone` | `boolean` | no | - | Enables drop-to-add in addition to the native picker. |
| `formData` | `FormData` | no | `new FormData()` | Supplies the store used for selected files. |
| `id` | `string` | no | generated | Supplies the root ID. Generated IDs use the `fileUploader` prefix. |
| `label` | `string` | no | `""` | Supplies the visible accessible label. |
| `maxNumber` | `number` | no | `1` | Limits how many files can be stored. |
| `maxSize` | `number` | no | - | Maximum file size in bytes. Oversized files are reported through `onAddFile` and are not stored. |
| `multiple` | `boolean` | no | - | Allows the native picker to select more than one file at a time. |
| `name` | `string` | no | - | Supplies the native file input name. |
| `tabIndex` | `number` | no | `0` | Controls sequential focus order of the trigger. Prefer the default document order. |
| `onAddFile` | `(file: File, data: FormData) => void` | no | noop | Reports each file after a successful store, and oversized files that were rejected. |

## Mediator API

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Resolved host ID. Generated IDs use the `fileUploader` prefix; an explicit `id` is exposed as `_${id}`. |
| `inputId` | `string` | File input ID derived as `input${id}`. |
| `labelId` | `string` | Visible label ID derived as `label${id}`. |

## Mediator state

| Property | Type | Description |
|---|---|---|
| `ariaLabel` | `string \| undefined` | Normalized accessible name when no visible `label` is present. Empty labels are omitted. |
| `canAddMore` | `boolean` | Is `true` while stored files are under `maxNumber`. |
| `fileCount` | `number` | Number of stored files. |
| `files` | `File[]` | File values currently stored in FormData. |
| `isDisabled` | `true \| undefined` | Is `true` when the uploader is disabled; otherwise omitted. Renderers use this value directly for `.is-disabled`, `disabled`, and `aria-disabled`. |
| `isDragging` | `true \| undefined` | Is `true` while files are dragged over an enabled dropzone; otherwise omitted. Renderers use this value for `.is-dragging`. |

## Mediator context

`fileUploaderMediator.getContext()` exposes live getters consumed by custom
descendant content. Values that also exist on mediator state are read from that
normalized state rather than recomputed from raw props.

| Property | Type | Description |
|---|---|---|
| `accept` | `string \| undefined` | Native picker accept filter. |
| `canAddMore` | `boolean` | Whether another file can be stored. |
| `dropzone` | `boolean` | Whether drop-to-add is enabled. |
| `fileCount` | `number` | Number of stored files. |
| `files` | `File[]` | Stored File values. |
| `formData` | `FormData` | The file store. |
| `id` | `string` | Resolved host ID. |
| `inputId` | `string` | File input ID. |
| `isDisabled` | `true \| undefined` | Normalized disabled state. |
| `labelId` | `string` | Visible label ID. |
| `maxNumber` | `number` | Stored-file limit. |
| `maxSize` | `number \| undefined` | Maximum file size in bytes. |
| `multiple` | `boolean` | Native picker multiple-selection flag. |
| `removeFile` | `(fileName: string) => void` | Removes a stored file by the FormData key used when it was added. |

## Slots

| SlotName | Description | Default content |
|---|---|---|
| default | Supplies trigger content such as an icon or “Choose file” text. Must provide an accessible name when `label` and `ariaLabel` are both empty. | Empty. |

## CSS Variables

| Variable | Part | State | CSS property | Default | Description | Platforms |
|---|---|---|---|---|---|---|
| `--pw_FileUploader_root_default_background-color` | `root` | `default` | `background-color` | `var(--pw_control_background-color)` | Trigger background. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_color` | `root` | `default` | `color` | `var(--pw_text_color)` | Trigger text colour. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_padding` | `root` | `default` | `padding` | `var(--pw_padding)` | Trigger inner spacing. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_margin` | `root` | `default` | `margin` | shared margins | Component spacing. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_border-color` | `root` | `default` | `border-color` | `var(--pw_border-color)` | Trigger border colour. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_border-width` | `root` | `default` | `border-width` | `var(--pw_border-width)` | Trigger border width. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_border-style` | `root` | `default` | `border-style` | `var(--pw_border-style)` | Trigger border style. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_border-radius` | `root` | `default` | `border-radius` | `var(--pw_border-radius)` | Trigger corner radius. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_rounded_border-radius` | `root` | `rounded` | `border-radius` | `var(--pw_rounded_border-radius)` | Trigger corner radius for `is-rounded`. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_min-height` | `root` | `default` | `min-height` | `2.75em` | Minimum trigger size, 44px at the default font size. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_default_transition-duration` | `root` | `default` | `transition-duration` | `var(--pw_transition-duration)` | Visual state transition duration. | Web, Capacitor; NativeScript adapter |
| `--pw_FileUploader_root_disabled_opacity` | `root` | `disabled` | `opacity` | `var(--pw_disabled_opacity)` | Disabled opacity. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_root_highlighted_border-color` | `root` | `highlighted` | `border-color` | `var(--pw_outline_color)` | Drop-target border colour. | Web, Capacitor |
| `--pw_FileUploader_trigger_default_gap` | `trigger` | `default` | `gap` | `var(--pw_horizontal_padding)` | Space between trigger contents. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_label_default_color` | `label` | `default` | `color` | `var(--pw_label_text_color)` | Visible label colour. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_label_default_font-weight` | `label` | `default` | `font-weight` | `var(--pw_semibold_font-weight)` | Visible label weight. | Web, Capacitor, NativeScript |
| `--pw_FileUploader_color_default_box-shadow` | `color` | `default` | `box-shadow` | `var(--pw_color_box-shadow)` | Focus and drag shadow colour. | Web, Capacitor |
| `--pw_FileUploader_size_default_box-shadow` | `size` | `default` | `box-shadow` | `var(--pw_size_box-shadow)` | Shadow size. | Web, Capacitor |


Renderers pass native change and drag events through to the mediator. For a
native change event, the mediator reads the file input from `event.target` and
falls back to `event.currentTarget`. This supports both native DOM events and
renderer event wrappers without renderer-specific adapters. The mediator stops
drag propagation, prevents the browser from opening dropped files, and converts
`FileList` values to `File[]`.

## Keyboard interaction

- `Tab` and `Shift+Tab` move focus to and from the trigger in document order.
- `Enter` and `Space` open the native file picker when another file can be
  stored.
- The hidden file input is not in the tab order. Keyboard users operate the
  visible trigger.
- Drag-and-drop is pointer-only additional behaviour. It must not replace the
  picker.

## Accessibility behaviour

- The native file input remains the mechanism that chooses files. The trigger
  is a `type="button"` control that opens that input.
- A visible `label` names the control through `aria-labelledby`. When no
  visible label is supplied, `ariaLabel` names the trigger. Pass an empty
  `ariaLabel` only when slot content already provides the accessible name.
- Disabled state is exposed as `.is-disabled`, native `disabled`, and
  `aria-disabled`.
- Dropzone entry is a visual `is-dragging` state. Do not make dropping the
  only way to add files.
- IDs used for the host, label, and input are mediator-owned and stable.

## Known limitations

- `accept` is enforced by the native picker. Dropped files are not filtered by
  `accept` in the mediator.
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
[components-core FileUploader documentation](@pastweb/components-core/FileUploader/README.md).

## Renderer extension

An application extension attaches its style module and forwards the ref to the
React renderer:

```tsx
import { forwardRef, type ComponentProps } from 'react';
import { FileUploader as R } from '@pastweb/react-components/FileUploader';
import { cl } from '@/styles';

import classes from '@pastweb/components-core/FileUploader/style.module.scss';

const cls = cl.setClasses(classes);

type Props = Omit<ComponentProps<typeof R>, 'cls'>;

export const FileUploader = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));
```

Keep mediator behavior in components-core. The extension should only attach
application styles, provide framework-specific children or templates, and expose
the component through the application's public import path.

## Usage

```tsx
import { type ComponentProps } from 'react';
import { FileUploader } from '@/react/components/FileUploader';

type FileUploaderProps = ComponentProps<typeof FileUploader>;

export function MyComponent(props: FileUploaderProps) {
  return <FileUploader {...props} />;
}
```

For required props, named slots, subcomponents, or context hooks, follow the
component-specific examples in the core contract above and import the React
extension from @/react/components/FileUploader.

## React accessibility guidance

Preserve the native element, mediator-provided IDs, ARIA relationships,
keyboard handlers, focus behavior, and inactive-state handling from the core
contract. Do not replace required semantic wrappers when providing custom
children or templates.

## Standards

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Button pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
- GOV.UK file upload guidance: https://design-system.service.gov.uk/components/file-upload/
