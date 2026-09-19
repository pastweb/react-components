import { forwardRef } from 'react';
import {
  GlobalContext,
  setRef,
  useBeforeUnmount,
  useMediator,
  useMounted,
  useRef,
  withDefaultProps,
} from '@pastweb/react';
import { sheetControllerMediator } from '@pastweb/components-core/SheetController';
import { DEFAULT_PROPS, SHEET_CONTEXT_KEY } from './constants';
import type {
  SheetControllerDefaultProps,
  SheetControllerMediator,
  SheetControllerProps,
} from './types';

export const SheetController = forwardRef<HTMLDivElement, SheetControllerProps>((props, ref) => {
  const p = withDefaultProps<SheetControllerDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SheetControllerMediator>(sheetControllerMediator, p);
  const s = m.state;
  const c = m.getContext();

  const sheetElement = useRef<HTMLDivElement | null>(null);

  useMounted(() => {
    if (sheetElement.value) m.useMounted(sheetElement.value, p.portalElement);
  });

  useBeforeUnmount(m.useBeforeUnmount);

  function setSheetRef(node: HTMLDivElement | null): void {
    sheetElement.value = node;
    setRef(ref as any, node);
  }

  if (s.isClosed) return null;

  return (
    <GlobalContext update={{ [SHEET_CONTEXT_KEY]: c }}>
      <div
        className={p.cls('SheetController', {
          'has-backdrop': p.backdrop,
          'is-closing': s.isClosing,
          'is-modal': p.modal,
          'is-open': s.isOpen,
        }, p.className)}
        style={{ animationDuration: `${p.animationTime}ms` }}
      >
        {p.backdrop && (
          <button
            type='button'
            className={p.cls('backdrop')}
            tabIndex={-1}
            aria-hidden='true'
            onClick={m.onBackdrop}
          />
        )}
        <div
          ref={setSheetRef}
          id={m.id}
          className={p.cls('sheet', {
            [`sheet-open-${p.direction}`]: s.isOpen,
            [`sheet-close-${p.direction}`]: s.isClosing,
          })}
          style={{
            top: p.top,
            left: p.left,
            bottom: p.bottom,
            right: p.right,
            width: p.width,
            height: p.height,
            animationDuration: `${p.animationTime}ms`,
          }}
          role='dialog'
          aria-label={s.ariaLabel}
          aria-modal={p.modal || undefined}
          tabIndex={-1}
          onAnimationEnd={m.onTransitionEnd}
          onKeyDown={m.onKeyDown}
        >
          {p.children}
        </div>
      </div>
    </GlobalContext>
  );
});

SheetController.displayName = 'SheetController';
