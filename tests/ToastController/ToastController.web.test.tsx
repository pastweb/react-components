import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastController } from '../../src/ToastController';
const cls = (...v: any[]) => v.flatMap(x => !x ? [] : typeof x === 'string' ? x : Object.entries(x).filter(([, on]) => on).map(([k]) => k)).join(' ');
afterEach(cleanup);
describe('ToastController', () => {
  it('exposes status semantics and closes once with Escape', async () => { const onClose = vi.fn(); const onDestroy = vi.fn(); const user = userEvent.setup(); const { container } = render(<ToastController cls={cls} delay={0} ariaLabel='Saved' onClose={onClose} onDestroy={onDestroy}><span>Changes saved <button>Dismiss</button></span></ToastController>); const toast = screen.getByRole('status', { name: 'Saved' }); screen.getByRole('button', { name: 'Dismiss' }).focus(); await user.keyboard('{Escape}'); expect(onClose).toHaveBeenCalledOnce(); fireEvent.animationEnd(toast); await waitFor(() => expect(onDestroy).toHaveBeenCalledOnce()); await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument()); expect((await axe.run(container)).violations).toHaveLength(0); });
});
