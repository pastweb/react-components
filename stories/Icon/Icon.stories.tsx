import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Icon';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Icon as IconComponent } from './components';

const CHECK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
const CLOSE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

const DEMO_COLLECTION = {
  actions: {
    check: CHECK_SVG,
    close: CLOSE_SVG,
  },
};

type IconStoryArgs = ComponentProps<typeof IconComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Icon',
  component: IconComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <IconComponent
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
    collection: DEMO_COLLECTION,
    src: CHECK_SVG,
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    apiUrl: {
      control: 'text',
      description: 'Iconify-compatible API endpoint used when a named icon is not in the local collection.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.apiUrl) },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for a meaningful icon. Pass an empty string to keep the icon decorative.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Icon.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    collection: {
      control: false,
      description: 'Trusted local icon sources by collection and name. This preview supplies an `actions` collection with `check` and `close`.',
      table: {
        category: 'Props',
        defaultValue: { summary: '{}' },
        type: { summary: 'Collection' },
      },
    },
    name: {
      control: 'text',
      description: 'Selects an icon using `collection:icon` syntax, for example `actions:close`.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.name) },
      },
    },
    src: {
      control: 'text',
      description: 'Inline SVG markup, image URL, or data URL.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.src) },
      },
    },
  },
} satisfies Meta<IconStoryArgs>;

export default meta;
type Story = StoryObj<IconStoryArgs>;

export const Icon: Story = {};
