import { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createEntry,
  Portal,
  PortalsProvider,
  usePortal,
  WindowManagerProvider,
} from '@pastweb/react';
import { createWindowManager } from '@pastweb/tools';
import { useWindowContext } from '@pastweb/react-components/WindowController';
import { Button } from '../Button/components';
import { Panel } from '../Panel/components';
import { WindowController } from '../WindowController/components';
import { TaskBar as TaskBarComponent } from './components';
import type { TaskBarProps } from './components';

const anchorsIds = { window: 'taskbar-preview-window-anchor' };

type TaskBarStoryArgs = Omit<TaskBarProps, 'manager'>;

function ManagedWindowContent({ title }: { title: string }) {
  const { close } = useWindowContext();

  return <Panel closeButton onClose={() => close()} title={title}>This window has a TaskBar button.</Panel>;
}

function ManagedWindow({ manager, number }: { manager: ReturnType<typeof createWindowManager>; number: number }) {
  const portal = usePortal();
  const title = `Window ${number}`;

  useEffect(() => {
    const id = portal.open();
    if (id) manager.setMeta(id, { label: title });
  }, [manager, portal, title]);

  return (
    <Portal path='window' use={portal} manager={manager}>
      <WindowController manager={manager} mode='floating' ariaLabel={title}>
        <ManagedWindowContent title={title} />
      </WindowController>
    </Portal>
  );
}

function TaskBarPreview(props: TaskBarStoryArgs) {
  const manager = useMemo(() => createWindowManager(), []);
  const [windows, setWindows] = useState<number[]>([]);
  const getEntry = useMemo(
    () => () => createEntry({
      Providers: ({ children }) => (
        <PortalsProvider anchorsIds={anchorsIds} getEntry={getEntry}>
          <WindowManagerProvider manager={manager}>{children}</WindowManagerProvider>
        </PortalsProvider>
      ),
    }),
    [manager],
  );

  return (
    <PortalsProvider anchorsIds={anchorsIds} getEntry={getEntry}>
      <WindowManagerProvider manager={manager}>
        <div style={{ display: 'grid', gap: '1rem', width: 'min(100%, 42rem)' }}>
          <Button onClick={() => setWindows(current => [...current, current.length + 1])}>Open window</Button>
          <p>Each opened window appears in the taskbar. Select the active window again to minimize it.</p>
          <TaskBarComponent {...props} manager={manager} />
          {windows.map(number => <ManagedWindow key={number} manager={manager} number={number} />)}
        </div>
        <div id={anchorsIds.window} />
      </WindowManagerProvider>
    </PortalsProvider>
  );
}

const meta = {
  title: 'Components/TaskBar',
  component: TaskBarComponent,
  render: args => <TaskBarPreview {...args} />,
  parameters: { layout: 'fullscreen' },
  args: { ariaLabel: 'Window taskbar' },
  argTypes: {
    ariaLabel: { control: 'text', description: 'Accessible name for the taskbar navigation landmark.', table: { category: 'Props', defaultValue: { summary: '"Window taskbar"' } } },
    className: { control: 'text', description: 'Additional classes applied to the TaskBar root.', table: { category: 'Props', defaultValue: { summary: '""' } } },
    getLabel: { control: false, description: 'Resolves a visible label for each managed window.', table: { category: 'Props', defaultValue: { summary: 'window.meta.label ?? window.meta.title ?? window.id' } } },
  },
} satisfies Meta<TaskBarStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskBar: Story = {};
