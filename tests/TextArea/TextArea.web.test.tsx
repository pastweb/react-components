import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TextArea } from '../../src/TextArea';
const cls = (...v: any[]) => v.flatMap(x => !x ? [] : typeof x === 'string' ? x : Object.entries(x).filter(([, on]) => on).map(([k]) => k)).join(' ');
afterEach(cleanup);
describe('TextArea', () => { it('labels and reports editable content', async () => { const onChange = vi.fn(); const { container } = render(<TextArea cls={cls} label='Notes' value='' onChange={onChange} />); await userEvent.type(screen.getByRole('textbox', { name: 'Notes' }), 'A'); expect(onChange).toHaveBeenCalledWith('A'); expect((await axe.run(container)).violations).toHaveLength(0); }); });
