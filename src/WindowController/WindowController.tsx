import { forwardRef } from 'react';
import {
  GlobalContext,
  Render,
  setRef,
  useBeforeUnmount,
  useMediator,
  useMounted,
  useRef,
  withDefaultProps,
} from '@pastweb/react';
import { windowControllerMediator } from '@pastweb/components-core/WindowController';
import { DEFAULT_PROPS, MODE, WINDOW_CONTEXT_KEY } from './constants';
import { getTaskBarButtonBounds } from '../TaskBar/taskBarButtons';
import type {
  WindowControllerDefaultProps,
  WindowControllerMediator,
  WindowControllerProps,
} from './types';

export const WindowController = forwardRef<HTMLDivElement, WindowControllerProps>((props, ref) => {
  const p = withDefaultProps<WindowControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<WindowControllerMediator>(windowControllerMediator, { ...p, getTaskBarButtonBounds });
  const s = m.state;
  const windowElement = useRef<HTMLDivElement | null>(null);
  const c = m.getContext();

  function windowRef(node: HTMLDivElement | null): void {
    windowElement.value = node;
    setRef(ref as any, node);
  }

  useMounted(() => {
    if (windowElement.value) m.onMounted(windowElement.value);
  });

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [WINDOW_CONTEXT_KEY]: c }}>
      {p.mode === MODE.floating ? (
        <div
          className={p.cls('window', {
            [`${p.animation.name}-in`]: s.isOpen && !s.manager,
            [`${p.animation.name}-out`]: !s.isOpen,
            dragable: true,
            'is-managed': !!s.manager,
            'is-hide': s.isHidden || s.manager?.isHidden,
            'is-maximised': s.manager?.status === 'maximized',
            'is-minimised': s.manager?.status === 'minimized',
            'is-resizable': p.resizable,
          })}
          style={m.getAnimationStyle()}
          role='dialog'
          aria-label={p.ariaLabel}
          tabIndex={-1}
          onKeyDown={m.onKeyDown}
          ref={windowRef}
        >
          <Render content={p.children} />
        </div>
      ) : (
        <div className={p.cls('WindowController', { 'is-hide': s.isHidden || s.manager?.isHidden })} >
          <button
            type='button'
            className={p.cls('backdrop')}
            tabIndex={-1}
            aria-hidden='true'
            onClick={m.onBackdropClick}
          />
          <div
            className={p.cls('modal', {
              [`${p.animation.name}-in`]: s.isOpen && !s.manager,
              [`${p.animation.name}-out`]: !s.isOpen,
              'is-managed': !!s.manager,
              'is-maximised': s.manager?.status === 'maximized',
              'is-minimised': s.manager?.status === 'minimized',
              'is-resizable': p.resizable,
            })}
            style={m.getAnimationStyle()}
            role='dialog'
            aria-label={p.ariaLabel}
            aria-modal='true'
            tabIndex={-1}
            onKeyDown={m.onKeyDown}
            ref={windowRef}
          >
            <Render content={p.children} />
          </div>
        </div>
      )}
    </GlobalContext>
  );
});

WindowController.displayName = 'WindowController';
