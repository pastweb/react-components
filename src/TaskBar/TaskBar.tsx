import { forwardRef } from 'react';
import { useMediator, withDefaultProps } from '@pastweb/react';
import { taskBarMediator } from '@pastweb/components-core/TaskBar';
import { DEFAULT_PROPS } from './constants';
import { setTaskBarButton } from './taskBarButtons';
import type { TaskBarDefaultProps, TaskBarMediator, TaskBarProps } from './types';

export const TaskBar = forwardRef<HTMLElement, TaskBarProps>((props, ref) => {
  const p = withDefaultProps<TaskBarDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TaskBarMediator>(taskBarMediator, p);
  const s = m.state;

  return (
    <nav ref={ref} className={p.cls('TaskBar', p.className)} aria-label={p.ariaLabel}>
      {s.windows.map(window => (
        <button
          key={window.id}
          className={p.cls('taskButton', {
            'is-active': window.id === s.activeId,
            'is-minimised': window.status === 'minimized',
          })}
          type='button'
          aria-pressed={window.id === s.activeId}
          ref={button => setTaskBarButton(window.id, button)}
          onClick={() => m.manageWindow(window)}
        >
          {p.getLabel(window)}
        </button>
      ))}
    </nav>
  );
});

TaskBar.displayName = 'TaskBar';
