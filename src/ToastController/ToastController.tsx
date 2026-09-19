import { toastControllerMediator } from '@pastweb/components-core/ToastController';
import { GlobalContext, setRef, useMediator, withDefaultProps } from '@pastweb/react';
import { forwardRef, useCallback } from 'react';
import { DEFAULT_PROPS, JUSTIFY, TOAST_CONTEXT_KEY } from './constants';
import type {
  ToastControllerDefaultProps,
  ToastControllerMediator,
  ToastControllerProps,
} from './types';

export const ToastController = forwardRef<HTMLDivElement, ToastControllerProps>((props, ref) => {
  const p = withDefaultProps<ToastControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ToastControllerMediator>(toastControllerMediator, p);
  const s = m.state;

  const c = m.getContext();

  const toastRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    m.onMounted(node as HTMLElement);
    setRef(ref as any, node);
  }, []);

  return (
    <GlobalContext update={{ [TOAST_CONTEXT_KEY]: c }}>
      <div
        ref={toastRef}
        className={p.cls('ToastController', p.placement)}
        style={{ [s.y]: s.top || s.bottom, justifyContent: JUSTIFY[s.x] }}
      >
        <div
          className={p.cls('toast', {
            [`${p.animation.name}-in-${s.x}-${s.y}`]: s.isOpen,
            [`${p.animation.name}-out-${s.x}-${s.y}`]: !s.isOpen,
          })}
          style={{
            padding: p.padding,
            ...s.isOpen ? {
              ...p.animation.in?.animationDelay && { animationDelay: `${p.animation.in?.animationDelay}s` },
              ...p.animation.in?.animationDuration && { animationDuration: `${p.animation.in?.animationDuration}s` },
              ...p.animation.in?.animationTimingFunction && { animationTimingFunction: p.animation.in?.animationTimingFunction },
            } : {
              ...p.animation.out?.animationDelay && { animationDelay: `${p.animation.out?.animationDelay}s` },
              ...p.animation.out?.animationDuration && { animationDuration: `${p.animation.out?.animationDuration}s` },
              ...p.animation.out?.animationTimingFunction && { animationTimingFunction: p.animation.out?.animationTimingFunction },
            },
          }}
          role='status'
          aria-live='polite'
          aria-atomic='true'
          aria-label={p.ariaLabel || undefined}
          onKeyDown={m.onKeyDown}
          onMouseOver={m.onMouseOver}
          onMouseLeave={m.onMouseLeave}
          onFocus={m.onMouseOver}
          onBlur={m.onMouseLeave}
        >
          {p.children}
        </div>
      </div>
    </GlobalContext>
  );
});

ToastController.displayName = 'ToastController';
