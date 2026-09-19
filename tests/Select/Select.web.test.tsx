import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Template } from '@pastweb/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Select, SelectItem } from '../../src/Select';

function cls(...values: any[]): string {
  return values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
}

function TestSelect({ onChange = vi.fn(), disabled = false }) {
  return (
    <Select cls={cls} label='Country' onChange={onChange} disabled={disabled}>
      <Template name='content'>Choose country</Template>
      <Template name='options'>
        <SelectItem cls={cls} value='uk'>United Kingdom</SelectItem>
        <SelectItem cls={cls} value='fr' disabled>France</SelectItem>
      </Template>
    </Select>
  );
}
afterEach(cleanup);

describe('Select', () => {
  it('given a labelled select, when opened, then listbox and option semantics are exposed', async () => {
    const user = userEvent.setup();
    render(<TestSelect />);
    const trigger = screen.getByRole('button', { name: 'Country' });
    await user.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    expect(screen.getByRole('listbox', { name: 'Country' })).toBeVisible();
    expect(screen.getByRole('option', { name: 'France' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('given an open select, when an enabled option is chosen, then selection is reported and closes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TestSelect onChange={onChange} />);
    const trigger = screen.getByRole('button', { name: 'Country' });
    await user.click(trigger);
    await user.click(await screen.findByRole('option', { name: 'United Kingdom' }));
    expect(onChange).toHaveBeenCalledWith('uk');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });

  it('given a disabled select, when rendered and audited, then its trigger and class agree', async () => {
    const { container } = render(<TestSelect disabled />);
    expect(screen.getByRole('button', { name: 'Country' })).toBeDisabled();
    expect(container.querySelector('.Select')).toHaveClass('is-disabled');
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
