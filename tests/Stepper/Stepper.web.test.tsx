import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Stepper } from '../../src/Stepper';
const cls = (...v: any[]) => v.flatMap(x => !x ? [] : typeof x === 'string' ? x : Object.entries(x).filter(([, on]) => on).map(([k]) => k)).join(' ');
afterEach(cleanup);
describe('Stepper', () => {
  it('renders current-step semantics and an operable optional step', async () => {
    const onClick = vi.fn();
    const { container } = render(<Stepper cls={cls} active={2} steps={[{ label: 'Account', onClick }, { label: 'Payment' }]} />);
    expect(screen.getByText('Payment').closest('li')).toHaveAttribute('aria-current', 'step');
    await userEvent.click(screen.getByRole('button', { name: 'Account' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
