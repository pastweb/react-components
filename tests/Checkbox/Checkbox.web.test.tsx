import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Checkbox } from '../../src/Checkbox';

function cls(...values: any[]): string {
  return values
    .flatMap(value => {
      if (!value) return [];
      if (typeof value === 'string') return value;
      return Object.entries(value)
        .filter(([, enabled]) => enabled)
        .map(([className]) => className);
    })
    .join(' ');
}

afterEach(cleanup);

describe('Checkbox', () => {
  it('given a labelled checkbox, when activated, then it updates and reports its checked state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox cls={cls} label='Accept terms' onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    await user.click(checkbox);

    await waitFor(() => expect(checkbox).toBeChecked());
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('given no visible label, when ariaLabel is supplied, then it remains accessible by name', () => {
    render(<Checkbox cls={cls} ariaLabel='Enable alerts' />);

    expect(screen.getByRole('checkbox', { name: 'Enable alerts' })).toBeInTheDocument();
  });

  it('given a disabled checkbox, when rendered, then native and class states remain synchronized', () => {
    const { container } = render(<Checkbox cls={cls} disabled label='Unavailable choice' />);

    expect(container.querySelector('.Checkbox')).toHaveClass('is-disabled');
    expect(screen.getByRole('checkbox', { name: 'Unavailable choice' })).toBeDisabled();
  });

  it('given an explicit ID and forwarded ref, when rendered, then both are preserved', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Checkbox ref={ref} cls={cls} id='terms' label='Accept terms' />);

    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'terms');
    expect(ref.current).toHaveClass('Checkbox');
  });

  it('given a labelled checkbox, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Checkbox cls={cls} label='Accept terms' />);

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
