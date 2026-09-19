import { Template } from '@pastweb/react';
import { useCarouselContext } from '@pastweb/react-components/Carousel';
import { Carousel, CarouselItem } from '.';

export function CarouselCommands() {
  const carousel = useCarouselContext();

  return (
    <div role='group' aria-label='Carousel controls'>
      <button
        type='button'
        onClick={carousel.prev}
        disabled={carousel.isDisabled}
      >
        Previous slide
      </button>
      <span aria-live='polite'>
        Slide {carousel.current + 1} of {carousel.itemsCount}
      </span>
      <button
        type='button'
        onClick={carousel.toggleAutoplay}
        disabled={carousel.isDisabled}
      >
        {carousel.isPaused ? 'Resume slide rotation' : 'Pause slide rotation'}
      </button>
      <button
        type='button'
        onClick={carousel.next}
        disabled={carousel.isDisabled}
      >
        Next slide
      </button>
    </div>
  );
}

export function CarouselWithCustomCommands() {
  return (
    <Carousel autoPlay ariaLabel='Featured stories'>
      <CarouselItem>First story</CarouselItem>
      <CarouselItem>Second story</CarouselItem>
      <Template name='commands'>
        <CarouselCommands />
      </Template>
    </Carousel>
  );
}
