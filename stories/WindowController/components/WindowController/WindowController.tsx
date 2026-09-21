import { forwardRef } from 'react';
import { WindowController as W } from '@pastweb/react-components/WindowController';
import { cl } from '@pastweb/tools';
import type { WindowControllerProps } from './types';

import classes from '@pastweb/components-core/WindowController/style.module.scss';

const cls = cl.setClasses(classes);

export const WindowController = forwardRef<HTMLDivElement, WindowControllerProps>((props, ref) => (
  <W {...props} ref={ref} cls={cls} />
));

WindowController.displayName = 'WindowController';
