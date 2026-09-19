import { forwardRef, useEffect } from 'react';
import { GlobalContext, setRef, useBeforeUnmount, useMediator, useMounted, useRef, useSlots, withDefaultProps } from '@pastweb/react';
import { dropdownMediator } from '@pastweb/components-core/DropDown';
import { DEFAULT_PROPS, DROPDOWN_CONTEXT_KEY } from './constants';
import type { DropDownDefaultProps, DropDownMediator, DropDownProps } from './types';

export const DropDown = forwardRef<HTMLDivElement, DropDownProps>((props, ref) => {
  const p = withDefaultProps<DropDownDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<DropDownMediator>(dropdownMediator, p);
  const s = m.state;
  const c = m.getContext();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const { Slots, Slot } = useSlots(p.children);

  useMounted(() => {
    if (!rootRef.value || !targetRef.value || !containerRef.value || !contentRef.value) return;

    m.useMounted(
      rootRef.value,
      targetRef.value,
      containerRef.value,
      contentRef.value,
    );

    if (arrowRef.value) m.setArrowRef(arrowRef.value);

    setRef(ref, rootRef.value);
  });

  useEffect(() => m.setArrowRef(arrowRef.value), [p.arrow]);

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [DROPDOWN_CONTEXT_KEY]: c }}>
      <Slots>
        <div
          ref={rootRef}
          id={m.id}
          className={p.cls('DropDown', p.className, {
            'is-disabled': s.isDisabled,
            'is-open': s.isVisible,
          })}
          onMouseEnter={event => m.onMouseEnter(event)}
          onMouseLeave={m.onMouseLeave}
          onBlur={event => m.onBlur(event)}
        >
          <span
            ref={targetRef}
            id={s.triggerId}
            className={p.cls('target')}
            role="button"
            tabIndex={s.isDisabled ? -1 : 0}
            aria-label={s.ariaLabel}
            aria-haspopup="true"
            aria-expanded={s.isVisible}
            aria-controls={s.contentId}
            aria-disabled={s.isDisabled}
            onClick={m.onClick}
            onContextMenu={m.onContext}
            onKeyDown={m.onKeyDown}
          >
            <Slot name="target" />
            <Slot />
          </span>
          <div
            ref={containerRef}
            className={p.cls('container', { 'is-visible': s.isVisible })}
            style={{ position: p.position }}
            aria-hidden={!s.isVisible || undefined}
            inert={!s.isVisible || undefined}
          >
            <div
              ref={contentRef}
              id={s.contentId}
              className={p.cls('content', p.contentClassName)}
              aria-labelledby={s.triggerId}
              onClick={m.onClick}
            >
              <Slot name="header" />
              <Slot name="content" />
              <Slot name="footer" />
            </div>
            {p.arrow ? (
              <div ref={arrowRef} className={p.cls('arrow')} aria-hidden="true">
                <div className={p.cls('triangle')} />
              </div>
            ) : null}
          </div>
        </div>
      </Slots>
    </GlobalContext>
  );
});

DropDown.displayName = 'DropDown';
