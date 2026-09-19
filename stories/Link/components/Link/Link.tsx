import { forwardRef } from 'react';
import { Link as L } from '@pastweb/react-components/Link';
import { cl } from '@/styles';
import type { LinkProps } from './types';

import classes from '@pastweb/components-core/Link/style.module.scss';

const cls = cl.setClasses(classes);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <L {...props} ref={ref} cls={cls} />
));

Link.displayName = 'Link';
