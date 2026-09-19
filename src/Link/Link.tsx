import { forwardRef } from 'react';
import { useMediator, withDefaultProps } from '@pastweb/react';
import { linkMediator } from '@pastweb/components-core/Link';
import { DEFAULT_PROPS } from './constants';
import type { LinkDefaultProps, LinkMediator, LinkProps } from './types';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const p = withDefaultProps<LinkDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<LinkMediator>(linkMediator, p);
  const s = m.state;

  return (
    <a
      ref={ref}
      className={p.cls('Link', p.className, { 'is-disabled': s.isDisabled })}
      href={s.isDisabled ? undefined : p.href}
      target={p.target}
      rel={p.target === '_blank' ? 'noopener noreferrer' : undefined}
      id={p.id}
      aria-disabled={s.isDisabled}
      tabIndex={s.isDisabled ? -1 : undefined}
      onClick={m.onClick}
    >
      {p.children}
    </a>
  );
});

Link.displayName = 'Link';
