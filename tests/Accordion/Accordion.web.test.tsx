import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Template } from '@pastweb/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Accordion, AccordionPanel } from '../../src/Accordion';

function cls(...values: any[]): string {
  return values
    .flatMap(value => {
      if (!value) return [];
      if (typeof value === 'string') return value;
      if (typeof value === 'object') {
        return Object.entries(value)
          .filter(([, enabled]) => enabled)
          .map(([className]) => className);
      }
      return String(value);
    })
    .join(' ');
}

function getControlledPanel(trigger: HTMLElement): HTMLElement {
  return document.getElementById(trigger.getAttribute('aria-controls')!)!;
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Accordion', () => {
  it('given no transition duration or Accordion context, when rendered, then inline duration is omitted', () => {
    render(
      <AccordionPanel cls={cls} title='Standalone panel'>
        Standalone content
      </AccordionPanel>,
    );

    const panel = screen.getByRole('button', { name: 'Standalone panel' })
      .closest('section') as HTMLElement;

    expect(panel.style.transitionDuration).toBe('');
    expect(panel.style.getPropertyValue('--pw_Accordion_root_default_transition-duration')).toBe('');
  });

  it('given a default panel, when rendered, then it exposes a labelled button and linked inert panel', () => {
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} title='Account details'>
          <p>Panel body</p>
        </AccordionPanel>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Account details' });
    const panel = getControlledPanel(trigger);

    expect(screen.getByRole('group', { name: 'Accordion' })).toHaveClass('Accordion');
    expect(screen.getByRole('heading', { level: 2, name: 'Account details' })).toContainElement(trigger);
    expect(trigger).toHaveAttribute('type', 'button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveAttribute('inert');
    expect(panel).not.toHaveAttribute('hidden');
    expect(screen.getByText('Panel body')).toBeInTheDocument();
    expect(trigger.querySelector('.closeButton')).toHaveAttribute('aria-hidden', 'true');
    expect(trigger.closest('section')).not.toHaveAttribute('aria-disabled');
    expect(trigger.closest('section')).not.toHaveAttribute('dir');
    expect(trigger).not.toHaveClass('rtl');
  });

  it('given an explicitly empty label, when rendered, then group semantics are omitted', () => {
    render(
      <Accordion cls={cls} ariaLabel=''>
        <AccordionPanel cls={cls} title='Unlabelled accordion panel'>
          Content
        </AccordionPanel>
      </Accordion>,
    );

    const accordion = screen.getByRole('button', { name: 'Unlabelled accordion panel' })
      .closest('.Accordion');
    expect(accordion).not.toHaveAttribute('role');
    expect(accordion).not.toHaveAttribute('aria-label');
  });

  it('given an accessible label and context values, when rendered, then the group and panel inherit them', () => {
    render(
      <Accordion
        cls={cls}
        id='accountSections'
        ariaLabel='Account sections'
        className='theme-dark'
        rtl
        transitionDuration={320}
      >
        <AccordionPanel cls={cls} title='Inherited panel'>Content</AccordionPanel>
      </Accordion>,
    );

    const group = screen.getByRole('group', { name: 'Account sections' });
    const trigger = screen.getByRole('button', { name: 'Inherited panel' });
    const panel = trigger.closest('section');

    expect(group).toHaveAttribute('id', 'accountSections');
    expect(group).toHaveClass('Accordion');
    expect(group).not.toHaveClass('is-disabled');
    expect(group).not.toHaveAttribute('aria-disabled');
    expect(panel).toHaveClass('AccordionPanel', 'theme-dark');
    expect(panel).toHaveStyle({
      transitionDuration: '320ms',
    });
    expect(panel?.style.getPropertyValue('--pw_Accordion_root_default_transition-duration')).toBe('320ms');
    expect(panel).toHaveAttribute('dir', 'rtl');
    expect(trigger).toHaveClass('rtl');
  });

  it('given a custom heading level and header slot, when rendered, then semantic wrappers are preserved', () => {
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} headingLevel={4} title='Default title'>
          <Template name='header'>
            <strong>Custom header</strong>
          </Template>
          <p>Custom panel body</p>
        </AccordionPanel>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Custom header' });

    expect(screen.getByRole('heading', { level: 4, name: 'Custom header' })).toContainElement(trigger);
    expect(screen.queryByText('Default title')).not.toBeInTheDocument();
    expect(screen.getByText('Custom panel body')).toBeInTheDocument();
  });

  it('given the heading level changes, when rerendered, then the semantic heading element updates', async () => {
    const { rerender } = render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} headingLevel={2} title='Reactive heading'>
          Content
        </AccordionPanel>
      </Accordion>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Reactive heading' }))
      .toBeInTheDocument();

    rerender(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} headingLevel={5} title='Reactive heading'>
          Content
        </AccordionPanel>
      </Accordion>,
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 5, name: 'Reactive heading' }))
        .toBeInTheDocument();
    });
    expect(screen.queryByRole('heading', { level: 2, name: 'Reactive heading' }))
      .not.toBeInTheDocument();
  });

  it('given two closed panels, when one trigger is clicked, then only its linked panel opens', async () => {
    const user = userEvent.setup();
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} title='First panel'>First body</AccordionPanel>
        <AccordionPanel cls={cls} title='Second panel'>Second body</AccordionPanel>
      </Accordion>,
    );

    const firstTrigger = screen.getByRole('button', { name: 'First panel' });
    const secondTrigger = screen.getByRole('button', { name: 'Second panel' });
    const firstPanel = getControlledPanel(firstTrigger);
    const secondPanel = getControlledPanel(secondTrigger);

    await user.click(firstTrigger);

    await waitFor(() => expect(firstTrigger).toHaveAttribute('aria-expanded', 'true'));
    expect(firstPanel).toHaveAttribute('aria-hidden', 'false');
    expect(firstPanel).not.toHaveAttribute('inert');
    expect(firstPanel).not.toHaveAttribute('hidden');
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(secondPanel).toHaveAttribute('aria-hidden', 'true');
    expect(secondPanel).toHaveAttribute('inert');
    expect(secondPanel).not.toHaveAttribute('hidden');
  });

  it('given a focused trigger, when Enter and Space are pressed, then native keyboard behavior toggles the panel', async () => {
    const user = userEvent.setup();
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} title='Keyboard panel'>Keyboard body</AccordionPanel>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Keyboard panel' });
    await user.tab();
    expect(trigger).toHaveFocus();

    await user.keyboard('{Enter}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));

    await user.keyboard(' ');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });

  it('given an open panel, when it closes, then it becomes inert immediately and completes after transition', async () => {
    vi.useFakeTimers();
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} title='Timed panel' isOpen transitionDuration={250}>
          Timed body
        </AccordionPanel>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Timed panel' });
    const panel = getControlledPanel(trigger);

    expect(trigger.closest('section')).toHaveStyle({
      transitionDuration: '250ms',
    });
    expect(
      (trigger.closest('section') as HTMLElement).style
        .getPropertyValue('--pw_Accordion_root_default_transition-duration'),
    ).toBe('250ms');

    fireEvent.click(trigger);
    act(() => vi.advanceTimersByTime(17));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
    expect(panel).toHaveAttribute('inert');
    expect(panel).not.toHaveAttribute('hidden');

    act(() => vi.advanceTimersByTime(232));
    expect(panel).not.toHaveAttribute('hidden');

    act(() => vi.advanceTimersByTime(17));
    expect(panel).not.toHaveAttribute('hidden');
    expect(trigger).toHaveClass('hide-border');
  });

  it('given focus inside an open panel, when it closes programmatically, then focus returns to its trigger', async () => {
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} title='Focusable panel' isOpen>
          <input aria-label='Inside field' />
        </AccordionPanel>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Focusable panel' });
    const input = screen.getByRole('textbox', { name: 'Inside field' });
    input.focus();
    expect(input).toHaveFocus();

    fireEvent.click(trigger);

    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('given a disabled accordion, when its trigger is activated, then its state does not change', async () => {
    const user = userEvent.setup();
    render(
      <Accordion cls={cls} disabled>
        <AccordionPanel cls={cls} title='Unavailable panel'>Unavailable body</AccordionPanel>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Unavailable panel' });
    const accordion = trigger.closest('.Accordion');
    expect(trigger).toBeDisabled();
    expect(accordion).toHaveClass('is-disabled');
    expect(accordion).toHaveAttribute('aria-disabled', 'true');
    expect(trigger.closest('.AccordionPanel')).toHaveClass('is-disabled');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('given a change callback, when a panel toggles, then it reports the requested open state', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} title='Observed panel' onOpenChange={onOpenChange}>
          Observed body
        </AccordionPanel>
      </Accordion>,
    );

    await user.click(screen.getByRole('button', { name: 'Observed panel' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('given explicit and generated IDs, when panels render, then every ARIA relationship is unique and valid', () => {
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} id='billing' title='Billing'>Billing body</AccordionPanel>
        <AccordionPanel cls={cls} title='Shipping'>Shipping body</AccordionPanel>
      </Accordion>,
    );

    const billing = screen.getByRole('button', { name: 'Billing' });
    const shipping = screen.getByRole('button', { name: 'Shipping' });

    expect(billing).toHaveAttribute('id', 'triggerbilling');
    expect(billing).toHaveAttribute('aria-controls', 'panelbilling');
    expect(shipping.id).not.toBe(billing.id);
    expect(shipping.getAttribute('aria-controls')).not.toBe(billing.getAttribute('aria-controls'));
    expect(getControlledPanel(shipping)).toHaveAttribute('aria-labelledby', shipping.id);
  });

  it('given landmark content, when rendered, then the region is labelled by its trigger', () => {
    render(
      <Accordion cls={cls}>
        <AccordionPanel cls={cls} title='Landmark panel' isOpen landmark>
          Landmark body
        </AccordionPanel>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Landmark panel' });
    expect(screen.getByRole('region', { name: 'Landmark panel' })).toBe(getControlledPanel(trigger));
  });

  it('given forwarded refs, when rendered, then they reference the wrapper and semantic panel section', () => {
    const accordionRef = createRef<HTMLDivElement>();
    const panelRef = createRef<HTMLElement>();

    render(
      <Accordion ref={accordionRef} cls={cls}>
        <AccordionPanel ref={panelRef} cls={cls} title='Referenced panel'>
          Referenced body
        </AccordionPanel>
      </Accordion>,
    );

    expect(accordionRef.current).toBeInstanceOf(HTMLDivElement);
    expect(accordionRef.current).toHaveClass('Accordion');
    expect(panelRef.current).toBeInstanceOf(HTMLElement);
    expect(panelRef.current?.tagName).toBe('SECTION');
  });

  it('given representative accordion content, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(
      <Accordion cls={cls} ariaLabel='Frequently asked questions'>
        <AccordionPanel cls={cls} title='First answer' isOpen landmark>
          <p>Answer content</p>
        </AccordionPanel>
        <AccordionPanel cls={cls} title='Second answer'>
          <a href='/more'>Read more</a>
        </AccordionPanel>
      </Accordion>,
    );

    const result = await axe.run(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    expect(result.violations).toEqual([]);
  });
});
