import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Template } from '@pastweb/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Carousel, CarouselItem, useCarouselContext } from '../../src/Carousel';

function cls(...values: any[]): string {
  return values
    .flatMap(value => {
      if (!value) return [];
      if (typeof value === 'string') return value;
      return Object.entries(value)
        .filter(([, enabled]) => enabled)
        .map(([className]) => className);
    })
    .join(' ');
}

function CarouselCommands() {
  const carousel = useCarouselContext();

  return (
    <>
      <button type='button' onClick={carousel.prev}>Custom previous</button>
      <button type='button' onClick={carousel.next}>Custom next</button>
      <button type='button' onClick={carousel.toggleAutoplay}>
        {carousel.isPaused ? 'Custom resume' : 'Custom pause'}
      </button>
    </>
  );
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Carousel', () => {
  it('given no accessible name prop, when rendered, then it uses the default name', () => {
    render(
      <Carousel cls={cls} id='stories'>
        <CarouselItem cls={cls}>Story</CarouselItem>
      </Carousel>,
    );

    const carousel = screen.getByRole('region', { name: 'Carousel' });
    expect(carousel).toHaveAttribute('id', 'stories');
    expect(carousel).toHaveAttribute(
      'aria-roledescription',
      'carousel',
    );
  });

  it('given an explicit empty accessible name, when rendered, then optional root semantics are omitted', () => {
    const { container } = render(
      <Carousel cls={cls} ariaLabel=''>
        <CarouselItem cls={cls}>Story</CarouselItem>
      </Carousel>,
    );

    const carousel = container.querySelector('.Carousel');
    expect(carousel).not.toHaveAttribute('aria-label');
    expect(carousel).not.toHaveAttribute('aria-roledescription');
    expect(carousel).not.toHaveAttribute('role');
    expect(carousel).not.toHaveAttribute('aria-disabled');
  });

  it('given two slides, when rendered, then it exposes labelled carousel and slide semantics', async () => {
    render(
      <Carousel cls={cls} ariaLabel='Featured stories'>
        <CarouselItem cls={cls}>First story</CarouselItem>
        <CarouselItem cls={cls}>Second story</CarouselItem>
      </Carousel>,
    );

    expect(screen.getByRole('region', { name: 'Featured stories' })).toHaveAttribute('aria-roledescription', 'carousel');
    await waitFor(() => expect(screen.getByRole('group', { name: 'Slide 1 of 2' })).not.toHaveAttribute('aria-hidden', 'true'));
    expect(document.querySelector('[aria-label="Slide 2 of 2"]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('given two slides, when next is activated, then the second slide becomes available', async () => {
    const user = userEvent.setup();
    render(
      <Carousel cls={cls} ariaLabel='Featured stories'>
        <CarouselItem cls={cls}>First story</CarouselItem>
        <CarouselItem cls={cls}>Second story</CarouselItem>
      </Carousel>,
    );

    await user.click(screen.getByRole('button', { name: 'Next slide' }));

    await waitFor(() => expect(screen.getByRole('group', { name: 'Slide 2 of 2' })).not.toHaveAttribute('aria-hidden', 'true'));
    expect(document.querySelector('[aria-label="Slide 1 of 2"]')).toHaveAttribute('aria-hidden', 'true');
  });

  it('given autoplay, when pause is activated, then automatic rotation stops', async () => {
    vi.useFakeTimers();
    render(
      <Carousel cls={cls} autoPlay autoPlayInterval={100} ariaLabel='Featured stories'>
        <CarouselItem cls={cls}>First story</CarouselItem>
        <CarouselItem cls={cls}>Second story</CarouselItem>
      </Carousel>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pause slide rotation' }));
    await act(async () => {
      vi.advanceTimersByTime(17);
      await Promise.resolve();
    });
    expect(screen.getByRole('button', { name: 'Resume slide rotation' })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(200));
    expect(screen.getByRole('group', { name: 'Slide 1 of 2' })).toBeInTheDocument();
  });

  it('given custom commands, when activated, then Carousel context controls navigation and pause state', async () => {
    render(
      <Carousel cls={cls} autoPlay ariaLabel='Featured stories'>
        <Template name='commands'>
          <CarouselCommands />
        </Template>
        <CarouselItem cls={cls}>First story</CarouselItem>
        <CarouselItem cls={cls}>Second story</CarouselItem>
      </Carousel>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Custom next' }));
    await waitFor(() => {
      expect(screen.getByRole('group', { name: 'Slide 2 of 2' }))
        .not.toHaveAttribute('aria-hidden', 'true');
    });

    fireEvent.click(screen.getByRole('button', { name: 'Custom pause' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Custom resume' })).toBeInTheDocument();
    });
  });

  it('given a disabled carousel and slide, when rendered, then class and native accessibility states agree', async () => {
    render(
      <Carousel cls={cls} disabled ariaLabel='Unavailable stories'>
        <CarouselItem cls={cls}>Unavailable story</CarouselItem>
      </Carousel>,
    );

    const carousel = screen.getByRole('region', { name: 'Unavailable stories' });
    expect(carousel).toHaveClass('is-disabled');
    expect(carousel).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();

    await waitFor(() => {
      const slide = document.querySelector('.CarouselItem');
      expect(slide).toHaveClass('is-disabled');
      expect(slide).toHaveAttribute('aria-disabled', 'true');
    });
  });

  it('given an enabled carousel, when rendered, then disabled attributes are omitted', async () => {
    render(
      <Carousel cls={cls} ariaLabel='Available stories'>
        <CarouselItem cls={cls}>Available story</CarouselItem>
      </Carousel>,
    );

    expect(screen.getByRole('region', { name: 'Available stories' })).not.toHaveAttribute('aria-disabled');
    expect(screen.getByRole('button', { name: 'Previous slide' })).not.toHaveAttribute('disabled');
    expect(screen.getByRole('button', { name: 'Previous slide' })).not.toHaveAttribute('aria-disabled');

    await waitFor(() => {
      expect(document.querySelector('.CarouselItem')).not.toHaveAttribute('aria-disabled');
    });
  });

  it('given a carousel, when audited, then it has no automated accessibility violations', async () => {
    const { container } = render(
      <Carousel cls={cls} ariaLabel='Featured stories'>
        <CarouselItem cls={cls}>First story</CarouselItem>
      </Carousel>,
    );

    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
