import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DEFAULT_PROPS } from '@pastweb/react-components/Spinner';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import {
  SHARED_CSS_MODULE_ARGS,
  SHARED_CSS_MODULE_ARG_TYPES,
  sharedCssModuleClassName,
  withSharedCssModules,
  type SharedCssModuleArgs,
} from '../sharedCssModules';
import { Icon as IconComponent } from '../Icon/components';
import { Spinner as SpinnerComponent } from './components';

const SPINNER_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2Z"/></svg>';

type SpinnerStoryArgs = ComponentProps<typeof SpinnerComponent> & SharedCssModuleArgs;

const meta = {
  title: 'Components/Spinner',
  component: SpinnerComponent,
  render: ({ className, theme, sizeClass, outlined, ...args }) => (
    withSharedCssModules(
      <div style={{ display: 'flex', minHeight: 220, width: '100%', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '4rem' }}>
          <SpinnerComponent
            {...args}
            className={sharedCssModuleClassName(className, { theme, sizeClass, outlined })}
          >
            <IconComponent src={SPINNER_ICON} />
          </SpinnerComponent>
        </div>
        <span aria-live='polite'>Loading data…</span>
      </div>,
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
  },
  argTypes: {
    ...SHARED_CSS_MODULE_ARG_TYPES,
    ariaLabel: {
      control: 'text',
      description: 'Accessible status name. Pass an empty string to omit it.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.ariaLabel) },
      },
    },
    className: {
      control: 'text',
      description: 'Additional class names applied to the Spinner.',
      table: {
        category: 'Props',
        defaultValue: { summary: JSON.stringify(DEFAULT_PROPS.className) },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Removes status semantics and applies is-decorative.',
      table: {
        category: 'Props',
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<SpinnerStoryArgs>;

export default meta;
type Story = StoryObj<SpinnerStoryArgs>;

export const Spinner: Story = {};
