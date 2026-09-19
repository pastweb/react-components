import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/react-components/Notification';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Notification as NotificationComponent } from './components';

type NotificationStoryArgs = ComponentProps<typeof NotificationComponent> & SharedCssModuleArgs & {
  footer: string;
  fullWidth: boolean;
  header: string;
};

const meta = {
  title: 'Components/Notification',
  component: NotificationComponent,
  render: ({
    className,
    theme,
    sizeClass,
    outlined,
    footer,
    fullWidth,
    header,
    children,
    ...args
  }) => (
    withSharedCssModules(
      <NotificationComponent
        {...args}
        className={sharedCssModuleClassName(
          className,
          { theme, sizeClass, outlined },
          fullWidth && 'is-full-width',
        )}
      >
        {children}
        {header ? <Template name='header'>{header}</Template> : null}
        {footer ? <Template name='footer'>{footer}</Template> : null}
      </NotificationComponent>,
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
    fullWidth: false,
    ...DEFAULT_PROPS,
    children: 'Your changes were saved.',
    footer: '',
    header: '',
    title: 'Saved',
    onClose: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    fullWidth: {
      name: 'is-full-width',
      control: 'boolean',
      description: 'Makes the Notification fill the available width.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for an optional notification region. Pass an empty string to omit the region role.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    children: {
      control: 'text',
      description: 'Politely announced message content.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Notification.',
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
      description: 'Default title content inside the header.',
      table: { category: 'Props' },
    },
  },
} satisfies Meta<NotificationStoryArgs>;

export default meta;
type Story = StoryObj<NotificationStoryArgs>;

export const Notification: Story = {};
