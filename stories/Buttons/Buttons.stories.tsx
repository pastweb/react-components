import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Buttons';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Button } from '../Button/components';
import { Buttons as ButtonsComponent } from './components';

type ButtonsStoryArgs = ComponentProps<typeof ButtonsComponent> & SharedCssModuleArgs & {
  fullWidth: boolean;
  rounded: boolean;
};

const actions = [
  <Button key='save'>Save</Button>,
  <Button key='preview'>Preview</Button>,
  <Button key='cancel'>Cancel</Button>,
];

const meta = {
  title: 'Components/Buttons',
  component: ButtonsComponent,
  render: ({ className, theme, sizeClass, outlined, fullWidth, rounded, ...args }) => (
    withSharedCssModules(
      <ButtonsComponent
        {...args}
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
    ariaLabel: 'Document actions',
    children: actions,
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    fullWidth: {
      name: 'is-full-width',
      control: 'boolean',
      description: 'Makes the Buttons group fill the available width.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    rounded: {
      name: 'is-rounded',
      control: 'boolean',
      description: 'Rounds the outside corners of the first and last Button.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the Buttons group.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    children: {
      control: false,
      description: 'One Button component or a collection of Button components.',
      table: {
        category: 'Props',
        type: { summary: 'Button | Button[]' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Buttons root.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction with every Button in the group.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Buttons root ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
  },
} satisfies Meta<ButtonsStoryArgs>;

export default meta;
type Story = StoryObj<ButtonsStoryArgs>;

export const Buttons: Story = {};
