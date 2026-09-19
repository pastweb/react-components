import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WindowController } from '../../src/WindowController';
const cls = (...v: any[]) => v.flatMap(x => !x ? [] : typeof x === 'string' ? x : Object.entries(x).filter(([, on]) => on).map(([k]) => k)).join(' ');
afterEach(cleanup);
describe('WindowController', () => {
  it('provides modal dialog semantics, focus containment, and Escape close', async () => { const onClose = vi.fn(); const user = userEvent.setup(); const { container } = render(<><button>Before</button><WindowController cls={cls} ariaLabel='Preferences' onClose={onClose}><button>First</button><button>Last</button></WindowController></>); const dialog = screen.getByRole('dialog', { name: 'Preferences' }); await waitFor(() => expect(dialog).toHaveFocus()); const last = screen.getByRole('button', { name: 'Last' }); last.focus(); await user.keyboard('{Tab}'); expect(screen.getByRole('button', { name: 'First' })).toHaveFocus(); await user.keyboard('{Escape}'); fireEvent.animationEnd(dialog); await waitFor(() => expect(onClose).toHaveBeenCalledOnce()); await waitFor(() => expect(screen.queryByRole('dialog', { hidden: true })).not.toBeInTheDocument()); expect((await axe.run(container)).violations).toHaveLength(0); });
  it('moves a floating window with pointer input', async () => { render(<WindowController cls={cls} mode='floating' ariaLabel='Tools'><span>Tools</span></WindowController>); const dialog = screen.getByRole('dialog', { name: 'Tools' }); fireEvent.pointerDown(dialog, { pointerId: 1, clientX: 10, clientY: 10 }); fireEvent.pointerMove(dialog, { pointerId: 1, clientX: 30, clientY: 40 }); await waitFor(() => expect(dialog.style.transform).toContain('20px, 30px')); });
});
