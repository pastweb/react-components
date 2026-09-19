import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Pagination } from '../../src/Pagination';

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

describe('Pagination', () => {
  it('given three pages, when rendered, then it exposes navigation, list, and current-page semantics', () => {
    render(<Pagination cls={cls} total={3} current={1} ariaLabel='Search result pages' />);

    expect(screen.getByRole('navigation', { name: 'Search result pages' })).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('navigation')).not.toHaveClass('is-disabled');
  });

  it('given a current page, when next is activated, then the valid next page is reported', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination cls={cls} total={3} current={1} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('given truncated pages, when the forward jump is activated, then it moves to page five', async () => {
    const user = userEvent.setup();
    render(<Pagination cls={cls} total={10} current={1} />);

    await user.click(screen.getByRole('button', { name: 'Jump forward through pages' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Page 5' })).toHaveAttribute('aria-current', 'page'));
  });

  it('given disabled pagination, when rendered, then every action and class state agree', () => {
    const { container } = render(<Pagination cls={cls} total={3} current={2} disabled />);

    expect(container.querySelector('.Pagination')).toHaveClass('is-disabled');
    expect(screen.getAllByRole('button').every(button => button.hasAttribute('disabled'))).toBe(true);
  });

  it('given pagination, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Pagination cls={cls} total={3} current={1} />);

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
