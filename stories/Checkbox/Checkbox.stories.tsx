import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Checkbox/constants';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Checkbox as CheckboxComponent } from './components';

type CheckboxStoryArgs = ComponentProps<typeof CheckboxComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <CheckboxComponent
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
    label: 'Accept terms',
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
    checkChar: {
      control: 'text',
      description: 'Default checked mark when the check slot is not replaced.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.checkChar },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Checkbox.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Makes the Checkbox unavailable.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Checkbox ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    label: {
      control: 'text',
      description: 'Visible accessible label for the Checkbox.',
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
      description: 'Places the visible label around the box.',
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
      description: 'Called with the checked boolean when the available Checkbox changes.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    tabIndex: {
      control: 'number',
      description: 'Controls the Checkbox position in the sequential keyboard focus order.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.tabIndex) },
      },
    },
    value: {
      control: 'boolean',
      description: 'Controls the checked state.',
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
} satisfies Meta<CheckboxStoryArgs>;

export default meta;
type Story = StoryObj<CheckboxStoryArgs>;

export const Checkbox: Story = {};
