import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS, useWindowContext } from '@pastweb/react-components/WindowController';
import { Panel } from '../Panel/components';
import { WindowController as WindowControllerComponent } from './components';

type WindowControllerStoryArgs = Omit<ComponentProps<typeof WindowControllerComponent>, 'children'> & {
  content: string;
  title: string;
};

function WindowContent({ content, title }: Pick<WindowControllerStoryArgs, 'content' | 'title'>) {
  const { close } = useWindowContext();

  return <Panel closeButton onClose={() => close()} title={title}>{content}</Panel>;
}

const meta = {
  title: 'Components/WindowController',
  component: WindowControllerComponent,
  render: ({ content, title, ...args }) => (
    <WindowControllerComponent {...args}>
      <WindowContent content={content} title={title} />
    </WindowControllerComponent>
  ),
  parameters: { layout: 'fullscreen' },
  args: {
    ...DEFAULT_PROPS,
    ariaLabel: 'Account settings',
    content: 'Update your profile details, then save your changes.',
    title: 'Account settings',
  },
  argTypes: {
    animation: { control: 'object', description: 'Entry and exit animation configuration.', table: { category: 'Props', defaultValue: { summary: 'ANIMATIONS.zoom' } } },
    ariaLabel: { control: 'text', description: 'Accessible name announced for the dialog.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) } } },
    closeOnBackdropClick: { control: 'boolean', description: 'Closes a modal window when its backdrop is activated.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.closeOnBackdropClick) } } },
    closeOnEscape: { control: 'boolean', description: 'Closes the window when Escape is pressed.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.closeOnEscape) } } },
    content: { control: 'text', description: 'Body content rendered by the Panel inside the window.', table: { category: 'Example' } },
    height: { control: { type: 'number', min: 100, step: 10 }, description: 'Initial window height in pixels.', table: { category: 'Props' } },
    mode: { control: 'select', options: ['modal', 'floating'], description: 'Modal dialog or movable floating work surface.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.mode) } } },
    resizable: { control: 'boolean', description: 'Enables resize handles for floating windows.', table: { category: 'Props', defaultValue: { summary: '-' } } },
    title: { control: 'text', description: 'Panel heading inside the window.', table: { category: 'Example' } },
    width: { control: { type: 'number', min: 100, step: 10 }, description: 'Initial window width in pixels.', table: { category: 'Props' } },
  },
} satisfies Meta<WindowControllerStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WindowController: Story = {};
