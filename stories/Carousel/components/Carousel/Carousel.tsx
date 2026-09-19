import { forwardRef } from 'react';
import { Carousel as C } from '@pastweb/react-components/Carousel';
import { cl } from '@/styles';
import type { CarouselProps } from './types';

import classes from '@pastweb/components-core/Carousel/style.module.scss';

const cls = cl.setClasses(classes);

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>((props, ref) => (
  <C {...props} ref={ref} cls={cls} />
));

Carousel.displayName = 'Carousel';
