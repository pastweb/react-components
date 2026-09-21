import { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { createEntry, Portal, PortalsProvider, usePortal, useRef } from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/components-core/Walktour';
import type { WalktourStep } from '@pastweb/react-components/Walktour';
import { Button } from '../Button/components';
import { Walktour as WalktourComponent } from './components';
import type { WalktourProps } from './components';

const anchorsIds = { walktour: 'walktour-preview-anchor' };

type WalktourStoryArgs = Omit<WalktourProps, 'open' | 'steps'>;

function WalktourPreview(props: WalktourStoryArgs) {
  const tour = usePortal();
  const welcome = useRef<HTMLElement | null>(null);
  const actions = useRef<HTMLElement | null>(null);
  const summary = useRef<HTMLElement | null>(null);
  const steps: WalktourStep[] = [
    { ref: welcome, title: 'Welcome', description: 'This is the first element in the guided tour.', placement: 'bottom' },
    { ref: actions, title: 'Actions', description: 'Click this target while the step is active to continue.', nextOnTargetClick: true, placement: 'right' },
    { ref: summary, title: 'Summary', description: 'Each step can choose its own placement and labels.', nextLabel: 'Finish', placement: 'top' },
  ];
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
      <div style={{ display: 'grid', gap: '1rem', maxWidth: 480 }}>
        <Button onClick={() => tour.open()}>Start tour</Button>
        <section ref={welcome} style={{ padding: '1rem', border: '1px solid var(--pw_border-color)', borderRadius: 'var(--pw_border-radius)' }}>
          <strong>Welcome panel</strong><p>This target is shown first.</p>
        </section>
        <section ref={actions} style={{ padding: '1rem', border: '1px solid var(--pw_border-color)', borderRadius: 'var(--pw_border-radius)' }}>
          <strong>Action panel</strong><p>Click this panel during the second step.</p>
        </section>
        <section ref={summary} style={{ padding: '1rem', border: '1px solid var(--pw_border-color)', borderRadius: 'var(--pw_border-radius)' }}>
          <strong>Summary panel</strong><p>The last step completes the tour.</p>
        </section>
      </div>
      <Portal path='walktour' use={tour}>
        <WalktourComponent
          {...props}
          open
          steps={steps}
          onOpenChange={open => { if (!open) tour.remove(); }}
        />
      </Portal>
      <div id={anchorsIds.walktour} />
    </PortalsProvider>
  );
}

const meta = {
  title: 'Components/Walktour',
  component: WalktourComponent,
  render: args => <WalktourPreview {...args} />,
  parameters: { layout: 'fullscreen' },
  args: { ...DEFAULT_PROPS, closeOnMaskClick: true },
  argTypes: {
    className: { control: 'text', description: 'Additional classes applied to the Walktour root.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) } } },
    closeOnEscape: { control: 'boolean', description: 'Closes an eligible tour step when Escape is pressed.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.closeOnEscape) } } },
    closeOnMaskClick: { control: 'boolean', description: 'Closes an eligible tour step when the mask is activated.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.closeOnMaskClick) } } },
    disableMask: { control: 'boolean', description: 'Hides the dimmed mask and target spotlight.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.disableMask) } } },
    disableMaskInteraction: { control: 'boolean', description: 'Prevents interaction with the highlighted target.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.disableMaskInteraction) } } },
    maskPadding: { control: { type: 'number', min: 0, step: 1 }, description: 'Space around the highlighted target in pixels.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.maskPadding) } } },
    maskRadius: { control: { type: 'number', min: 0, step: 1 }, description: 'Target spotlight corner radius in pixels.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.maskRadius) } } },
    offset: { control: { type: 'number', min: 0, step: 1 }, description: 'Gap between a target and its tour card in pixels.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.offset) } } },
    placement: { control: 'select', options: ['top', 'right', 'bottom', 'left', 'center'], description: 'Default tour-card placement.', table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.placement) } } },
    scrollIntoView: { control: 'boolean', description: 'Scrolls the active target into view when needed.', table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.scrollIntoView) } } },
  },
} satisfies Meta<WalktourStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Walktour: Story = {};
