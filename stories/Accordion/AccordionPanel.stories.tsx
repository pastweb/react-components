import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_ACCORDION_PANEL_PROPS } from '@pastweb/react-components/Accordion';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import {
  Accordion,
  AccordionPanel as AccordionPanelComponent,
} from './components';

const meta = {
  title: 'Components/Accordion/AccordionPanel',
  component: AccordionPanelComponent,
  parameters: {
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  args: {
    ...DEFAULT_ACCORDION_PANEL_PROPS,
    children: 'Pastweb provides framework-neutral component behavior with accessible renderers for supported UI frameworks.',
    title: 'What is Pastweb?',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content rendered inside the first AccordionPanel.',
      table: { category: 'Props' },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the first AccordionPanel root.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: JSON.stringify(DEFAULT_ACCORDION_PANEL_PROPS.className),
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the first AccordionPanel trigger.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: '-',
        },
      },
    },
    headingLevel: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading level used by the first AccordionPanel.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: String(DEFAULT_ACCORDION_PANEL_PROPS.headingLevel),
        },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit ID for the first AccordionPanel. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Initial open state of the first AccordionPanel.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: '-',
        },
      },
    },
    landmark: {
      control: 'boolean',
      description: 'Exposes the first AccordionPanel content as a region landmark.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: '-',
        },
      },
    },
    onOpenChange: {
      control: false,
      description: 'Called when the first AccordionPanel open state changes.',
      table: { category: 'Props' },
    },
    rtl: {
      control: 'boolean',
      description: 'Enables right-to-left layout for the first AccordionPanel header.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: '-',
        },
      },
    },
    title: {
      control: 'text',
      description: 'Heading text rendered by the first AccordionPanel.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: JSON.stringify(DEFAULT_ACCORDION_PANEL_PROPS.title),
        },
      },
    },
    transitionDuration: {
      control: {
        type: 'number',
        min: 0,
        step: 50,
      },
      description: 'Open and close transition duration for the first AccordionPanel in milliseconds.',
      table: {
        category: 'Props',
        defaultValue: { summary: '500ms (stylesheet)' },
      },
    },
  },
} satisfies Meta<typeof AccordionPanelComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccordionPanel: Story = {
  render: (args) => (
    <Accordion>
      {[
        <AccordionPanelComponent {...args} key='what-is-pastweb' />,
        <AccordionPanelComponent key='open-another-panel' title='Can I open another panel?'>
          Yes. Each panel can be opened and closed independently.
        </AccordionPanelComponent>,
        <AccordionPanelComponent key='keyboard-input' title='Is keyboard input supported?'>
          Use Tab to focus a heading, then Enter or Space to toggle its panel.
        </AccordionPanelComponent>,
      ]}
    </Accordion>
  ),
};
