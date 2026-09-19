import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import {
  cleanup,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { Template } from '@pastweb/react';
import {
  Tab,
  TabContent,
  Tabs,
} from '../../src/Tabs';

const cls = (...values: any[]) => values
  .flatMap(value => {
    if (!value) return [];
    if (typeof value === 'string') return value;
    return Object.entries(value)
      .filter(([, enabled]) => enabled)
      .map(([name]) => name);
  })
  .join(' ');

afterEach(cleanup);

describe('Tabs', () => {
  it('given linked tabs and panels, when ArrowRight is pressed, then selection, focus, and relationships update accessibly', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tabs cls={cls} ariaLabel='Profile sections'>
        <Template name='tabs'>
          <Tab cls={cls}>Details</Tab>
          <Tab cls={cls}>Security</Tab>
        </Template>
        <TabContent cls={cls}>Details panel</TabContent>
        <TabContent cls={cls}>Security panel</TabContent>
      </Tabs>,
    );
    const tabs = screen.getAllByRole('tab');

    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0].id).toMatch(/^tabtabs_/);
    tabs[0].focus();
    await user.keyboard('{ArrowRight}');

    await waitFor(() => {
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    });

    const panel = screen.getByRole('tabpanel');
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tabs[1].id);
    expect(panel).toHaveTextContent('Security panel');
    expect((await axe.run(container)).violations).toHaveLength(0);
  });

  it('given disabled Tabs, when rendered, then every Tab is natively disabled and the root exposes its state', () => {
    const { container } = render(
      <Tabs cls={cls} className='custom-tabs' disabled>
        <Template name='tabs'>
          <Tab cls={cls} className='custom-tab'>Details</Tab>
          <Tab cls={cls}>Security</Tab>
        </Template>
        <TabContent cls={cls}>Details panel</TabContent>
        <TabContent cls={cls}>Security panel</TabContent>
      </Tabs>,
    );

    expect(container.firstElementChild).toHaveClass(
      'Tabs',
      'is-disabled',
      'custom-tabs',
    );
    expect(container.firstElementChild).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0].parentElement).toHaveClass(
      'Tab',
      'is-active',
      'is-disabled',
      'custom-tab',
    );
    for (const tab of tabs) {
      expect(tab).toBeDisabled();
    }
  });

  it('given left-positioned Tabs, when ArrowDown is pressed, then selection follows the derived vertical orientation', async () => {
    const user = userEvent.setup();
    render(
      <Tabs cls={cls} className='is-left'>
        <Template name='tabs'>
          <Tab cls={cls}>Details</Tab>
          <Tab cls={cls}>Security</Tab>
        </Template>
        <TabContent cls={cls}>Details panel</TabContent>
        <TabContent cls={cls}>Security panel</TabContent>
      </Tabs>,
    );
    const tabs = screen.getAllByRole('tab');

    tabs[0].focus();
    await user.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveFocus();
    });
    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  it('given TabContent children, when rendered, then Tabs renders them without nesting', () => {
    render(
      <Tabs cls={cls} className='is-right custom-tabs'>
        <Template name='tabs'>
          <Tab cls={cls} className='custom-tab'>Details</Tab>
          <Tab cls={cls}>Security</Tab>
        </Template>
        <TabContent cls={cls} className='custom-content'>
          Details panel
        </TabContent>
        <TabContent cls={cls}>Security panel</TabContent>
      </Tabs>,
    );

    expect(screen.getAllByRole('tablist')).toHaveLength(1);
    expect(screen.getAllByRole('tab')).toHaveLength(2);
    expect(screen.getByRole('tablist')).toHaveClass(
      'tabsList',
      'is-right',
      'custom-tabs',
    );
    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
    const panel = screen.getByRole('tabpanel');

    expect(screen.getAllByRole('tab')[0].parentElement).toHaveClass(
      'Tab',
      'is-right',
      'custom-tabs',
      'custom-tab',
      'is-active',
    );
    expect(panel).toHaveClass(
      'TabContent',
      'is-right',
      'custom-tabs',
      'custom-content',
      'is-active',
    );
    expect(panel).toHaveTextContent('Details panel');
    expect(panel.querySelector('[role="tabpanel"]')).toBeNull();
  });
});
