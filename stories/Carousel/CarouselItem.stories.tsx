import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_CAROUSEL_ITEM_PROPS } from '@pastweb/react-components/Carousel';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import {
  Carousel,
  CarouselItem as CarouselItemComponent,
} from './components';

const firstSlide = (
  <>
    <h2>Build behavior once</h2>
    <p>Share component behavior across framework renderers.</p>
  </>
);

const meta = {
  title: 'Components/Carousel/CarouselItem',
  component: CarouselItemComponent,
  parameters: {
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...INITIAL_VIEWPORTS,
      },
    },
  },
  args: {
    ...DEFAULT_CAROUSEL_ITEM_PROPS,
    children: firstSlide,
  },
  argTypes: {
    children: {
      control: false,
      description: 'Content rendered inside the first CarouselItem.',
      table: {
        category: 'Props',
        type: { summary: 'ReactNode | ReactNode[]' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the first CarouselItem.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: JSON.stringify(DEFAULT_CAROUSEL_ITEM_PROPS.className),
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the first CarouselItem.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: String(DEFAULT_CAROUSEL_ITEM_PROPS.disabled),
        },
      },
    },
  },
} satisfies Meta<typeof CarouselItemComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CarouselItem: Story = {
  render: (args) => (
    <Carousel ariaLabel='Pastweb highlights'>
      {[
        <CarouselItemComponent {...args} key='build-behavior' />,
        <CarouselItemComponent key='native-semantics'>
          <h2>Keep native semantics</h2>
          <p>Accessible roles, names, and keyboard interactions stay visible.</p>
        </CarouselItemComponent>,
        <CarouselItemComponent key='bring-styles'>
          <h2>Bring your own styles</h2>
          <p>The core renderer remains intentionally unstyled.</p>
        </CarouselItemComponent>,
      ]}
    </Carousel>
  ),
};
