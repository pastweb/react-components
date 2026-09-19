import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { Template } from '@pastweb/react';
import { cl } from '@pastweb/tools';
import { DropDown, useDropDownContext } from '../../src/DropDown';

afterEach(cleanup);

function renderDropDown(props: Partial<ComponentProps<typeof DropDown>> = {}) {
  return render(
    <DropDown cls={cl} id='account-actions' ariaLabel='' {...props}>
      Account actions
      <Template name='content'>Sign out</Template>
    </DropDown>,
  );
}

function CloseFromContext() {
  const dropDown = useDropDownContext();
  return (
    <button type='button' onClick={() => dropDown.hide()}>
      Close from context
    </button>
  );
}

describe('DropDown', () => {
  it('given generated and explicit IDs, when rendered, then host and relationship IDs follow the component format', () => {
    const { container } = renderDropDown();
    const trigger = screen.getByRole('button', { name: 'Account actions' });
    const content = screen.getByText('Sign out');

    expect(container.querySelector('.DropDown')).toHaveAttribute('id', '_account-actions');
    expect(trigger).toHaveAttribute('id', 'trigger_account-actions');
    expect(content).toHaveAttribute('id', 'content_account-actions');
  });

  it('given a trigger and content, when activated, then expanded and hidden states stay synchronized', async () => {
    const user = userEvent.setup();
    renderDropDown();
    const trigger = screen.getByRole('button', { name: 'Account actions' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Sign out').closest('.container')).toHaveAttribute('hidden');

    await user.click(trigger);

    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    expect(screen.getByText('Sign out').closest('.container')).not.toHaveAttribute('hidden');
  });

  it('given an open dropdown, when Escape is pressed, then content closes', async () => {
    const user = userEvent.setup();
    renderDropDown({ isVisible: true });
    const trigger = screen.getByRole('button', { name: 'Account actions' });

    trigger.focus();
    await user.keyboard('{Escape}');

    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });

  it('given a disabled dropdown, when rendered, then class and accessibility states agree', () => {
    const { container } = renderDropDown({ disabled: true });
    const trigger = screen.getByRole('button', { name: 'Account actions' });

    expect(container.querySelector('.DropDown')).toHaveClass('is-disabled');
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    expect(trigger).toHaveAttribute('tabindex', '-1');
  });

  it('given a native button trigger, when activated, then the revealed content opens', async () => {
    const user = userEvent.setup();
    render(
      <DropDown cls={cl} id='account-actions' ariaLabel=''>
        <button type='button'>Account actions</button>
        <Template name='content'>Sign out</Template>
      </DropDown>,
    );
    const nativeTrigger = document.querySelector('button');

    expect(nativeTrigger).toBeTruthy();
    await user.click(nativeTrigger!);

    await waitFor(() => expect(
      screen.getByText('Sign out').closest('.container'),
    ).not.toHaveAttribute('hidden'));
  });

  it('given descendant content using DropDown context, when hide is called, then the dropdown closes', async () => {
    const user = userEvent.setup();
    render(
      <DropDown cls={cl} id='account-actions' ariaLabel='' isVisible>
        Account actions
        <Template name='content'>
          <CloseFromContext />
        </Template>
      </DropDown>,
    );
    const trigger = screen.getByRole('button', { name: 'Account actions' });

    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'Close from context' }));

    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });

  it('given a dropdown, when audited, then it has no automated accessibility violations', async () => {
    const { container } = renderDropDown();

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
