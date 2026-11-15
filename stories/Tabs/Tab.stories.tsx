import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from '@pastweb/react';
import { DEFAULT_TAB_PROPS } from '@pastweb/react-components/Tabs/Tab/constants';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  Tab as TabComponent,
  Tabs,
} from './components';
import {
  ACCESSIBILITY_CONTENT,
  OVERVIEW_CONTENT,
  STYLING_CONTENT,
} from './content';

const meta = {
  title: 'Components/Tabs/Tab',
  component: TabComponent,
  parameters: {
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  args: {
    ...DEFAULT_TAB_PROPS,
    children: 'Overview',
    onClick: fn(),
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Optional accessible name for the first Tab.',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: 'text',
      description: 'Content rendered inside the first Tab.',
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the first Tab.',
      table: {
        defaultValue: { summary: JSON.stringify(DEFAULT_TAB_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the first Tab.',
      table: {
        defaultValue: { summary: '-' },
      },
    },
    onClick: {
      control: false,
      description: 'Called when the first enabled Tab is selected.',
      table: {
        defaultValue: { summary: 'noop' },
      },
    },
  },
} satisfies Meta<typeof TabComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tab: Story = {
  render: (args) => (
    <Tabs ariaLabel='Pastweb documentation'>
      <Template name='tabs'>
        <TabComponent {...args} />
        <TabComponent>Accessibility</TabComponent>
        <TabComponent>Styling</TabComponent>
      </Template>
      <Template name='content'>
        {OVERVIEW_CONTENT}
        {ACCESSIBILITY_CONTENT}
        {STYLING_CONTENT}
      </Template>
    </Tabs>
  ),
};
