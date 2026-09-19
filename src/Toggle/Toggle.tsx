import { forwardRef } from 'react';
import { useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/react';
import {
  DEFAULT_PROPS,
  toggleMediator,
  type ToggleDefaultProps,
  type ToggleMediator,
  type ToggleProps,
} from '@pastweb/components-core/Toggle';

export const Toggle = forwardRef<HTMLDivElement, ToggleProps>((props, ref) => {
  const p = withDefaultProps<ToggleDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ToggleMediator>(toggleMediator, p);
  const s = m.state;

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div
      ref={ref}
      className={p.cls('Toggle', `label-${p.labelPlacement}`, p.className, {
        'is-checked': s.value,
        'is-disabled': s.isDisabled,
      })}
    >
      <label className={p.cls('control')}>
        <span className={p.cls('button')}>
          <input
            type='checkbox'
            role='switch'
            className={p.cls('input')}
            id={s.inputId}
            name={p.name}
            checked={s.value}
            disabled={s.isDisabled}
            aria-checked={s.value}
            aria-disabled={s.isDisabled}
            aria-label={s.ariaLabel}
            tabIndex={p.tabIndex}
            onChange={e => m.onChange(e.target.checked, e)}
          />
        </span>
        {p.label ? (
          <span className={p.cls('label', p.labelPlacement)}>
            {p.label}
          </span>
        ) : null}
      </label>
    </div>
  );
});

Toggle.displayName = 'Toggle';
