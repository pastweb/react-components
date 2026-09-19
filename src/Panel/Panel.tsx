import { forwardRef } from 'react';
import { Render, useBeforeUnmount, useSlots, useMediator, withDefaultProps } from '@pastweb/react';
import type { Content } from '@pastweb/react';
import { panelMediator } from '@pastweb/components-core/Panel';
import { DEFAULT_PROPS } from './constants';
import type { PanelDefaultProps, PanelProps, PanelMediator } from './types';

export const Panel = forwardRef<HTMLElement, PanelProps>((props, ref) => {
  const p = withDefaultProps<PanelDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<PanelMediator>(panelMediator, p);
  const s = m.state;
  const { Slots, Slot } = useSlots(p.children);
  const Heading = s.heading;

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <Slots>
      <article
        ref={ref}
        id={s.id}
        className={p.cls('Panel', {
          'has-border': p.border,
          'has-border-radius': p.borderRadius,
        }, p.className)}
        aria-label={s.ariaLabel}
        aria-labelledby={s.titleId}
      >
        <header className={p.cls('header', { rtl: p.rtl })}>
          <Slot name='header'>
            {p.title ? (
              <Heading id={s.titleId} className={p.cls('title')}>
                <Render content={p.title} />
              </Heading>
            ) : null}
            {p.minimizeButton || p.maximizeButton || p.closeButton ? (
              <div className={p.cls('headerButtons')}>
                {p.minimizeButton ? (
                  <button
                    type="button"
                    className={p.cls('minimizeButton')}
                    onClick={m.onMinimize}
                    aria-label={p.minimizeLabel}
                  >
                    <span className={p.cls('minimizeBar')} aria-hidden='true' />
                  </button>
                ) : null}
                {p.maximizeButton ? (
                  <button
                    type="button"
                    className={p.cls('maximizeButton')}
                    onClick={m.onMaximize}
                    aria-label={p.maximizeLabel}
                  >
                    <span className={p.cls('maximizeBar')} aria-hidden='true' />
                  </button>
                ) : null}
                {p.closeButton ? (
                  <button
                    type="button"
                    className={p.cls('closeButton')}
                    onClick={m.onClose}
                    aria-label={p.closeLabel}
                  >
                    <span className={p.cls('closeBar')} aria-hidden='true' />
                    <span className={p.cls('closeBar')} aria-hidden='true' />
                  </button>
                ) : null}
              </div>
            ) : null}
          </Slot>
        </header>
        <div className={p.cls('content')} style={p.contentPadding ? { padding: p.contentPadding } : {}}>
          <Slot />
        </div>
        <Slot name='footer' map={content => <footer className={p.cls('footer')}><Render content={content as Content} /></footer>} />
      </article>
    </Slots>
  );
});

Panel.displayName = 'Panel';
