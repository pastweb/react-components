import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Carousel';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { fn } from 'storybook/test';
import {
  Carousel as CarouselComponent,
  CarouselItem,
} from './components';

const slides = [
  <CarouselItem key='build-behavior'>
    <h2>Build behavior once</h2>
    <p>Share component behavior across framework renderers.</p>
  </CarouselItem>,
  <CarouselItem key='native-semantics'>
    <h2>Keep native semantics</h2>
    <p>Accessible roles, names, and keyboard interactions stay visible.</p>
  </CarouselItem>,
  <CarouselItem key='bring-styles'>
    <h2>Bring your own styles</h2>
    <p>The core renderer remains intentionally unstyled.</p>
  </CarouselItem>,
];

const meta = {
  title: 'Components/Carousel',
  component: CarouselComponent,
  parameters: {
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  args: {
    ...DEFAULT_PROPS,
    ariaLabel: 'Pastweb highlights',
    children: slides,
    onCurrentChange: fn(),
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the Carousel region.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    autoPlay: {
      control: 'boolean',
      description: 'Starts automatic slide rotation.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.autoPlay) },
      },
    },
    autoPlayInterval: {
      control: {
        type: 'number',
        min: 0,
        step: 500,
      },
      description: 'Delay between automatic slide changes in milliseconds.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.autoPlayInterval) },
      },
    },
    children: {
      control: false,
      description: 'One CarouselItem component or a collection of CarouselItem components.',
      table: {
        category: 'Props',
        type: { summary: 'CarouselItem | CarouselItem[]' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Carousel root.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    current: {
      control: {
        type: 'number',
        min: 0,
        max: slides.length - 1,
        step: 1,
      },
      description: 'Initial zero-based index of the visible slide.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.current) },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables Carousel navigation and autoplay controls.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
    id: {
      control: 'text',
      description: 'Explicit Carousel root ID. A stable ID is generated when omitted.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'generated' },
      },
    },
    nextAriaLabel: {
      control: 'text',
      description: 'Accessible label for the next-slide control.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.nextAriaLabel) },
      },
    },
    onCurrentChange: {
      control: false,
      description: 'Called when the visible slide index changes.',
      table: { category: 'Props' },
    },
    pauseAriaLabel: {
      control: 'text',
      description: 'Accessible label for pausing automatic rotation.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.pauseAriaLabel) },
      },
    },
    prevAriaLabel: {
      control: 'text',
      description: 'Accessible label for the previous-slide control.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.prevAriaLabel) },
      },
    },
    resumeAriaLabel: {
      control: 'text',
      description: 'Accessible label for resuming automatic rotation.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.resumeAriaLabel) },
      },
    },
    showCommands: {
      control: 'boolean',
      description: 'Shows the built-in previous, autoplay, and next controls.',
      table: {
        category: 'Props',
        defaultValue: { summary: String(DEFAULT_PROPS.showCommands) },
      },
    },
  },
} satisfies Meta<typeof CarouselComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carousel: Story = {};
