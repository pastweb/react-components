import { getContext } from '@pastweb/react';
import { CAROUSEL_CONTEXT_KEY } from './constants';
import type { CarouselContext } from './types';

/**
 * Reads the nearest Carousel's live state and command methods.
 *
 * @example
 * ```tsx
 * function NextCommand() {
 *   const carousel = useCarouselContext();
 *
 *   return <button onClick={carousel.next}>Next</button>;
 * }
 * ```
 */
export function useCarouselContext(): CarouselContext {
  return getContext<CarouselContext>(CAROUSEL_CONTEXT_KEY);
}
