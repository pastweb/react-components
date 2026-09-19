import { forwardRef } from 'react';
import { CarouselItem as CI } from '@pastweb/react-components/Carousel';
import { cl } from '@/styles';
import type { CarouselItemProps } from './types';

import classes from '@pastweb/components-core/Carousel/CarouselItem/style.module.scss';

const cls = cl.setClasses(classes);

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>((props, ref) => (
  <CI {...props} ref={ref} cls={cls} />
));

CarouselItem.displayName = 'CarouselItem';
