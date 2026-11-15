import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/react-components/Input';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Input as InputComponent } from './components';

type InputStoryArgs = ComponentProps<typeof InputComponent> & SharedCssModuleArgs & {
  fullWidth: boolean;
  left: string;
  loadingContent: string;
  right: string;
  rounded: boolean;
};

const meta = {
  title: 'Components/Input',
  component: InputComponent,
  render: ({
    className,
    theme,
    sizeClass,
    outlined,
    fullWidth,
    left,
    loadingContent,
    right,
    rounded,
    ...args
  }) => (
    withSharedCssModules(
      <InputComponent
        {...args}
        className={sharedCssModuleClassName(
          className,
          { theme, sizeClass, outlined },
          fullWidth && 'is-full-width',
          rounded && 'is-rounded',
        )}
      >
        {left ? <Template name='left'>{left}</Template> : null}
        {right ? <Template name='right'>{right}</Template> : null}
        {loadingContent ? <Template name='loading'>{loadingContent}</Template> : null}
      </InputComponent>,
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
    rounded: false,
    ...DEFAULT_PROPS,
    label: 'Display name',
    left: '',
    loadingContent: '',
    placeholder: 'Jane Doe',
    right: '',
    onChange: fn(),
    onKeyDown: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    fullWidth: {
      name: 'is-full-width',
      control: 'boolean',
      description: 'Makes the Input fill the available width.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    rounded: {
      name: 'is-rounded',
      control: 'boolean',
      description: 'Applies the rounded Input border radius.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when no visible label is supplied. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    autocomplete: {
      control: 'text',
      description: 'Native autocomplete token.',
      table: { category: 'Props' },
    },
    children: {
      control: false,
      table: { disable: true },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Input.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    decrementTitle: {
      control: 'text',
      description: 'Accessible name for the number decrement control.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.decrementTitle },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Makes the Input unavailable.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Input ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    incrementTitle: {
      control: 'text',
      description: 'Accessible name for the number increment control.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.incrementTitle },
      },
    },
    label: {
      control: 'text',
      description: 'Visible accessible label for the Input.',
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
      description: 'Places the visible label around the field.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.labelPlacement },
      },
    },
    left: {
      control: 'text',
      description: 'Projects into the left affix slot.',
      table: { category: 'Props' },
    },
    loading: {
      control: 'boolean',
      description: 'Marks the Input busy and temporarily unavailable.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    loadingContent: {
      control: 'text',
      description: 'Projects into the loading slot when the Input is busy.',
      table: { category: 'Props' },
    },
    max: {
      control: 'number',
      description: 'Native maximum for number inputs.',
      table: { category: 'Props' },
    },
    min: {
      control: 'number',
      description: 'Native minimum for number inputs.',
      table: { category: 'Props' },
    },
    name: {
      control: 'text',
      description: 'Native form field name.',
      table: { category: 'Props' },
    },
    onChange: {
      control: false,
      description: 'Called with the current value when the available Input changes.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    onKeyDown: {
      control: false,
      description: 'Called when a key is pressed in the available Input.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Short hint shown when the Input is empty.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.placeholder) },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks the value as required.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    right: {
      control: 'text',
      description: 'Projects into the right affix slot.',
      table: { category: 'Props' },
    },
    step: {
      control: 'number',
      description: 'Native step for number inputs.',
      table: { category: 'Props' },
    },
    tabIndex: {
      control: 'number',
      description: 'Controls the Input position in the sequential keyboard focus order.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.tabIndex) },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'search', 'password', 'email', 'number'],
      description: 'Native HTML input type.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.type },
      },
    },
    value: {
      control: 'text',
      description: 'Controls the Input value.',
      table: { category: 'Props' },
    },
  },
} satisfies Meta<InputStoryArgs>;

export default meta;
type Story = StoryObj<InputStoryArgs>;

export const Input: Story = {};
