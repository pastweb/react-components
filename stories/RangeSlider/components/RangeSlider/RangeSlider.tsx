import { forwardRef } from 'react';
import { RangeSlider as RS } from '@pastweb/react-components/RangeSlider';
import { cl } from '@/styles';
import type { RangeSliderProps } from './types';

import classes from '@pastweb/components-core/RangeSlider/style.module.scss';

const cls = cl.setClasses(classes);

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>((props, ref) => (
  <RS {...props} ref={ref} cls={cls} />
));

RangeSlider.displayName = 'RangeSlider';
