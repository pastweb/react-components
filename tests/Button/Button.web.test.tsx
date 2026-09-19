import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from '../../src/Button';

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

describe('Button', () => {
  it('given a default button, when activated, then it uses native button behavior', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button cls={cls} id='save' onClick={onClick}>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('id', 'save');
    expect(button).toHaveAttribute('type', 'button');

    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('given a loading button, when rendered, then it is busy and exposes status text without becoming disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button cls={cls} loading onClick={onClick}>Save</Button>);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveClass('is-disabled');
    expect(button).not.toHaveAttribute('aria-disabled');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('given a disabled button, when rendered, then native and class states remain synchronized', () => {
    render(<Button cls={cls} disabled>Unavailable</Button>);

    const button = screen.getByRole('button', { name: 'Unavailable' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('is-disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('given a forwarded ref, when rendered, then it resolves to the native button', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref} cls={cls}>Referenced</Button>);

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Referenced' }));
  });

  it('given a default button, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Button cls={cls}>Continue</Button>);

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
