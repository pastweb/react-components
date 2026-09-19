import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/ProgressBar';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { ProgressBar as ProgressBarComponent } from './components';

type ProgressBarStoryArgs = ComponentProps<typeof ProgressBarComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBarComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <ProgressBarComponent
        {...args}
        className={sharedCssModuleClassName(className, { theme, sizeClass, outlined })}
      />,
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
    percentage: 45,
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the progressbar. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the ProgressBar.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    current: {
      control: 'number',
      description: 'Current value used with total when percentage is omitted.',
      table: { category: 'Props' },
    },
    label: {
      control: 'text',
      description: 'Visible and accessible value suffix. Pass an empty string to hide the label.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.label) },
      },
    },
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Direct percentage, clamped from 0 to 100.',
      table: { category: 'Props' },
    },
    size: {
      control: 'number',
      description: 'Circular SVG coordinate size.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.size) },
      },
    },
    total: {
      control: 'number',
      description: 'Total used with current when percentage is omitted.',
      table: { category: 'Props' },
    },
    type: {
      control: 'select',
      options: ['linear', 'circular'],
      description: 'Visual presentation.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.type },
      },
    },
  },
} satisfies Meta<ProgressBarStoryArgs>;

export default meta;
type Story = StoryObj<ProgressBarStoryArgs>;

export const ProgressBar: Story = {};
