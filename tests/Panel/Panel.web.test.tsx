import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Panel } from '../../src/Panel';

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

describe('Panel', () => {
  it('given border props, when rendered, then the renamed classes are used exclusively', () => {
    const { container } = render(<Panel cls={cls} title='Account'>Panel content</Panel>);
    const panel = container.querySelector('.Panel');

    expect(panel).toHaveClass('has-border', 'has-border-radius');
    expect(panel).not.toHaveClass('border', 'border-radius');
  });

  it('given disabled border props, when rendered, then neither renamed class is applied', () => {
    const { container } = render(<Panel cls={cls} border={false} borderRadius={false} title='Account'>Panel content</Panel>);
    const panel = container.querySelector('.Panel');

    expect(panel).not.toHaveClass('has-border', 'has-border-radius');
  });

  it('given a title and heading level, when rendered, then the article is named by that heading', () => {
    render(<Panel cls={cls} id='account-panel' title='Account settings' headingLevel={3}>Panel content</Panel>);

    const heading = screen.getByRole('heading', { level: 3, name: 'Account settings' });
    expect(heading).toHaveAttribute('id', 'titleaccount-panel');
    expect(screen.getByRole('article', { name: 'Account settings' })).toHaveAttribute('aria-labelledby', heading.id);
  });

  it('given no title and an aria label, when rendered, then the article remains named', () => {
    render(<Panel cls={cls} ariaLabel='Filter options'>Panel content</Panel>);

    expect(screen.getByRole('article', { name: 'Filter options' })).toBeInTheDocument();
  });

  it('given a close action, when activated, then the native button reports close intent', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Panel cls={cls} title='Account' closeLabel='Dismiss account panel' onClose={onClose}>Panel content</Panel>);

    await user.click(screen.getByRole('button', { name: 'Dismiss account panel' }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('given content padding, when rendered, then it is scoped to the content area', () => {
    const { container } = render(<Panel cls={cls} title='Account' contentPadding='1rem'>Panel content</Panel>);

    expect(container.querySelector('.content')).toHaveStyle({ padding: '1rem' });
    expect(container.querySelector('.Panel')).not.toHaveStyle({ padding: '1rem' });
  });

  it('given a panel, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Panel cls={cls} title='Account'>Panel content</Panel>);

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
