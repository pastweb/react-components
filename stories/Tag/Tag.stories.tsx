import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Tag';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Tag as TagComponent } from './components';

type TagStoryArgs = ComponentProps<typeof TagComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Tag',
  component: TagComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <TagComponent
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
    children: 'News',
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when visible content is insufficient. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    children: {
      control: 'text',
      description: 'Visible tag content.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Tag.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    closeButton: {
      control: 'boolean',
      description: 'Displays the close button.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    closeLabel: {
      control: 'text',
      description: 'Accessible label for the close button.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.closeLabel) },
      },
    },
    onClose: {
      control: false,
      description: 'Called when the close button is activated.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    rounded: {
      control: 'boolean',
      description: 'Applies is-rounded.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<TagStoryArgs>;

export default meta;
type Story = StoryObj<TagStoryArgs>;

export const Tag: Story = {};
