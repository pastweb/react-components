import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/components-core/Toggle';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Toggle as ToggleComponent } from './components';

type ToggleStoryArgs = ComponentProps<typeof ToggleComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Toggle',
  component: ToggleComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <ToggleComponent
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
    label: 'Notifications',
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
      description: 'Additional class names applied to the Toggle.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Makes the Toggle unavailable.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Toggle ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
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
      description: 'Places the visible label around the switch.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.labelPlacement },
      },
    },
    name: {
      control: 'text',
      description: 'Native form field name.',
      table: { category: 'Props' },
    },
    onChange: {
      control: false,
      description: 'Called when the available Toggle changes.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    tabIndex: {
      control: 'number',
      description: 'Controls the Toggle position in the sequential keyboard focus order.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.tabIndex) },
      },
    },
    value: {
      control: 'boolean',
      description: 'Controlled checked state.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.value) },
      },
    },
    children: {
      control: false,
      table: { disable: true },
    },
  },
} satisfies Meta<ToggleStoryArgs>;

export default meta;
type Story = StoryObj<ToggleStoryArgs>;

export const Toggle: Story = {};
