import { forwardRef } from 'react';
import { Select as S } from '@pastweb/react-components/Select';
import { cl } from '@/styles';
import type { SelectProps } from './types';

import classes from '@pastweb/components-core/Select/style.module.scss';

const cls = cl.setClasses(classes);

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => (
  <S {...props} ref={ref} cls={cls} />
));

Select.displayName = 'Select';
