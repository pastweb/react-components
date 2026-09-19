import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Radio } from '../../src/Radio';

function cls(...values: any[]): string {
  return values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
}
const options = [{ label: 'Email', value: 'email' }, { label: 'Phone', value: 'phone', disabled: true }];
afterEach(cleanup);

describe('Radio', () => {
  it('given labelled options, when rendered, then native group and radio semantics are exposed', () => {
    render(<Radio cls={cls} label='Contact method' name='contact' options={options} />);
    expect(screen.getByRole('radiogroup', { name: 'Contact method' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Email' })).toHaveAttribute('name', 'contact');
    expect(screen.getByRole('radio', { name: 'Phone' })).toBeDisabled();
  });

  it('given an enabled option, when selected, then the value is reported', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Radio cls={cls} options={options} onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: 'Email' }));
    expect(onChange).toHaveBeenCalledWith('email', expect.anything());
  });

  it('given a radio group, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Radio cls={cls} label='Contact method' options={options} />);
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
