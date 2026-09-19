import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/TextArea';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { TextArea as TextAreaComponent } from './components';

type TextAreaStoryArgs = ComponentProps<typeof TextAreaComponent> & SharedCssModuleArgs & {
  fullWidth: boolean;
};

const meta = {
  title: 'Components/TextArea',
  component: TextAreaComponent,
  render: ({ className, theme, sizeClass, outlined, fullWidth, ...args }) => (
    withSharedCssModules(
      <TextAreaComponent
        {...args}
        className={sharedCssModuleClassName(
          className,
          { theme, sizeClass, outlined },
          fullWidth && 'is-full-width',
        )}
      />,
    )
  ),
  parameters: {
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  args: {
    ...SHARED_CSS_MODULE_ARGS,
    fullWidth: false,
    ...DEFAULT_PROPS,
    label: 'Notes',
    placeholder: 'Write a short update',
    onChange: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    fullWidth: {
      name: 'is-full-width',
      control: 'boolean',
      description: 'Makes the TextArea fill the available width.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when no visible label is supplied.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Makes the field unavailable.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Marks the field busy and shows the loading slot.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.isLoading) },
      },
    },
    label: {
      control: 'text',
      description: 'Visible accessible label.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.label) },
      },
    },
    onChange: {
      control: false,
      description: 'Called with the current value.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Short input hint.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.placeholder) },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Prevents editing.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.readOnly) },
      },
    },
    value: {
      control: 'text',
      description: 'Controlled value.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.value) },
      },
    },
  },
} satisfies Meta<TextAreaStoryArgs>;

export default meta;
type Story = StoryObj<TextAreaStoryArgs>;

export const TextArea: Story = {};
