import { forwardRef } from 'react';
import { useBeforeUnmount, useSlots, useMediator, withDefaultProps } from '@pastweb/react';
import { checkboxMediator } from '@pastweb/components-core/Checkbox';
import { DEFAULT_PROPS } from './constants';
import type { CheckboxDefaultProps, CheckboxMediator, CheckboxProps } from './types';

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>((props, ref) => {
  const p = withDefaultProps<CheckboxDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<CheckboxMediator>(checkboxMediator, p);
  const s = m.state;
  const { Slots, Slot } = useSlots(p.children);

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <Slots>
      <div
        ref={ref}
        className={p.cls('Checkbox', `label-${p.labelPlacement}`, p.className, {
          'is-disabled': s.isDisabled,
          'is-checked': s.value,
        })}
      >
        <label className={p.cls('control')}>
          <span className={p.cls('box')}>
            <input
              type='checkbox'
              className={p.cls('input')}
              id={m.id}
              name={p.name}
              checked={s.value}
              disabled={s.isDisabled}
              aria-disabled={s.isDisabled}
              aria-label={s.ariaLabel}
              tabIndex={p.tabIndex}
              onChange={e => m.onChange(e.target.checked)}
            />
            <Slot name='check' props={{ checkChar: p.checkChar }}>
              <span className={p.cls('check')} aria-hidden='true'>
                {p.checkChar}
              </span>
            </Slot>
          </span>
          {p.label ? (
            <span className={p.cls('label', p.labelPlacement)}>
              {p.label}
            </span>
          ) : null}
        </label>
      </div>
    </Slots>
  );
});

Checkbox.displayName = 'Checkbox';
