import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Placeholder';
import { Placeholder as PlaceholderComponent } from './components';

type PlaceholderStoryArgs = ComponentProps<typeof PlaceholderComponent> & { shape: string };

const meta = {
  title: 'Components/Placeholder',
  component: PlaceholderComponent,
  render: ({ className, shape, ...args }) => (
    <PlaceholderComponent {...args} className={[className, shape].filter(Boolean).join(' ')} />
  ),
  parameters: { layout: 'centered' },
  args: { ...DEFAULT_PROPS, shape: '' },
  argTypes: {
    ariaLabel: { control: 'text', description: 'Status name when the placeholder is not decorative.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) } } },
    className: { control: 'text', description: 'Additional root classes.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) } } },
    decorative: { control: 'boolean', description: 'Hides the placeholder from the accessibility tree.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.decorative) } } },
    shape: { control: 'select', options: ['', 'is-circle', 'is-square', 'is-block', 'is-rounded', 'is-pill'], description: 'Shape utility class applied to the placeholder.', table: { category: 'Utility\u00a0Classes', defaultValue: { summary: '""' } } },
  },
} satisfies Meta<PlaceholderStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
