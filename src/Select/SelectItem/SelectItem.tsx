import { forwardRef } from 'react';
import { Render, getContext, useBeforeMount, useRef, withDefaultProps } from '@pastweb/react';
import type { Content } from '@pastweb/react';
import { DEFAULT_SELECT_ITEM_PROPS, SELECT_CONTEXT_KEY } from './constants';
import type { SelectItemProps, SelectItemDefaultProps, SelectContext } from './types';

export const SelectItem = forwardRef<HTMLLIElement, SelectItemProps>((props, ref) => {
  const p = withDefaultProps<SelectItemDefaultProps>(props, DEFAULT_SELECT_ITEM_PROPS);
  const c = getContext<SelectContext>(SELECT_CONTEXT_KEY);
  const s = c.state;
  const i = useRef<number>(0);

  useBeforeMount(() => {
    i.value = c.registerItem();
  });

  return (
    <li
      ref={ref}
      role='option'
      aria-selected={p.value === s.value}
      aria-disabled={p.disabled || undefined}
      className={p.cls('SelectItem', {
        'is-selected': p.value === s.value,
        'is-highlighted': i.value === s.highlightIndex,
        'is-disabled': p.disabled,
      }, p.className)}
      onClick={() => !p.disabled && c.onChange(p.value)}
      onKeyDown={e => c.onOptionKeyDown(e, p.value, p.disabled)}
      tabIndex={-1}
    >
      <Render content={p.children as Content} />
    </li>
  );
});

SelectItem.displayName = 'SelectItem';
