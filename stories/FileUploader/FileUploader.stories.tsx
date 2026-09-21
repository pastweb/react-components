import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/FileUploader';
import { fn } from 'storybook/test';
import { FileUploader as FileUploaderComponent } from './components';

type FileUploaderStoryArgs = ComponentProps<typeof FileUploaderComponent> & { children: string };

const meta = {
  title: 'Components/FileUploader',
  component: FileUploaderComponent,
  parameters: { layout: 'centered' },
  args: {
    ...DEFAULT_PROPS,
    accept: 'image/*',
    children: 'Choose image',
    dropzone: true,
    label: 'Profile image',
    maxNumber: 1,
    onAddFile: fn(),
  },
  argTypes: {
    accept: { control: 'text', description: 'Native file-picker accept filter.', table: { category: 'Props' } },
    ariaLabel: { control: 'text', description: 'Accessible trigger name when no visible label is supplied.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) } } },
    children: { control: 'text', description: 'Visible trigger content.', table: { category: 'Example' } },
    className: { control: 'text', description: 'Additional classes applied to the FileUploader root.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) } } },
    disabled: { control: 'boolean', description: 'Disables selecting and dropping files.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.disabled) } } },
    dropzone: { control: 'boolean', description: 'Allows files to be added by dropping them over the trigger.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.dropzone) } } },
    label: { control: 'text', description: 'Visible label associated with the native file input.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.label) } } },
    maxNumber: { control: { type: 'number', min: 1, step: 1 }, description: 'Maximum number of files held by the uploader.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.maxNumber) } } },
    maxSize: { control: { type: 'number', min: 0, step: 1024 }, description: 'Maximum file size in bytes.', table: { category: 'Props' } },
    multiple: { control: 'boolean', description: 'Allows choosing multiple files in the native picker.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.multiple) } } },
    name: { control: 'text', description: 'Native file-input name for form integration.', table: { category: 'Props' } },
    onAddFile: { control: false, description: 'Called for each accepted file and rejected oversized file.', table: { category: 'Props', defaultValue: { summary: 'noop' } } },
  },
} satisfies Meta<FileUploaderStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FileUploader: Story = {};
