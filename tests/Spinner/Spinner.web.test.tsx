import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Spinner } from '../../src/Spinner';

function cls(...values: any[]): string {
  return values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
}

afterEach(cleanup);

describe('Spinner', () => {
  it('given a loading label, when rendered, then a named polite status is exposed', () => {
    render(<Spinner cls={cls} ariaLabel='Saving changes'>◌</Spinner>);
    expect(screen.getByRole('status', { name: 'Saving changes' })).toHaveAttribute('aria-live', 'polite');
  });

  it('given a decorative spinner, when rendered, then no status role is emitted', () => {
    const { container } = render(<Spinner cls={cls} decorative>◌</Spinner>);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(container.querySelector('.Spinner')).toHaveClass('is-decorative');
  });

  it('given a spinner, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Spinner cls={cls}>◌</Spinner>);
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
