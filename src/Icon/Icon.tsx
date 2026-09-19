import { forwardRef } from 'react';
import { useMediator, withDefaultProps } from '@pastweb/react';
import { iconMediator, type IconMediator } from '@pastweb/components-core/Icon';
import { DEFAULT_PROPS } from './constants';
import type { IconDefaultProps, IconProps } from './types';

export const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const p = withDefaultProps<IconDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<IconMediator>(iconMediator, p);
  const s = m.state;

  if (!s.iconData && !s.src) return null;

  return (
    <i
      ref={ref}
      className={p.cls('Icon', p.className)}
      role={s.role}
      aria-label={s.ariaLabel}
      aria-hidden={s.ariaHidden}
      {...(s.iconData ? { dangerouslySetInnerHTML: { __html: s.iconData as string } } : {})}
    >
      {s.src ? <img src={s.src} alt="" /> : null}
    </i>
  );
});

Icon.displayName = 'Icon';
