import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/SplitLayout';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import { SplitLayout as SplitLayoutComponent, SplitLayoutItem } from './components';

type SplitLayoutStoryArgs = ComponentProps<typeof SplitLayoutComponent>;

const meta = {
  title: 'Components/SplitLayout',
  component: SplitLayoutComponent,
  render: args => (
    <div style={{ height: 220, width: '100%' }}>
      <SplitLayoutComponent {...args}>
        <SplitLayoutItem ariaLabel='Navigation'>Navigation</SplitLayoutItem>
        <SplitLayoutItem ariaLabel='Document'>Document</SplitLayoutItem>
      </SplitLayoutComponent>
    </div>
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
    ...DEFAULT_PROPS,
    onSizesChange: fn(),
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the panel group.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the SplitLayout.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents resizing and applies is-disabled.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    keyboardStep: {
      control: 'number',
      description: 'Percentage moved per arrow-key activation.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.keyboardStep) },
      },
    },
    minSize: {
      control: 'number',
      description: 'Minimum percentage for each adjacent panel.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.minSize) },
      },
    },
    onSizesChange: {
      control: false,
      description: 'Called with normalized percentages after resizing.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Panel and separator axis.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.orientation },
      },
    },
  },
} satisfies Meta<SplitLayoutStoryArgs>;

export default meta;
type Story = StoryObj<SplitLayoutStoryArgs>;

export const SplitLayout: Story = {};
