import { forwardRef } from 'react';
import { Pagination as P } from '@pastweb/react-components/Pagination';
import { cl } from '@/styles';
import type { PaginationProps } from './types';

import classes from '@pastweb/components-core/Pagination/style.module.scss';

const cls = cl.setClasses(classes);

export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => (
  <P {...props} ref={ref} cls={cls} />
));

Pagination.displayName = 'Pagination';
