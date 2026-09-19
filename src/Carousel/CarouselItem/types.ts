import type { ReactNode } from 'react';
import type { CarouselItemProps as CIP, CarouselItemDefaultProps as CIDP } from '@pastweb/components-core/Carousel';

export type CarouselItemProps = CIP & {
  children: ReactNode;
};

export type CarouselItemDefaultProps = CIDP & {
  children: ReactNode;
};
