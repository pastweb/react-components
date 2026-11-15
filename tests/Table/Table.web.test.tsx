import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Table } from '../../src/Table';

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

const columns = [
  { id: 'name', accessorKey: 'name' as const, header: 'Name', sorting: true, resizing: true },
  { id: 'age', accessorKey: 'age' as const, header: 'Age' },
];

afterEach(cleanup);

describe('Table', () => {
  it('given a caption and no rows, when rendered, then the named table exposes its empty state', async () => {
    render(<Table cls={cls} caption="People" columns={columns} data={[]} />);

    expect(await screen.findByRole('table', { name: 'People' })).toBeInTheDocument();
    expect(screen.getByText('No data available')).toHaveAttribute('colspan', '2');
  });

  it('given a sortable column, when its native button is used, then sort state and aria-sort update', async () => {
    const user = userEvent.setup();
    const onSortingChange = vi.fn();
    render(
      <Table
        cls={cls}
        ariaLabel="People"
        columns={columns}
        data={[{ name: 'Ada', age: 36 }]}
        onSortingChange={onSortingChange}
      />,
    );

    const sortButton = await screen.findByRole('button', { name: 'Name, not sorted' });
    await user.click(sortButton);

    expect(onSortingChange).toHaveBeenCalledWith([{ id: 'name', desc: false }]);
    await waitFor(() => expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute('aria-sort', 'ascending'));
  });

  it('given selectable and expandable rows, when controls are used, then they report semantic state changes', async () => {
    const user = userEvent.setup();
    const onRowSelectionChange = vi.fn();
    const onExpandedChange = vi.fn();
    const child = { name: 'Grace', age: 12 };
    render(
      <Table
        cls={cls}
        ariaLabel="People"
        columns={columns}
        data={[{ name: 'Ada', age: 36 }]}
        rowSelection
        expanding
        getSubRows={() => [child]}
        onRowSelectionChange={onRowSelectionChange}
        onExpandedChange={onExpandedChange}
      />,
    );

    await user.click(await screen.findByRole('checkbox', { name: 'Select row 0' }));
    expect(onRowSelectionChange).toHaveBeenCalledWith({ 0: true });

    const expandButton = screen.getByRole('button', { name: 'Expand row 0' });
    await user.click(expandButton);
    expect(onExpandedChange).toHaveBeenCalledWith({ 0: true });
  });

  it('given a scroll callback, when the table body scrolls, then it forwards the event', () => {
    const onScroll = vi.fn();
    const { container } = render(
      <Table cls={cls} ariaLabel="People" columns={columns} data={[{ name: 'Ada', age: 36 }]} onScroll={onScroll} />,
    );

    const body = container.querySelector('.body');
    expect(body).toBeInTheDocument();
    fireEvent.scroll(body!);

    expect(onScroll).toHaveBeenCalledTimes(1);
  });

  it('given an accessible table, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(
      <Table cls={cls} caption="People" columns={columns} data={[{ name: 'Ada', age: 36 }]} />,
    );

    await waitFor(() => expect(screen.getByRole('columnheader', { name: /Name/ })).toBeInTheDocument());
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
