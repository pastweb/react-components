import { type ComponentProps, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createEntry,
  Portal,
  PortalsProvider,
  usePortal,
} from '@pastweb/react';
import { DEFAULT_PROPS, useSheetContext } from '@pastweb/react-components/SheetController';
import { Button } from '../Button/components';
import { Panel } from '../Panel/components';
import { SheetController as SheetControllerComponent } from './components';

const anchorsIds = { viewSheet: 'sheet-controller-preview-anchor' };

type SheetControllerStoryArgs = ComponentProps<typeof SheetControllerComponent> & {
  children: string;
  panelTitle: string;
};

function SheetPanel({ children, panelTitle }: Pick<SheetControllerStoryArgs, 'children' | 'panelTitle'>) {
  const { close } = useSheetContext();

  return (
    <Panel closeButton onClose={() => close()} title={panelTitle}>
      {children}
    </Panel>
  );
}

function SheetLauncher(props: SheetControllerStoryArgs) {
  const portal = usePortal();

  return (
    <>
      <Button onClick={() => portal.open()}>Open sheet</Button>
      <Portal path='viewSheet' use={portal}>
        <SheetControllerComponent {...props}>
          <SheetPanel panelTitle={props.panelTitle}>{props.children}</SheetPanel>
        </SheetControllerComponent>
      </Portal>
      <div id={anchorsIds.viewSheet} />
    </>
  );
}

function SheetControllerPreview(props: SheetControllerStoryArgs) {
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
      <SheetLauncher {...props} />
    </PortalsProvider>
  );
}

const meta = {
  title: 'Components/SheetController',
  component: SheetControllerComponent,
  render: args => <SheetControllerPreview {...args} />,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    ...DEFAULT_PROPS,
    ariaLabel: 'Account settings',
    backdrop: true,
    children: 'Update your profile details, then save your changes.',
    direction: 'right',
    modal: true,
    panelTitle: 'Account settings',
  },
  argTypes: {
    animationTime: {
      control: { type: 'number', min: 0, step: 50 },
      description: 'Fallback exit-animation duration in milliseconds.',
      table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.animationTime) } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name announced for the dialog.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) } },
    },
    backdrop: {
      control: 'boolean',
      description: 'Displays a native backdrop button behind the sheet.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    children: {
      control: 'text',
      description: 'Content rendered inside the Panel in the sheet.',
      table: { category: 'Props' },
    },
    className: { control: false },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Closes the sheet when its backdrop is activated.',
      table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.closeOnBackdropClick) } },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Closes the sheet when Escape is pressed.',
      table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.closeOnEscape) } },
    },
    direction: {
      control: 'select',
      options: ['left', 'right', 'up', 'down'],
      description: 'Edge from which the sheet enters and exits.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.direction) } },
    },
    modal: {
      control: 'boolean',
      description: 'Enables modal dialog semantics and focus containment.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    panelTitle: {
      control: 'text',
      description: 'Heading rendered by the Panel inside the sheet.',
      table: { category: 'Example' },
    },
  },
} satisfies Meta<SheetControllerStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SheetController: Story = {};
