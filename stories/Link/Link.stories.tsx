import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Link';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Link as LinkComponent } from './components';

type LinkStoryArgs = ComponentProps<typeof LinkComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Link',
  component: LinkComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <LinkComponent
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
    children: 'Documentation',
    onClick: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    children: {
      control: 'text',
      description: 'Descriptive content rendered inside the Link.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Link.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Removes navigation and sequential focus.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    href: {
      control: 'text',
      description: 'Destination of the Link.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.href) },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Link ID.',
      table: {
        category: 'Props',
      },
    },
    onClick: {
      control: false,
      description: 'Called when an available Link is activated.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    target: {
      control: 'select',
      options: ['_self', '_blank'],
      description: 'Browsing context. New-window links should also say that in their content.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.target },
      },
    },
  },
} satisfies Meta<LinkStoryArgs>;

export default meta;
type Story = StoryObj<LinkStoryArgs>;

export const Link: Story = {};
