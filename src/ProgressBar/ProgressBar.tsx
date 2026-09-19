import { forwardRef } from 'react';
import { useMediator, withDefaultProps } from '@pastweb/react';
import { progressbarMediator } from '@pastweb/components-core/ProgressBar';
import { DEFAULT_PROPS } from './constants';
import type { ProgressBarProps, ProgressBarDefaultProps, ProgressBarMediator } from './types';

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
  const p = withDefaultProps<ProgressBarDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<ProgressBarMediator>(progressbarMediator, p);
  const s = m.state;

  return (
    <div
      ref={ref}
      className={p.cls('ProgressBar', `type-${p.type}`, p.className)}
      role="progressbar"
      aria-label={s.ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={s.percentage}
      aria-valuetext={s.valueText}
    >
      {p.type === 'linear' ? (
        <div className={p.cls('linear')}>
          <div className={p.cls('filler')} style={{ width: s.width }}>
            {s.labelContent ? <div className={p.cls('label')}>{s.labelContent}</div> : null}
          </div>
        </div>
      ) : (
        <div className={p.cls('circular')}>
          <svg
            className={p.cls('svg')}
            viewBox={`0 0 ${p.size} ${p.size}`}
            aria-hidden="true"
          >
            <circle
              className={p.cls('track')}
              cx={p.size / 2}
              cy={p.size / 2}
              r={s.radius}
            />
            <circle
              className={p.cls('fill')}
              cx={p.size / 2}
              cy={p.size / 2}
              r={s.radius}
              strokeDasharray={s.circumference}
              strokeDashoffset={s.offset}
            />
          </svg>
          {s.labelContent ? <div className={p.cls('label')}>{s.labelContent}</div> : null}
        </div>
      )}
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';
