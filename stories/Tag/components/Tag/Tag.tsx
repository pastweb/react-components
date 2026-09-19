import { forwardRef } from 'react';
import { Tag as T } from '@pastweb/react-components/Tag';
import { cl } from '@/styles';
import type { TagProps } from './types';

import classes from '@pastweb/components-core/Tag/style.module.scss';

const cls = cl.setClasses(classes);

export const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => (
  <T {...props} ref={ref} cls={cls} />
));

Tag.displayName = 'Tag';
