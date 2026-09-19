import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Template } from '@pastweb/react';
import { DEFAULT_PROPS } from '@pastweb/react-components/Select/constants';
import { DEFAULT_SELECT_ITEM_PROPS } from '@pastweb/react-components/Select/SelectItem/constants';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import { Select, SelectItem as SelectItemComponent } from './components';

type SelectItemStoryArgs = ComponentProps<typeof SelectItemComponent>;

const meta = {
  title: 'Components/Select/SelectItem',
  component: SelectItemComponent,
  render: args => (
    <Select
      {...DEFAULT_PROPS}
      label='Country'
      placeholder='Choose country'
      onChange={fn()}
    >
      <Template name='content'>
        Choose country
      </Template>
      <Template name='options'>
        <SelectItemComponent {...args} />
        <SelectItemComponent value='fr'>France</SelectItemComponent>
        <SelectItemComponent value='de' disabled>Germany</SelectItemComponent>
      </Template>
    </Select>
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
    ...DEFAULT_SELECT_ITEM_PROPS,
    children: 'United Kingdom',
    value: 'uk',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content rendered inside the first SelectItem.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the first SelectItem.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_SELECT_ITEM_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the first SelectItem.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_SELECT_ITEM_PROPS.disabled) },
      },
    },
    value: {
      control: 'text',
      description: 'Value reported when the first SelectItem is selected.',
      table: { category: 'Props' },
    },
  },
} satisfies Meta<SelectItemStoryArgs>;

export default meta;
type Story = StoryObj<SelectItemStoryArgs>;

export const SelectItem: Story = {};
