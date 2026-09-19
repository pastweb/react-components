import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/ScrollArea';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { ScrollArea as ScrollAreaComponent } from './components';

type ScrollAreaStoryArgs = ComponentProps<typeof ScrollAreaComponent>;

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollAreaComponent,
  render: ({ children, ...args }) => (
    <div style={{ height: 160, width: '100%' }}>
      <ScrollAreaComponent {...args}>
        {children}
      </ScrollAreaComponent>
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
    ariaLabel: 'Release notes',
    children: [
      'Pastweb keeps overflowing content inside a named, keyboard-focusable viewport. ',
      'Use ScrollArea when a layout must stay bounded. ',
      'Avoid nested scroll regions, and do not hide an axis if that would make content unreachable. ',
      'Arrow keys, PageUp, PageDown, Home, and End scroll this region when it is focused. ',
      'Additional copy is included so the preview overflows vertically and demonstrates the scroll contract.',
    ].join(''),
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the scroll region. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    children: {
      control: 'text',
      description: 'Scrollable content.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the ScrollArea.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    contentPadding: {
      control: 'text',
      description: 'Inline padding scoped to the content viewport.',
      table: { category: 'Props' },
    },
    hideX: {
      control: 'boolean',
      description: 'Suppresses horizontal overflow.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.hideX) },
      },
    },
    hideY: {
      control: 'boolean',
      description: 'Suppresses vertical overflow.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.hideY) },
      },
    },
    id: {
      control: 'text',
      description: 'Root ID.',
      table: { category: 'Props' },
    },
    scrollBottom: {
      control: 'boolean',
      description: 'Requests initial vertical end alignment after mount.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.scrollBottom) },
      },
    },
    scrollRight: {
      control: 'boolean',
      description: 'Requests initial horizontal end alignment after mount.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.scrollRight) },
      },
    },
    tabIndex: {
      control: 'number',
      description: 'Makes the scroll viewport keyboard focusable.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.tabIndex) },
      },
    },
  },
} satisfies Meta<ScrollAreaStoryArgs>;

export default meta;
type Story = StoryObj<ScrollAreaStoryArgs>;

export const ScrollArea: Story = {};
