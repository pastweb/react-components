import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/react-components/Panel';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Panel as PanelComponent } from './components';

type PanelStoryArgs = ComponentProps<typeof PanelComponent> & SharedCssModuleArgs & {
  footer: string;
  header: string;
};

const meta = {
  title: 'Components/Panel',
  component: PanelComponent,
  render: ({
    children,
    className,
    theme,
    sizeClass,
    outlined,
    footer,
    header,
    ...args
  }) => (
    withSharedCssModules(
      <PanelComponent
        {...args}
        className={sharedCssModuleClassName(className, { theme, sizeClass, outlined })}
      >
        {children}
        {header ? <Template name='header'>{header}</Template> : null}
        {footer ? <Template name='footer'>{footer}</Template> : null}
      </PanelComponent>,
    )
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
    ...SHARED_CSS_MODULE_ARGS,
    ...DEFAULT_PROPS,
    children: 'Account details and related actions stay grouped in this panel.',
    footer: '',
    header: '',
    title: 'Account',
    onClose: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when no title is supplied. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    border: {
      control: 'boolean',
      description: 'Applies the has-border class.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.border) },
      },
    },
    borderRadius: {
      control: 'boolean',
      description: 'Applies the has-border-radius class.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.borderRadius) },
      },
    },
    children: {
      control: 'text',
      description: 'Body content rendered inside the Panel.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Panel.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    closeButton: {
      control: 'boolean',
      description: 'Displays the native close button.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.closeButton) },
      },
    },
    closeLabel: {
      control: 'text',
      description: 'Accessible name for the close button.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.closeLabel) },
      },
    },
    contentPadding: {
      control: 'text',
      description: 'Inline padding applied to the content area.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.contentPadding) },
      },
    },
    footer: {
      control: 'text',
      description: 'Projects into the footer slot.',
      table: { category: 'Props' },
    },
    header: {
      control: 'text',
      description: 'Replaces the default header content when supplied.',
      table: { category: 'Props' },
    },
    headingLevel: {
      control: 'select',
      options: [2, 3, 4, 5, 6],
      description: 'Native title heading level.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.headingLevel) },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Panel ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    onClose: {
      control: false,
      description: 'Called when the close action is activated.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    rtl: {
      control: 'boolean',
      description: 'Reverses header content order.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.rtl) },
      },
    },
    title: {
      control: 'text',
      description: 'Default heading content inside the header.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.title) },
      },
    },
  },
} satisfies Meta<PanelStoryArgs>;

export default meta;
type Story = StoryObj<PanelStoryArgs>;

export const Panel: Story = {};
