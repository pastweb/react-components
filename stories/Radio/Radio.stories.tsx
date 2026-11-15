import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Radio';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Radio as RadioComponent } from './components';

const DEMO_OPTIONS = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Post', value: 'post', disabled: true },
];

type RadioStoryArgs = ComponentProps<typeof RadioComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Radio',
  component: RadioComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <RadioComponent
        {...args}
        className={sharedCssModuleClassName(className, { theme, sizeClass, outlined })}
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
    ...DEFAULT_PROPS,
    label: 'Contact method',
    name: 'contact',
    options: DEMO_OPTIONS,
    onChange: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when no visible group label is supplied. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Radio group.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Makes every option unavailable.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit group ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    label: {
      control: 'text',
      description: 'Visible group label.',
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
      description: 'Places the visible group label around the options.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.labelPlacement },
      },
    },
    name: {
      control: 'text',
      description: 'Shared native form name. Falls back to the group ID.',
      table: { category: 'Props' },
    },
    onChange: {
      control: false,
      description: 'Called with the selected value when an available option is chosen.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    options: {
      control: false,
      description: 'Options to render. This preview supplies Email, Phone, and a disabled Post option.',
      table: { category: 'Props' },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Option layout.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.orientation },
      },
    },
    value: {
      control: 'text',
      description: 'Selected option value.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.value) },
      },
    },
  },
} satisfies Meta<RadioStoryArgs>;

export default meta;
type Story = StoryObj<RadioStoryArgs>;

export const Radio: Story = {};
