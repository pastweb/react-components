import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Accordion';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Accordion as AccordionComponent, AccordionPanel } from './components';

type AccordionStoryArgs = ComponentProps<typeof AccordionComponent> & SharedCssModuleArgs;

const panels = [
  <AccordionPanel key='what-is-pastweb' title='What is Pastweb?'>
    Pastweb provides framework-neutral component behavior with accessible
    renderers for supported UI frameworks.
  </AccordionPanel>,
  <AccordionPanel key='open-another-panel' title='Can I open another panel?'>
    Yes. Each panel can be opened and closed independently.
  </AccordionPanel>,
  <AccordionPanel key='keyboard-input' title='Is keyboard input supported?'>
    Use Tab to focus a heading, then Enter or Space to toggle its panel.
  </AccordionPanel>,
];

const meta = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <AccordionComponent
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
    children: panels,
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the Accordion group.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    children: {
      control: false,
      description: 'One AccordionPanel component or a collection of AccordionPanel components.',
      table: {
        category: 'Props',
        type: { summary: 'AccordionPanel | AccordionPanel[]' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Accordion root.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables every AccordionPanel trigger.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Accordion root ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    rtl: {
      control: 'boolean',
      description: 'Enables right-to-left panel header layout.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    transitionDuration: {
      control: {
        type: 'number',
        min: 0,
        step: 50,
      },
      description: 'Open and close transition duration in milliseconds.',
      table: {
        category: 'Props',
        defaultValue: { summary: '500ms (stylesheet)' },
      },
    },
  },
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accordion: Story = {};
