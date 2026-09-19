import { forwardRef } from 'react';
import { Radio as R } from '@pastweb/react-components/Radio';
import { cl } from '@/styles';
import type { RadioProps } from './types';

import classes from '@pastweb/components-core/Radio/style.module.scss';

const cls = cl.setClasses(classes);

export const Radio = forwardRef<HTMLDivElement, RadioProps>((props, ref) => (
  <R {...props} ref={ref} cls={cls} />
));

Radio.displayName = 'Radio';
