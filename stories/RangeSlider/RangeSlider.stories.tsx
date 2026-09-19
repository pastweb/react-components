import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/RangeSlider';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { RangeSlider as RangeSliderComponent } from './components';

type RangeSliderStoryArgs = ComponentProps<typeof RangeSliderComponent> & SharedCssModuleArgs & {
  fullWidth: boolean;
};

const meta = {
  title: 'Components/RangeSlider',
  component: RangeSliderComponent,
  render: ({ className, theme, sizeClass, outlined, fullWidth, ...args }) => (
    withSharedCssModules(
      <RangeSliderComponent
        {...args}
        className={sharedCssModuleClassName(
          className,
          { theme, sizeClass, outlined },
          fullWidth && 'is-full-width',
        )}
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
    fullWidth: false,
    ...DEFAULT_PROPS,
    label: 'Volume',
    min: 0,
    max: 100,
    value: 25,
    onChange: fn(),
    onMouseUp: fn(),
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    fullWidth: {
      name: 'is-full-width',
      control: 'boolean',
      description: 'Makes the RangeSlider fill the available width.',
      table: {
        category: 'Utility\u00a0Classes',
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name when no visible label is supplied. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the RangeSlider.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Makes the slider unavailable.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.disabled) },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit input ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    label: {
      control: 'text',
      description: 'Visible native label.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.label) },
      },
    },
    labelPlacement: {
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
      description: 'Places the visible label around the slider.',
      table: {
        category: 'Props',
        defaultValue: { summary: DEFAULT_PROPS.labelPlacement },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum value.',
      table: { category: 'Props' },
    },
    min: {
      control: 'number',
      description: 'Minimum value.',
      table: { category: 'Props' },
    },
    onChange: {
      control: false,
      description: 'Called with the current value as it changes.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    onMouseUp: {
      control: false,
      description: 'Called with the committed numeric value.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'noop' },
      },
    },
    step: {
      control: 'number',
      description: 'Native increment.',
      table: { category: 'Props' },
    },
    value: {
      control: 'number',
      description: 'Current value. Defaults to the midpoint of min and max.',
      table: { category: 'Props' },
    },
  },
} satisfies Meta<RangeSliderStoryArgs>;

export default meta;
type Story = StoryObj<RangeSliderStoryArgs>;

export const RangeSlider: Story = {};
