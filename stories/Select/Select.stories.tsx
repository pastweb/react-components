import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/react-components/Select';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Select as SelectComponent, SelectItem } from './components';

type SelectStoryArgs = ComponentProps<typeof SelectComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Select',
  component: SelectComponent,
  render: ({ className, theme, sizeClass, outlined, placeholder, ...args }) => (
    withSharedCssModules(
      <SelectComponent
        {...args}
        className={sharedCssModuleClassName(className, { theme, sizeClass, outlined })}
        placeholder={placeholder}
      >
        <Template name='content'>
          {placeholder}
        </Template>
        <Template name='options'>
          <SelectItem value='uk'>United Kingdom</SelectItem>
          <SelectItem value='fr'>France</SelectItem>
          <SelectItem value='de' disabled>Germany</SelectItem>
        </Template>
      </SelectComponent>,
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
    ...DEFAULT_PROPS,
    label: 'Country',
    placeholder: 'Choose country',
    onChange: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when no visible label is supplied. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Select.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Closes and restores trigger focus after selection.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.closeOnSelect) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the trigger and applies is-disabled.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit ID base for trigger, label, and listbox. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    label: {
      control: 'text',
      description: 'Visible trigger label.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.label) },
      },
    },
    labelPlacement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description: 'Places the visible label around the trigger.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.labelPlacement },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Makes the trigger unavailable and applies is-loading.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    name: {
      control: 'text',
      description: 'ID fallback and native-renderer form name.',
      table: { category: 'Props' },
    },
    offset: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Positioning offset between the trigger and listbox.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.offset) },
      },
    },
    onChange: {
      control: false,
      description: 'Called with the selected value.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Default target content, rendered inside the preview Button.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.placeholder) },
      },
    },
    tabIndex: {
      control: 'number',
      description: 'Trigger tab order.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.tabIndex) },
      },
    },
    value: {
      control: 'text',
      description: 'Selected value.',
      table: { category: 'Props' },
    },
  },
} satisfies Meta<SelectStoryArgs>;

export default meta;
type Story = StoryObj<SelectStoryArgs>;

export const Select: Story = {};
