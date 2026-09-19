import { forwardRef } from 'react';
import { useSlots, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/react';
import { textAreaMediator } from '@pastweb/components-core/TextArea';
import { DEFAULT_PROPS } from './constants';
import type { TextAreaDefaultProps, TextAreaProps, TextAreaMediator } from './types';

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>((props, ref) => {
  const p = withDefaultProps<TextAreaDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TextAreaMediator>(textAreaMediator, p);
  const s = m.state;
  const { Slots, Slot } = useSlots(p.children);

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <Slots>
      <div
        ref={ref}
        className={p.cls('TextArea', `label-${p.labelPlacement}`, p.className, {
          'is-disabled': s.isDisabled,
          'is-loading': s.isLoading,
          'is-readonly': s.isReadOnly,
          'is-resizeable': s.isResizeable,
        })}
        aria-busy={s.isLoading}
      >
        <div className={p.cls('textarea')}>
          <textarea
            id={s.inputId}
            className={p.cls('input')}
            style={{ resize: s.isResizeable ? 'both' : 'none' }}
            tabIndex={p.tabIndex}
            value={p.value}
            cols={p.cols}
            rows={p.rows}
            name={p.name}
            disabled={s.isDisabled || s.isLoading}
            readOnly={s.isReadOnly}
            required={p.required}
            placeholder={p.placeholder}
            maxLength={p.maxLength}
            aria-label={s.ariaLabel}
            aria-busy={s.isLoading}
            aria-disabled={s.isDisabled}
            onChange={e => m.onChange(e.target.value)}
          />
          {s.isLoading && (
            <div
              className={p.cls('loading')}
              role='status'
              aria-live='polite'
            >
              <Slot name='loading'>
                Loading...
              </Slot>
            </div>
          )}
        </div>
        {p.label ? (
          <label
            className={p.cls('label', p.labelPlacement)}
            htmlFor={s.inputId}
          >
            {p.label}
          </label>
        ) : null}
      </div>
    </Slots>
  );
});

TextArea.displayName = 'TextArea';
