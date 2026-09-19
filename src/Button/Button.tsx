import { forwardRef } from 'react';
import {
  Render,
  useBeforeUnmount,
  withDefaultProps,
  useMediator,
  useSlots,
  type Content,
} from '@pastweb/react';
import { buttonMediator } from '@pastweb/components-core/Button';
import { DEFAULT_PROPS } from './constants';
import type { ButtonDefaultProps, ButtonMediator, ButtonProps } from './types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const p = withDefaultProps<ButtonDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ButtonMediator>(buttonMediator, p);
  const s = m.state;
  const { Slots, Slot } = useSlots(p.children);

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <Slots>
      <button
        ref={ref}
        id={m.id}
        type={p.type}
        className={p.cls('Button', p.className, {
          'is-disabled': s.isDisabled,
          'is-loading': s.isLoading,
        })}
        onClick={m.onClick}
        disabled={s.isDisabled}
        aria-disabled={s.isDisabled}
        aria-busy={s.isLoading || undefined}
        tabIndex={p.tabIndex}
      >
        <Slot map={(child, i) => (
          <span key={i} className={p.cls('item')}>
            <Render content={child as Content} />
          </span>
        )}
        />
        {s.isLoading && (
          <span className={p.cls('loading')} role='status' aria-live='polite'>
            <Slot name='loading'>
              Loading...
            </Slot>
          </span>
        )}
      </button>
    </Slots>
  );
});

Button.displayName = 'Button';
