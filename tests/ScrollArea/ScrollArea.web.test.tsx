import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ScrollArea } from '../../src/ScrollArea';

function cls(...values: any[]): string {
  return values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
}
afterEach(cleanup);

describe('ScrollArea', () => {
  it('given a named area, when rendered, then it is keyboard focusable and labelled', () => {
    render(<ScrollArea cls={cls} ariaLabel='Messages'>Content</ScrollArea>);
    expect(screen.getByRole('region', { name: 'Messages' })).toHaveAttribute('tabindex', '0');
  });

  it('given scroll states and padding, when rendered, then classes and scoped style are exposed', () => {
    const { container } = render(<ScrollArea cls={cls} hideX scrollBottom contentPadding={0}>Content</ScrollArea>);
    expect(container.querySelector('.ScrollArea')).toHaveClass('hide-x', 'scroll-bottom');
    expect(container.querySelector('.content')).toHaveStyle({ padding: '0' });
  });

  it('given a scroll area, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<ScrollArea cls={cls}>Content</ScrollArea>);
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
