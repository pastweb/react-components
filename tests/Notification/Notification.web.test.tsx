import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Notification } from '../../src/Notification';

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

describe('Notification', () => {
  it('given message content, when rendered, then only the message is a polite status', () => {
    render(<Notification cls={cls}>Your changes were saved.</Notification>);

    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Your changes were saved.');
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('given a close action, when activated, then the native button reports close intent', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Notification cls={cls} closeLabel='Dismiss saved message' onClose={onClose}>Saved.</Notification>);

    await user.click(screen.getByRole('button', { name: 'Dismiss saved message' }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('given a named notification, when rendered, then it exposes a labelled region', () => {
    render(<Notification cls={cls} ariaLabel='Account notification' title='Account'>Updated.</Notification>);

    expect(screen.getByRole('region', { name: 'Account notification' })).toBeInTheDocument();
  });

  it('given a notification, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(<Notification cls={cls} title='Saved'>Your changes were saved.</Notification>);

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
