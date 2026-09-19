import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/react-components/Tabs/constants';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  Tab,
  Tabs as TabsComponent,
} from './components';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import {
  ACCESSIBILITY_CONTENT,
  OVERVIEW_CONTENT,
  STYLING_CONTENT,
} from './content';

const tabsChildren = [
  <Template key='tabs' name='tabs'>
    <Tab>Overview</Tab>
    <Tab>Accessibility</Tab>
    <Tab>Styling</Tab>
  </Template>,
  <Template key='content' name='content'>
    {OVERVIEW_CONTENT}
    {ACCESSIBILITY_CONTENT}
    {STYLING_CONTENT}
  </Template>,
];

type TabsStoryArgs = ComponentProps<typeof TabsComponent> & SharedCssModuleArgs & {
  fullWidth: boolean;
  hasVerticalLabels: boolean;
  noContentBorder: boolean;
  noContentPadding: boolean;
  position: string;
};

const meta = {
  title: 'Components/Tabs',
  component: TabsComponent,
  render: ({
    className,
    theme,
    sizeClass,
    outlined,
    fullWidth,
    hasVerticalLabels,
    noContentBorder,
    noContentPadding,
    position,
    ...args
  }) => (
    withSharedCssModules(
      <TabsComponent
        {...args}
        className={sharedCssModuleClassName(
          className,
          { theme, sizeClass, outlined },
          position,
          fullWidth && 'is-full-width',
          hasVerticalLabels && 'has-vertical-labels',
          noContentBorder && 'no-content-border',
          noContentPadding && 'no-content-padding',
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
    hasVerticalLabels: false,
    noContentBorder: false,
    noContentPadding: false,
    position: '',
    ...DEFAULT_PROPS,
    ariaLabel: 'Pastweb documentation',
    children: tabsChildren,
    onChange: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    fullWidth: {
      name: 'is-full-width',
      control: 'boolean',
      description: 'Makes horizontal labels fill the list width and vertical labels fill its height.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    hasVerticalLabels: {
      name: 'has-vertical-labels',
      control: 'boolean',
      description: 'Rotates each Tab button for left or right positioning utilities.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    noContentBorder: {
      name: 'no-content-border',
      control: 'boolean',
      description: 'Removes the border from every generated tab panel.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    noContentPadding: {
      name: 'no-content-padding',
      control: 'boolean',
      description: 'Removes the padding from every generated tab panel.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      name: 'Positioning',
      control: {
        type: 'select',
        labels: {
          '': 'None',
          'is-top': 'is-top',
          'is-top-left': 'is-top-left',
          'is-top-right': 'is-top-right',
          'is-bottom': 'is-bottom',
          'is-bottom-left': 'is-bottom-left',
          'is-bottom-right': 'is-bottom-right',
          'is-left': 'is-left',
          'is-left-top': 'is-left-top',
          'is-left-bottom': 'is-left-bottom',
          'is-right': 'is-right',
          'is-right-top': 'is-right-top',
          'is-right-bottom': 'is-right-bottom',
        },
      },
      options: [
        '',
        'is-top',
        'is-top-left',
        'is-top-right',
        'is-bottom',
        'is-bottom-left',
        'is-bottom-right',
        'is-left',
        'is-left-top',
        'is-left-bottom',
        'is-right',
        'is-right-top',
        'is-right-bottom',
      ],
      description: 'Selects a positioning utility class for the Tabs preview.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: JSON.stringify('') },
      },
    },
    activeTab: {
      control: {
        type: 'number',
        min: 0,
        max: 2,
        step: 1,
      },
      description: 'Initial zero-based index of the active Tab.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.activeTab) },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the generated tab list.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    children: {
      control: false,
      description: 'Named `tabs` and `content` templates with matching children.',
      table: {
        category: 'Props',
        type: { summary: 'Template<"tabs"> | Template<"content">' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Tabs root.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables every Tab in the component.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    onChange: {
      control: false,
      description: 'Called with the active Tab index after selection changes.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
  },
} satisfies Meta<TabsStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tabs: Story = {};
