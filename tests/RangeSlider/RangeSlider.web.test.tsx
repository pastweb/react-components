import '@testing-library/jest-dom/vitest';
import axe from 'axe-core';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RangeSlider } from '../../src/RangeSlider';

function cls(...values: any[]): string {
  return values.flatMap(value => !value ? [] : typeof value === 'string' ? value : Object.entries(value).filter(([, on]) => on).map(([name]) => name)).join(' ');
}
afterEach(cleanup);

describe('RangeSlider', () => {
  it('given a label and range, when rendered, then native slider semantics are exposed', () => {
    render(<RangeSlider cls={cls} label='Volume' min={0} max={100} value={25} />);
    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveValue('25');
  });

  it('given an enabled slider, when changed and released, then both callbacks are reported', () => {
    const onChange = vi.fn();
    const onMouseUp = vi.fn();
    render(<RangeSlider cls={cls} min={0} max={100} onChange={onChange} onMouseUp={onMouseUp} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '75' } });
    fireEvent.pointerUp(slider);
    expect(onChange).toHaveBeenCalled();
    expect(onMouseUp).toHaveBeenCalledWith(75);
  });

  it('given a disabled slider, when rendered and audited, then state is native and accessible', async () => {
    const { container } = render(<RangeSlider cls={cls} min={0} max={100} disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
    expect(container.querySelector('.RangeSlider')).toHaveClass('is-disabled');
    expect((await axe.run(container)).violations).toHaveLength(0);
  });
});
