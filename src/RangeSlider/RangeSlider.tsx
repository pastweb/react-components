import { rangeSliderMediator } from '@pastweb/components-core/RangeSlider';
import { useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/react';
import { forwardRef } from 'react';
import { DEFAULT_PROPS } from './constants';
import type {
  RangeSliderDefaultProps,
  RangeSliderMediator,
  RangeSliderProps,
} from './types';

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>((props, ref) => {
  const p = withDefaultProps<RangeSliderDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<RangeSliderMediator>(rangeSliderMediator, p);
  const s = m.state;

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div ref={ref} className={p.cls('RangeSlider', `label-${p.labelPlacement}`, {
      'is-disabled': s.isDisabled,
    }, p.className)}>
      <input
        className={p.cls('slider')}
        type='range'
        id={s.inputId}
        min={p.min}
        max={p.max}
        step={p.step}
        value={s.value}
        disabled={s.isDisabled}
        aria-label={s.ariaLabel}
        onChange={e => m.onChange(e.currentTarget.value, e)}
        onPointerUp={m.onChangeEnd}
        onKeyUp={event => {
          if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
            m.onChangeEnd();
          }
        }}
      />
      {p.label ? (
        <label className={p.cls('label', p.labelPlacement)} htmlFor={s.inputId}>
          {p.label}
        </label>
      ) : null}
    </div>
  );
});

RangeSlider.displayName = 'RangeSlider';
