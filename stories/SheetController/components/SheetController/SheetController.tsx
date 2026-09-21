import { forwardRef } from 'react';
import { SheetController as S } from '@pastweb/react-components/SheetController';
import { cl } from '@pastweb/tools';
import type { SheetControllerProps } from './types';

import classes from '@pastweb/components-core/SheetController/style.module.scss';

const cls = cl.setClasses(classes);

export const SheetController = forwardRef<HTMLDivElement, SheetControllerProps>((props, ref) => (
  <S {...props} ref={ref} cls={cls} />
));

SheetController.displayName = 'SheetController';
