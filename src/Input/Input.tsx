import { forwardRef } from 'react';
import {
  useBeforeUnmount,
  useMediator,
  useMounted,
  useRef,
  useSlots,
  withDefaultProps,
} from '@pastweb/react';
import { inputMediator } from '@pastweb/components-core/Input';
import { DEFAULT_PROPS } from './constants';
import type { InputDefaultProps, InputMediator, InputProps } from './types';

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const p = withDefaultProps<InputDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<InputMediator>(inputMediator, p);
  const s = m.state;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { Slots, Slot } = useSlots(p.children);

  useMounted(() => {
    if (!inputRef.value) return;
    m.useMounted(inputRef.value);
  });

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <Slots>
      <div
        ref={ref}
        className={p.cls('Input', `label-${p.labelPlacement}`, p.className, {
          'is-disabled': s.isDisabled,
          'is-loading': s.isLoading,
        })}
        aria-busy={s.isLoading}
      >
        <div className={p.cls('inputContainer')}>
          <Slot name='left' map={content => (
            <span className={p.cls('leftComponent')}>{content}</span>
          )} />
          <input
            ref={inputRef}
            className={p.cls('inputElement')}
            type={p.type}
            tabIndex={p.tabIndex}
            autoComplete={p.autocomplete}
            placeholder={p.placeholder}
            disabled={s.isDisabled || s.isLoading}
            aria-disabled={s.isDisabled}
            name={p.name}
            id={s.inputId}
            value={p.value}
            required={p.required}
            max={p.max}
            min={p.min}
            step={p.step}
            aria-label={s.ariaLabel}
            onChange={e => m.onChange((e.target as HTMLInputElement).value, e)}
            onKeyDown={m.onKeyDown}
          />
          {p.type === 'number' && (
            <div className={p.cls('number-buttons')}>
              <button
                type='button'
                className={p.cls('number-btn')}
                onClick={m.stepUp}
                disabled={s.isDisabled || s.isLoading || s.disableUpBtn}
                aria-label={p.incrementTitle}
              >
                ▲
              </button>
              <button
                type='button'
                className={p.cls('number-btn')}
                onClick={m.stepDown}
                disabled={s.isDisabled || s.isLoading || s.disableDownBtn}
                aria-label={p.decrementTitle}
              >
                ▼
              </button>
            </div>
          )}
          <Slot name='right' map={content => (
            <span className={p.cls('rightComponent')}>{content}</span>
          )} />
          {s.isLoading && (
            <div className={p.cls('loading')} role='status' aria-live='polite'>
              <Slot name='loading'>
                Loading...
              </Slot>
            </div>
          )}
        </div>
        {p.label ? (
          <label className={p.cls('label', p.labelPlacement)} htmlFor={s.inputId}>
            {p.label}
          </label>
        ) : null}
      </div>
    </Slots>
  );
});

Input.displayName = 'Input';
