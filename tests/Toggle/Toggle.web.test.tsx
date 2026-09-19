import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Toggle } from '../../src/Toggle';
const cls = (...v: any[]) => v.flatMap(x => !x ? [] : typeof x === 'string' ? x : Object.entries(x).filter(([, on]) => on).map(([k]) => k)).join(' ');
afterEach(cleanup);
describe('Toggle', () => { it('uses switch semantics and reports changes', async () => { const onChange = vi.fn(); const { container } = render(<Toggle cls={cls} label='Notifications' onChange={onChange} />); const toggle = screen.getByRole('switch', { name: 'Notifications' }); await userEvent.click(toggle); expect(onChange).toHaveBeenCalledWith(true, expect.anything()); expect((await axe.run(container)).violations).toHaveLength(0); }); });
