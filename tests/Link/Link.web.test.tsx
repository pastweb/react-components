import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Link } from '../../src/Link';

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

describe('Link', () => {
  it('given an available link, when activated, then it preserves navigation semantics and reports activation', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn(event => event.preventDefault());
    render(<Link cls={cls} href='/documentation' onClick={onClick}>Documentation</Link>);
    const link = screen.getByRole('link', { name: 'Documentation' });

    expect(link).toHaveAttribute('href', '/documentation');
    expect(link).toHaveAttribute('target', '_self');
    expect(link).not.toHaveClass('is-disabled');
    expect(link).not.toHaveAttribute('aria-disabled');
    await user.click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('given a disabled link, when activated, then it is unavailable and navigation is prevented', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(<Link cls={cls} disabled href='/documentation' onClick={onClick}>Documentation</Link>);
    const link = container.querySelector('a')!;

    expect(link).toHaveClass('is-disabled');
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    await user.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('given a new-tab link, when rendered, then opener access is prevented', () => {
    render(<Link cls={cls} href='https://example.com' target='_blank'>External documentation</Link>);

    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('given a link, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Link cls={cls} href='/documentation'>Documentation</Link>);

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
