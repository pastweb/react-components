import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/components-core/DateTimePicker';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { DateTimePicker as DateTimePickerComponent } from './components';

type DateTimePickerStoryArgs = ComponentProps<typeof DateTimePickerComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/DateTimePicker',
  component: DateTimePickerComponent,
  render: ({ className, outlined, sizeClass, theme, ...args }) => (
    withSharedCssModules(
      <DateTimePickerComponent
        {...args}
        className={sharedCssModuleClassName(className, { theme, sizeClass, outlined })}
      />,
    )
  ),
  parameters: {
    layout: 'centered',
  },
  args: {
    ...SHARED_CSS_MODULE_ARGS,
    ...DEFAULT_PROPS,
    defaultValue: new Date(2026, 8, 14, 9, 30),
    label: 'Appointment',
    onChange: fn(),
    onOpenChange: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the trigger when no visible label is supplied.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) } },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the DateTimePicker root.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) } },
    },
    defaultValue: {
      control: false,
      description: 'Initial uncontrolled value used by this preview.',
      table: { category: 'Props', type: { summary: 'Date | Date[] | null' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the trigger and calendar controls.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    enableTime: {
      control: 'boolean',
      description: 'Enables hour and minute selection.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    firstDayOfWeek: {
      control: { type: 'number', min: 0, max: 6, step: 1 },
      description: 'First weekday, from 0 for Sunday to 6 for Saturday.',
      table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.firstDayOfWeek) } },
    },
    inline: {
      control: 'boolean',
      description: 'Renders the calendar in the document instead of a popup.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    label: {
      control: 'text',
      description: 'Visible label associated with the picker trigger.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.label) } },
    },
    minuteIncrement: {
      control: { type: 'number', min: 1, max: 60, step: 1 },
      description: 'Minute interval displayed by the time selector.',
      table: { category: 'Props', defaultValue: { summary: String(DEFAULT_PROPS.minuteIncrement) } },
    },
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'Selection model for one date, many dates, or a date range.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.mode) } },
    },
    noCalendar: {
      control: 'boolean',
      description: 'Shows only the time selector when time selection is enabled.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    onChange: {
      control: false,
      description: 'Called with the selected date, dates, or null.',
      table: { category: 'Props', defaultValue: { summary: 'noop' } },
    },
    onOpenChange: {
      control: false,
      description: 'Called when the popup opens or closes.',
      table: { category: 'Props', defaultValue: { summary: 'undefined' } },
    },
    placeholder: {
      control: 'text',
      description: 'Trigger text when no date has been selected.',
      table: { category: 'Props', defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.placeholder) } },
    },
    weekNumbers: {
      control: 'boolean',
      description: 'Displays a week-number column in the calendar.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
    yearSelect: {
      control: 'boolean',
      description: 'Displays a year selector in the calendar header.',
      table: { category: 'Props', defaultValue: { summary: '-' } },
    },
  },
} satisfies Meta<DateTimePickerStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DateTimePicker: Story = {};
