import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Button/constants';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Button as ButtonComponent } from './components';

type ButtonStoryArgs = ComponentProps<typeof ButtonComponent> & SharedCssModuleArgs & {
  fullWidth: boolean;
  rounded: boolean;
};

const meta = {
  title: 'Components/Button',
  component: ButtonComponent,
  render: ({ className, theme, sizeClass, outlined, fullWidth, rounded, onClick, ...args }) => (
    withSharedCssModules(
      <ButtonComponent
        {...args}
        onClick={() => {
          onClick();
        }}
        className={sharedCssModuleClassName(
          className,
          { theme, sizeClass, outlined },
          fullWidth && 'is-full-width',
          rounded && 'is-rounded',
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
    rounded: false,
    ...DEFAULT_PROPS,
    children: 'Save changes',
    onClick: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    fullWidth: {
      name: 'is-full-width',
      control: 'boolean',
      description: 'Makes the Button fill the available width.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    rounded: {
      name: 'is-rounded',
      control: 'boolean',
      description: 'Applies the rounded Button border radius.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Content rendered inside the Button.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Button.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the Button and prevents click handling.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Button ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Shows the loading state and disables the Button.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.loading) },
      },
    },
    onClick: {
      control: false,
      description: 'Called when the enabled Button is activated.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    tabIndex: {
      control: 'number',
      description: 'Controls the Button position in the sequential keyboard focus order.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.tabIndex) },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native HTML button type.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.type },
      },
    },
  },
} satisfies Meta<ButtonStoryArgs>;

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Button: Story = {};
