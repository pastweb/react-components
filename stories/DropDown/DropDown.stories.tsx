import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/react-components/DropDown';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import { Button } from '../Button/components';
import { DropDown as DropDownComponent } from './components';

type DropDownStoryArgs = ComponentProps<typeof DropDownComponent> & {
  header: string;
  content: string;
  footer: string;
};

const meta = {
  title: 'Components/DropDown',
  component: DropDownComponent,
  render: ({ header, content, footer, children, ...args }) => (
    <DropDownComponent {...args}>
      <Button disabled={args.disabled}>{children}</Button>
      {header ? <Template name='header'>{header}</Template> : null}
      {content ? <Template name='content'>{content}</Template> : null}
      {footer ? <Template name='footer'>{footer}</Template> : null}
    </DropDownComponent>
  ),
  parameters: {
    layout: 'centered',
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 260,
          width: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    ...DEFAULT_PROPS,
    ariaLabel: '',
    children: 'Account actions',
    header: '',
    content: 'Sign out',
    footer: '',
    onClick: fn(),
    onChange: fn(),
    onContext: fn(),
    onClickOut: fn(),
    onMouseEnter: fn(),
    onMouseLeave: fn(),
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when the trigger content does not provide a name. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    arrow: {
      control: 'boolean',
      description: 'Displays the visual arrow on the revealed content.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.arrow) },
      },
    },
    children: {
      control: 'text',
      description: 'Label rendered inside the trigger Button.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the DropDown root.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    clickTimeGap: {
      control: {
        type: 'number',
        min: 0,
        step: 1,
      },
      description: 'Delay for click and context-menu activation in milliseconds.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.clickTimeGap) },
      },
    },
    content: {
      control: 'text',
      description: 'Projects into the content slot of the revealed panel.',
      table: { category: 'Props' },
    },
    contentClassName: {
      control: 'text',
      description: 'Additional class names applied to the revealed content.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.contentClassName) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents the DropDown from opening.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    footer: {
      control: 'text',
      description: 'Projects into the footer slot of the revealed panel.',
      table: { category: 'Props' },
    },
    header: {
      control: 'text',
      description: 'Projects into the header slot of the revealed panel.',
      table: { category: 'Props' },
    },
    hideOnBlur: {
      control: 'boolean',
      description: 'Closes when focus leaves the DropDown.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.hideOnBlur) },
      },
    },
    hideOnClick: {
      control: 'boolean',
      description: 'Closes after activation inside the revealed content.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.hideOnClick) },
      },
    },
    hideOnClickOut: {
      control: 'boolean',
      description: 'Closes after activation outside the DropDown.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.hideOnClickOut) },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit base ID for trigger and content relationships. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    isVisible: {
      control: 'boolean',
      description: 'Controls the requested visibility of the revealed content.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.isVisible) },
      },
    },
    offset: {
      control: {
        type: 'number',
        min: 0,
        step: 1,
      },
      description: 'Positioning offset between the trigger and revealed content.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.offset) },
      },
    },
    onChange: {
      control: false,
      description: 'Called with the visibility boolean when it changes.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    onClick: {
      control: false,
      description: 'Called when click activation opens or toggles the DropDown.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    onClickOut: {
      control: false,
      description: 'Called when an outside activation closed the content.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    onContext: {
      control: false,
      description: 'Called when context-menu activation opens the DropDown.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    onMouseEnter: {
      control: false,
      description: 'Called when hover opens the DropDown.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    onMouseLeave: {
      control: false,
      description: 'Called when hover closes the DropDown.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description: 'Requested placement of the revealed content relative to the trigger.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.placement },
      },
    },
    position: {
      control: 'select',
      options: ['absolute', 'fixed'],
      description: 'Web positioning strategy for the revealed content.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.position },
      },
    },
    visibleOn: {
      control: 'select',
      options: ['click', 'over', 'context'],
      description: 'Activation model. Essential content must remain available without hover or a context-menu gesture.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.visibleOn },
      },
    },
    visibleTarget: {
      control: 'select',
      options: ['element', 'pointer'],
      description: 'Selects whether positioning uses the trigger element or the pointer position.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.visibleTarget },
      },
    },
  },
} satisfies Meta<DropDownStoryArgs>;

export default meta;
type Story = StoryObj<DropDownStoryArgs>;

export const DropDown: Story = {
  args: {
    offset: 2,
    placement: "left"
  }
};
