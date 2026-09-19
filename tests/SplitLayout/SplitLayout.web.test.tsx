import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SplitLayout, SplitLayoutItem } from '../../src/SplitLayout';

function cls(...values: any[]): string {
  return values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
}

function Layout(props: { disabled?: boolean; onSizesChange?: (sizes: number[]) => void }) {
  return (
    <SplitLayout cls={cls} ariaLabel='Editor panels' disabled={props.disabled} onSizesChange={props.onSizesChange}>
      <SplitLayoutItem ariaLabel='Navigation'>Navigation</SplitLayoutItem>
      <SplitLayoutItem ariaLabel='Document'>Document</SplitLayoutItem>
    </SplitLayout>
  );
}

afterEach(cleanup);

describe('SplitLayout', () => {
  it('given two panels, when rendered, then one valued separator relates the panels', () => {
    render(<Layout />);
    expect(screen.getByRole('group', { name: 'Editor panels' })).toBeInTheDocument();
    expect(screen.getAllByRole('region')).toHaveLength(2);
    const separator = screen.getByRole('separator', { name: 'Resize Navigation' });
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getAllByRole('separator')).toHaveLength(1);
  });

  it('given a focused separator, when ArrowRight is pressed, then size and callback update', async () => {
    const onSizesChange = vi.fn();
    const user = userEvent.setup();
    render(<Layout onSizesChange={onSizesChange} />);
    const separator = screen.getByRole('separator');
    separator.focus();
    expect(separator).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    await waitFor(() => expect(separator).toHaveAttribute('aria-valuenow', '52'));
    expect(onSizesChange).toHaveBeenCalledWith([52, 48]);
  });

  it('given a disabled layout, when rendered, then separator leaves the tab order', () => {
    const { container } = render(<Layout disabled />);
    expect(screen.getByRole('separator')).toHaveAttribute('tabindex', '-1');
    expect(container.querySelector('.SplitLayout')).toHaveClass('is-disabled');
  });

  it('given a split layout, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Layout />);
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
