import type { RangeSliderDefaultProps as RSDP, RangeSliderProps as RSP } from '@pastweb/components-core/RangeSlider';
import type { ChangeEvent } from 'react';
export type { RangeSliderMediator } from '@pastweb/components-core/RangeSlider';

export type RangeSliderProps = Omit<RSP, 'onChange'> & {
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
};

export type RangeSliderDefaultProps = Omit<RSDP, 'onChange'> & {
  onChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
};
