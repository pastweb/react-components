import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ProgressBar } from '../../src/ProgressBar';

function cls(...values: any[]): string {
  return values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
}

afterEach(cleanup);

describe('ProgressBar', () => {
  it('given linear progress, when rendered, then value semantics and label are exposed', () => {
    render(<ProgressBar cls={cls} percentage={25} ariaLabel='Upload progress' />);
    const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
    expect(progress).toHaveAttribute('aria-valuenow', '25');
    expect(progress).toHaveAttribute('aria-valuetext', '25%');
    expect(progress).toHaveClass('type-linear');
  });

  it('given circular progress, when rendered, then its SVG is decorative', () => {
    const { container } = render(<ProgressBar cls={cls} percentage={50} type='circular' />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('given progress, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<ProgressBar cls={cls} percentage={50} />);
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
