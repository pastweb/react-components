import { forwardRef } from 'react';
import { GlobalContext, useSlots, useBeforeUnmount, useMounted, useMediator, useRef, withDefaultProps } from '@pastweb/react';
import { selectMediator } from '@pastweb/components-core/Select';
import { DEFAULT_PROPS, SELECT_CONTEXT_KEY } from './constants';
import type { SelectDefaultProps, SelectProps, SelectMediator } from './types';

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const p = withDefaultProps<SelectDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<SelectMediator>(selectMediator, p);
  const s = m.state;
  const context = m.getContext();
  const targetElement = useRef<HTMLButtonElement | null>(null);
  const listElement = useRef<HTMLUListElement | null>(null);
  const { Slots, Slot, slots } = useSlots(p.children);

  useMounted(() => {
    if (!targetElement.value || !listElement.value) return;
    m.useMounted(targetElement.value, listElement.value);
  });

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [SELECT_CONTEXT_KEY]: context }}>
      <Slots>
        <div
          ref={ref}
          id={s.inputId}
          className={p.cls('Select', `label-${p.labelPlacement}`, p.className, {
            'is-disabled': s.isDisabled,
            'is-open': s.isOpen,
            'is-loading': s.isLoading,
          })}
        >
          <div className={p.cls('selectControl')}>
            {slots.target?.length ? (
              <span
                ref={targetElement}
                role='button'
                className={p.cls('selectTarget')}
                tabIndex={p.tabIndex}
                aria-disabled={s.isUnavailable}
                aria-haspopup='listbox'
                aria-expanded={s.isOpen}
                aria-controls={s.listboxId}
                aria-labelledby={p.label ? s.labelId : undefined}
                aria-label={s.ariaLabel}
                aria-busy={s.isLoading || undefined}
                onKeyDown={m.onKeyDown}
                onClick={m.onToggle}
              >
                <Slot name='target' />
              </span>
            ) : null}
            {slots.content?.length ? (
              <button
                ref={targetElement}
                type='button'
                id={s.triggerId}
                className={p.cls('selectButton')}
                tabIndex={p.tabIndex}
                disabled={s.isUnavailable}
                aria-haspopup='listbox'
                aria-expanded={s.isOpen}
                aria-controls={s.listboxId}
                aria-labelledby={p.label ? s.labelId : undefined}
                aria-label={s.ariaLabel}
                aria-busy={s.isLoading || undefined}
                onKeyDown={m.onKeyDown}
                onClick={m.onToggle}
              >
                <Slot name='content'>
                  {p.placeholder}
                </Slot>
                <span className={p.cls('arrow')} aria-hidden='true'>
                  ▼
                </span>
              </button>
            ) : null}
            <ul
              ref={listElement}
              id={s.listboxId}
              role='listbox'
              className={p.cls('options')}
              aria-labelledby={p.label ? s.labelId : s.triggerId}
              hidden={!s.isOpen}
            >
              <Slot name='options' />
              <Slot />
            </ul>
          </div>
          {p.label ? (
            <label
              id={s.labelId}
              className={p.cls('label', p.labelPlacement)}
              htmlFor={s.triggerId}
            >
              {p.label}
            </label>
          ) : null}
        </div>
      </Slots>
    </GlobalContext>
  );
});

Select.displayName = 'Select';
