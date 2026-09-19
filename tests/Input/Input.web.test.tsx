import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Template } from '@pastweb/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cl } from '@pastweb/tools';
import { Input } from '../../src/Input';

afterEach(cleanup);

describe('Input', () => {
  it('given a labelled input, when text is entered, then value changes are reported', async () => {
    const onChange = vi.fn();

    function Example() {
      const [value, setValue] = useState('');
      return <Input cls={cl} label='Display name' value={value} onChange={(next, event) => { setValue(next); onChange(next, event); }} />;
    }

    const user = userEvent.setup();
    render(<Example />);
    const input = screen.getByRole('textbox', { name: 'Display name' });

    await user.type(input, 'Pastweb');

    expect(input).toHaveValue('Pastweb');
    expect(onChange).toHaveBeenLastCalledWith('Pastweb', expect.anything());
  });

  it('given no visible label, when the default name is used, then the input is named Input', () => {
    render(<Input cls={cl} />);

    expect(screen.getByRole('textbox', { name: 'Input' })).toBeInTheDocument();
  });

  it('given no visible label, when ariaLabel is supplied, then the input remains named', () => {
    render(<Input cls={cl} ariaLabel='Search documentation' type='search' />);

    expect(screen.getByRole('searchbox', { name: 'Search documentation' })).toBeInTheDocument();
  });

  it('given a disabled number input, when rendered, then root, field, and step controls agree', () => {
    const { container } = render(<Input cls={cl} disabled label='Quantity' type='number' />);
    const field = screen.getByRole('spinbutton', { name: 'Quantity' });

    expect(container.querySelector('.Input')).toHaveClass('is-disabled');
    expect(field).toBeDisabled();
    expect(field).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'Increment' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Decrement' })).toBeDisabled();
  });

  it('given a controlled number input, when incremented, then the stepped value is reported', async () => {
    const onChange = vi.fn();

    function Example() {
      const [value, setValue] = useState('1');
      return <Input cls={cl} label='Quantity' type='number' value={value} onChange={next => { setValue(next); onChange(next); }} />;
    }

    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole('button', { name: 'Increment' }));

    expect(screen.getByRole('spinbutton', { name: 'Quantity' })).toHaveValue(2);
    expect(onChange).toHaveBeenCalledWith('2');
  });

  it('given a loading input, when no loading slot is supplied, then default status content is wrapped', () => {
    const { container } = render(<Input cls={cl} loading label='Account name' />);
    const status = screen.getByRole('status');

    expect(container.querySelector('.Input')).toHaveClass('is-loading');
    expect(container.querySelector('.Input')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('textbox', { name: 'Account name' })).toBeDisabled();
    expect(status).toHaveClass('loading');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Loading...');
  });

  it('given a loading input, when a loading slot is supplied, then the mapped status wraps that content', () => {
    const { container } = render(
      <Input cls={cl} loading label='Account name'>
        <Template name='loading'>Checking…</Template>
      </Input>,
    );
    const status = screen.getByRole('status');

    expect(container.querySelector('.Input')).toHaveClass('is-loading');
    expect(container.querySelector('.Input')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('textbox', { name: 'Account name' })).toBeDisabled();
    expect(status).toHaveClass('loading');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Checking…');
  });

  it('given an available input, when rendered, then disabled state is omitted', () => {
    const { container } = render(<Input cls={cl} label='Display name' />);
    const field = screen.getByRole('textbox', { name: 'Display name' });

    expect(container.querySelector('.Input')).not.toHaveClass('is-disabled');
    expect(field).not.toHaveAttribute('aria-disabled');
    expect(container.querySelector('.Input')).not.toHaveAttribute('aria-busy');
  });

  it('given a labelled input, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Input cls={cl} label='Email address' type='email' />);

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
