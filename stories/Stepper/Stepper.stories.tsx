import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Stepper';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Stepper as StepperComponent } from './components';

type StepperStoryArgs = ComponentProps<typeof StepperComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Stepper',
  component: StepperComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <StepperComponent
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
    active: 2,
    steps: [
      { label: 'Account', description: 'Your details', onClick: fn() },
      { label: 'Payment', description: 'Billing' },
      { label: 'Confirm', description: 'Review', disabled: true },
    ],
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    active: {
      control: 'number',
      description: 'Current one-based step.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.active) },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the ordered sequence.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Stepper.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Visual label position.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.labelPosition },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Visual direction.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.orientation },
      },
    },
    steps: {
      control: false,
      description: 'Ordered steps. This preview includes an actionable first step and a disabled last step.',
      table: { category: 'Props' },
    },
  },
} satisfies Meta<StepperStoryArgs>;

export default meta;
type Story = StoryObj<StepperStoryArgs>;

export const Stepper: Story = {};
