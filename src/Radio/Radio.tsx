import { forwardRef } from 'react';
import { computed, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/react';
import { radioMediator } from '@pastweb/components-core/Radio';
import { DEFAULT_PROPS, DEFAULT_RADIO_OPTIONS } from './constants';
import type {
  RadioDefaultOption,
  RadioDefaultProps,
  RadioMediator,
  RadioOption,
  RadioProps,
} from './types';

export const Radio = forwardRef<HTMLDivElement, RadioProps>((props, ref) => {
  const p = withDefaultProps<RadioDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<RadioMediator>(radioMediator, p);
  const s = m.state;

  const options = computed<RadioDefaultOption[]>(() => {
    return p.options.map((option: RadioOption, i: number) => {
      const o = withDefaultProps<RadioDefaultOption>(option, DEFAULT_RADIO_OPTIONS);
      const inputId = m.getOptionId(i, o.id);
      return { ...o, id: inputId };
    });
  }, [p.options]);

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div
      ref={ref}
      id={s.groupId}
      className={p.cls('Radio', `label-${p.labelPlacement}`, { 'is-disabled': s.isDisabled }, p.className)}
      role='radiogroup'
      aria-labelledby={s.groupLabelId}
      aria-label={s.ariaLabel}
      aria-disabled={s.isDisabled}
    >
      <div className={p.cls('buttons', { vertical: p.orientation === 'vertical' })}>
        {options.map((o: RadioOption) => (
          <label
            key={o.id ?? o.label}
            className={p.cls('group', `label-${o.labelPosition}`, {
              'is-checked': s.value === `${o.value}`,
              'is-disabled': s.isDisabled || o.disabled,
            })}
          >
            <input
              type='radio'
              id={o.id}
              name={o.name ?? p.name ?? s.groupId}
              value={o.value}
              checked={s.value === `${o.value}`}
              disabled={s.isDisabled || o.disabled || undefined}
              tabIndex={o.tabIndex}
              className={p.cls('input')}
              onChange={e => m.onChange(e.target.value, e)}
            />
            <span className={p.cls('box')} aria-hidden='true'>
              <span className={p.cls('indicator')} aria-hidden='true' />
            </span>
            <span className={p.cls('buttonLabel')}>{o.label}</span>
          </label>
        ))}
      </div>
      {p.label ? (
        <span
          id={s.groupLabelId}
          className={p.cls('label', p.labelPlacement)}
        >
          {p.label}
        </span>
      ) : null}
    </div>
  );
});

Radio.displayName = 'Radio';
