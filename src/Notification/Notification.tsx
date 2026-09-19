import { forwardRef } from 'react';
import { useMediator, useSlots, withDefaultProps } from '@pastweb/react';
import { notificationMediator } from '@pastweb/components-core/Notification';
import { DEFAULT_PROPS } from './constants';
import type {
  NotificationDefaultProps,
  NotificationMediator,
  NotificationProps,
} from './types';

export const Notification = forwardRef<HTMLElement, NotificationProps>((props, ref) => {
  const p = withDefaultProps<NotificationDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<NotificationMediator>(notificationMediator, p);
  const s = m.state;
  const { Slots, Slot } = useSlots(p.children);

  return (
    <Slots>
      <article
        ref={ref}
        className={p.cls('Notification', p.className)}
        role={s.role}
        aria-label={s.ariaLabel}
      >
        {p.title || p.closeButton ? (
          <header className={p.cls('header', { rtl: p.rtl })}>
            <Slot name='header' props={{ title: p.title, onClose: m.onClose }}>
              {p.title ? (
                <span className={p.cls('title')}>
                  {p.title}
                </span>
              ) : null}
              {p.closeButton ? (
                <button
                  type='button'
                  className={p.cls('closeButton')}
                  onClick={m.onClose}
                  aria-label={p.closeLabel}
                >
                  <span className={p.cls('closeBar')} aria-hidden='true' />
                  <span className={p.cls('closeBar')} aria-hidden='true' />
                </button>
              ) : null}
            </Slot>
          </header>
        ) : null}
        <div
          className={p.cls('content')}
          role='status'
          aria-live='polite'
          aria-atomic='true'
        >
          <Slot />
        </div>
        <Slot
          name='footer'
          map={(content, index) => (
            <footer key={index} className={p.cls('footer')}>
              {content}
            </footer>
          )}
        />
      </article>
    </Slots>
  );
});

Notification.displayName = 'Notification';
