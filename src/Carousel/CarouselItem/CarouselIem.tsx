import { forwardRef } from 'react';
import { useBeforeMount, useMediator, withDefaultProps } from '@pastweb/react';
import { carouselItemMediator, DEFAULT_CAROUSEL_ITEM_PROPS } from '@pastweb/components-core/Carousel';
import type { CarouselItemMediator } from '@pastweb/components-core/Carousel';
import type { CarouselItemProps, CarouselItemDefaultProps } from './types';

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>((props, ref) => {
  const p = withDefaultProps<CarouselItemDefaultProps>(props, DEFAULT_CAROUSEL_ITEM_PROPS);
  const m = useMediator<CarouselItemMediator>(carouselItemMediator, p);
  const s = m.state;

  useBeforeMount(m.useBeforeMount);

  return (
    <div
      ref={ref}
      className={s.className}
      role={s.role}
      aria-roledescription={s.ariaRoleDescription}
      aria-label={s.ariaLabel}
      aria-hidden={s.ariaHidden}
      aria-disabled={s.isDisabled}
      inert={s.inert}
    >
      {p.children}
    </div>
  );
});

CarouselItem.displayName = 'CarouselItem';
