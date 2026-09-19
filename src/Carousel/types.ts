import type { ReactNode } from 'react';
import type { CarouselDefaultProps as CDP, CarouselProps as CP } from '@pastweb/components-core/Carousel';

export type {
  CarouselContext,
  CarouselContextMethods,
  CarouselMediator,
  CarouselState,
} from '@pastweb/components-core/Carousel';

export type CarouselProps = CP & {
  children: ReactNode;
};

export type CarouselDefaultProps = CDP & {
  children: ReactNode;
};
