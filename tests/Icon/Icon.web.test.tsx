import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Icon } from '../../src/Icon';

function cls(...values: any[]): string {
  return values.filter(value => typeof value === 'string' && value).join(' ');
}

afterEach(cleanup);

describe('Icon', () => {
  it('given a decorative image icon, when rendered, then it is hidden from assistive technology', () => {
    const { container } = render(<Icon cls={cls} src='/icons/account.png' />);

    expect(container.querySelector('.Icon')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('given a meaningful SVG icon, when rendered, then it exposes one accessible image name', () => {
    render(<Icon cls={cls} src='<svg viewBox="0 0 1 1"></svg>' ariaLabel='Account' />);

    expect(screen.getByRole('img', { name: 'Account' })).toBeInTheDocument();
  });

  it('given a meaningful icon, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Icon cls={cls} src='/icons/account.png' ariaLabel='Account' />);

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
