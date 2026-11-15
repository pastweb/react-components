import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/components-core/Tooltip';
import { Button } from '../Button/components';
import { Tooltip as TooltipComponent } from './components';

type TooltipStoryArgs = Omit<ComponentProps<typeof TooltipComponent>, 'children'> & {
  children: string;
};

const meta = {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  render: ({ children, ...args }) => (
    <TooltipComponent {...args}>
      <Button>{children}</Button>
    </TooltipComponent>
  ),
  parameters: { layout: 'centered' },
  args: {
    ...DEFAULT_PROPS,
    children: 'Save changes',
    content: 'Saves your changes without leaving this page.',
  },
  argTypes: {
    children: { control: 'text', description: 'Label rendered by the trigger Button.', table: { category: 'Example' } },
    className: { control: 'text', description: 'Additional classes applied to the Tooltip root.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) } } },
    content: { control: 'text', description: 'Short non-interactive description shown for the trigger.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.content) } } },
    disabled: { control: 'boolean', description: 'Prevents the tooltip from opening.', table: { category: 'Props', defaultValue: { summary: '-' } } },
    hideDelay: { control: { type: 'number', min: 0, step: 50 }, description: 'Pointer-leave closing delay in milliseconds.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.hideDelay) } } },
    offset: { control: { type: 'number', min: 0, step: 1 }, description: 'Gap between the trigger and tooltip in pixels.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.offset) } } },
    placement: { control: 'select', options: ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'], description: 'Preferred side and alignment for the tooltip.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.placement) } } },
    showDelay: { control: { type: 'number', min: 0, step: 50 }, description: 'Pointer-hover opening delay in milliseconds.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.showDelay) } } },
    tooltipClassName: { control: 'text', description: 'Additional classes applied to the tooltip surface.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.tooltipClassName) } } },
  },
} satisfies Meta<TooltipStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tooltip: Story = {};
