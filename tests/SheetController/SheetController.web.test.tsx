import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SheetController } from '../../src/SheetController';

function cls(...values: any[]): string {
  return values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
}

afterEach(cleanup);

describe('SheetController', () => {
  it('given a modal sheet, when rendered, then it exposes named dialog semantics and receives focus', async () => {
    render(<SheetController cls={cls} ariaLabel='Account settings' modal><button>Save</button></SheetController>);
    const dialog = screen.getByRole('dialog', { name: 'Account settings' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    await waitFor(() => expect(dialog).toHaveFocus());
  });

  it('given Escape is pressed, when the animation completes, then the sheet closes once', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<SheetController cls={cls} ariaLabel='Filters' onClose={onClose}><button>Apply</button></SheetController>);
    const dialog = screen.getByRole('dialog', { name: 'Filters' });
    await waitFor(() => expect(dialog).toHaveFocus());
    await user.keyboard('{Escape}');
    await waitFor(() => expect(dialog).toHaveAttribute('aria-hidden', 'true'));
    fireEvent.animationEnd(dialog);
    await waitFor(() => expect(onClose).toHaveBeenCalledOnce());
    expect(screen.queryByRole('dialog', { name: 'Filters', hidden: true })).not.toBeInTheDocument();
  });

  it('given a modal sheet, when Tab reaches an edge, then focus wraps inside', async () => {
    const user = userEvent.setup();
    render(<SheetController cls={cls} ariaLabel='Actions' modal><button>First</button><button>Last</button></SheetController>);
    const last = screen.getByRole('button', { name: 'Last' });
    last.focus();
    await user.keyboard('{Tab}');
    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
  });

  it('given backdrop dismissal is disabled, when backdrop is activated, then it stays open', () => {
    const onClose = vi.fn();
    const { container } = render(
      <SheetController cls={cls} ariaLabel='Menu' backdrop closeOnBackdropClick={false} onClose={onClose}>Menu</SheetController>,
    );
    fireEvent.click(container.querySelector('.backdrop')!);
    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('given a sheet, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(
      <SheetController cls={cls} ariaLabel='Preferences' modal><button>Close</button></SheetController>,
    );
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
