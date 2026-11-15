import { type ComponentProps, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createEntry,
  Portal,
  PortalsProvider,
  usePortal,
} from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/components-core/ToastController';
import { useToastContext } from '@pastweb/react-components/ToastController';
import { Button } from '../Button/components';
import { Notification } from '../Notification/components';
import { ToastController as ToastControllerComponent } from './components';

const anchorsIds = { toaster: 'toast-controller-preview-anchor' };

type ToastControllerStoryArgs = Omit<ComponentProps<typeof ToastControllerComponent>, 'children'> & {
  message: string;
  title: string;
};

function ToastContent({ message, title }: Pick<ToastControllerStoryArgs, 'message' | 'title'>) {
  const { close } = useToastContext();

  return (
    <Notification onClose={() => close()} title={title}>
      {message}
    </Notification>
  );
}

function ToastLauncher({ message, title, ...props }: ToastControllerStoryArgs) {
  const portal = usePortal();

  return (
    <>
      <Button onClick={() => portal.open()}>Show toast</Button>
      <Portal path='toaster' use={portal}>
        <ToastControllerComponent {...props}>
          <ToastContent message={message} title={title} />
        </ToastControllerComponent>
      </Portal>
      <div id={anchorsIds.toaster} />
    </>
  );
}

function ToastControllerPreview(props: ToastControllerStoryArgs) {
  const getEntry = useMemo(
    () => () => createEntry({
      Providers: ({ children }) => (
        <PortalsProvider anchorsIds={anchorsIds} getEntry={getEntry}>
          {children}
        </PortalsProvider>
      ),
    }),
    [],
  );

  return (
    <PortalsProvider anchorsIds={anchorsIds} getEntry={getEntry}>
      <ToastLauncher {...props} />
    </PortalsProvider>
  );
}

const meta = {
  title: 'Components/ToastController',
  component: ToastControllerComponent,
  render: args => <ToastControllerPreview {...args} />,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...DEFAULT_PROPS,
    ariaLabel: 'Saved',
    delay: 5,
    message: 'Your changes are now available.',
    title: 'Saved',
  },
  argTypes: {
    animation: {
      control: 'object',
      description: 'Entry and exit animation configuration.',
      table: { category: 'Props', defaultValue: { summary: 'ANIMATIONS.slide' } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the polite status region.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) } },
    },
    closeOnEscKey: {
      control: 'boolean',
      description: 'Dismisses the toast when Escape is pressed.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    delay: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Auto-dismiss delay in seconds.',
      table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.delay) } },
    },
    message: {
      control: 'text',
      description: 'Message rendered by the Notification inside the toast.',
      table: { category: 'Example' },
    },
    padding: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Inner toast padding in pixels.',
      table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.padding) } },
    },
    pauseTimerOnOver: {
      control: 'boolean',
      description: 'Pauses auto-dismiss while pointer or keyboard focus is inside the toast.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    placement: {
      control: 'select',
      options: ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'],
      description: 'Viewport corner or edge where the toast appears.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.placement) } },
    },
    resetTimerOnPause: {
      control: 'boolean',
      description: 'Restarts the delay when a paused timer resumes.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    timeUpdate: {
      control: { type: 'number', min: 1, step: 1 },
      description: 'Timer update interval in milliseconds.',
      table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.timeUpdate) } },
    },
    title: {
      control: 'text',
      description: 'Heading rendered by the Notification inside the toast.',
      table: { category: 'Example' },
    },
  },
} satisfies Meta<ToastControllerStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToastController: Story = {};
