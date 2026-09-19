import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { Button } from '../../src/Button';
import { Buttons } from '../../src/Buttons';

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

describe('Buttons', () => {
  it('given related actions, when rendered, then they belong to a labelled group', () => {
    render(
      <Buttons cls={cls} id='documentActions' ariaLabel='Document actions'>
        <Button cls={cls}>Save</Button>
        <Button cls={cls}>Cancel</Button>
      </Buttons>,
    );

    const group = screen.getByRole('group', { name: 'Document actions' });
    expect(group).toHaveAttribute('id', 'documentActions');
    expect(group).not.toHaveClass('is-disabled');
    expect(group).not.toHaveAttribute('aria-disabled');
    expect(group).toContainElement(screen.getByRole('button', { name: 'Save' }));
    expect(group).toContainElement(screen.getByRole('button', { name: 'Cancel' }));
  });

  it('given related actions, when tabbing, then their native document order is preserved', async () => {
    const user = userEvent.setup();
    render(
      <Buttons cls={cls} ariaLabel='Document actions'>
        <Button cls={cls}>Save</Button>
        <Button cls={cls}>Cancel</Button>
      </Buttons>,
    );

    await user.tab();
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
  });

  it('given a default label and forwarded ref, when rendered, then it resolves to the labelled group', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Buttons ref={ref} cls={cls}>Actions</Buttons>);

    expect(ref.current).toHaveClass('Buttons');
    expect(ref.current).toBe(screen.getByRole('group', { name: 'Button group' }));
  });

  it('given an explicitly empty label, when rendered, then group semantics are omitted', () => {
    render(
      <Buttons cls={cls} ariaLabel=''>
        <Button cls={cls}>Save</Button>
      </Buttons>,
    );

    const wrapper = screen.getByRole('button', { name: 'Save' }).parentElement;
    expect(wrapper).toHaveClass('Buttons');
    expect(wrapper).not.toHaveAttribute('role');
    expect(wrapper).not.toHaveAttribute('aria-label');
  });

  it('given a disabled group, when rendered, then its state class and child native states remain synchronized', () => {
    render(
      <Buttons cls={cls} disabled ariaLabel='Unavailable actions'>
        <Button cls={cls}>Save</Button>
        <Button cls={cls}>Cancel</Button>
      </Buttons>,
    );

    const group = screen.getByRole('group', { name: 'Unavailable actions' });
    expect(group).toHaveClass('is-disabled');
    expect(group).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('given group availability changes, when rerendered, then the button mediator exposes the current context state', async () => {
    const { rerender } = render(
      <Buttons cls={cls} ariaLabel='Document actions'>
        <Button cls={cls}>Save</Button>
      </Buttons>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeEnabled();

    rerender(
      <Buttons cls={cls} disabled ariaLabel='Document actions'>
        <Button cls={cls}>Save</Button>
      </Buttons>,
    );

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button).toHaveClass('is-disabled');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  it('given a button group, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(
      <Buttons cls={cls} ariaLabel='Page actions'>
        <Button cls={cls}>Continue</Button>
      </Buttons>,
    );

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
