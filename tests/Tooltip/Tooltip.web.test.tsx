import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { Tooltip } from '../../src/Tooltip';

const cls = (...values: any[]): string => values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
afterEach(cleanup);

describe('Tooltip', () => {
  it('given a button trigger, when focused and Escape is pressed, then description opens and closes', async () => {
    const user = userEvent.setup();
    render(<Tooltip cls={cls} content='Deletes the record'><button>Delete</button></Tooltip>);
    const trigger = screen.getByRole('button', { name: 'Delete' });
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    trigger.focus();
    await waitFor(() => expect(tooltip).toHaveClass('is-visible'));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(tooltip).not.toHaveClass('is-visible'));
    expect(trigger).toHaveFocus();
  });

  it('given a touch pointer, when it enters, then hover-only content stays closed', () => {
    const { container } = render(<Tooltip cls={cls} content='More information'><button>Info</button></Tooltip>);
    fireEvent.pointerEnter(container.querySelector('.Tooltip')!, { pointerType: 'touch' });
    expect(screen.getByRole('tooltip', { hidden: true })).not.toHaveClass('is-visible');
  });

  it('given a tooltip, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Tooltip cls={cls} content='Helpful description'><button>Help</button></Tooltip>);
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
