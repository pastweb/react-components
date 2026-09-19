import { forwardRef } from 'react';
import { GlobalContext, useBeforeUnmount, useSlots, useMediator, withDefaultProps } from '@pastweb/react';
import { carouselMediator } from '@pastweb/components-core/Carousel';
import { CAROUSEL_CONTEXT_KEY, DEFAULT_PROPS } from './constants';
import type { CarouselDefaultProps, CarouselProps } from './types';
import type { CarouselMediator } from '@pastweb/components-core/Carousel';

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>((props, ref) => {
  const p = withDefaultProps<CarouselDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<CarouselMediator>(carouselMediator, p);
  const s = m.state;
  const c = m.getContext();
  const { Slots, Slot } = useSlots(p.children);

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [CAROUSEL_CONTEXT_KEY]: c }}>
      <Slots>
        <div
          ref={ref}
          id={m.id}
          className={s.className}
          role={s.role}
          aria-roledescription={s.ariaRoleDescription}
          aria-label={s.ariaLabel}
          aria-disabled={s.isDisabled}
          onKeyDown={m.onKeyDown}
        >
          <div className={p.cls('carouselInner')} style={{ transform: s.transform }} aria-live={s.ariaLive}>
            {p.children}
          </div>
          {p.showCommands && (
            <Slot name='commands'>
              <button
                type='button'
                className={p.cls('prev')}
                onClick={m.prev}
                disabled={s.isDisabled}
                aria-disabled={s.isDisabled}
                aria-label={s.prevAriaLabel}
              >
                <span aria-hidden='true'>◄</span>
              </button>
              <button
                type='button'
                className={p.cls('next')}
                onClick={m.next}
                disabled={s.isDisabled}
                aria-disabled={s.isDisabled}
                aria-label={s.nextAriaLabel}
              >
                <span aria-hidden='true'>►</span>
              </button>
            </Slot>
          )}
        </div>
      </Slots>
    </GlobalContext>
  );
});

Carousel.displayName = 'Carousel';
