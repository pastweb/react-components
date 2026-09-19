import { forwardRef } from 'react';
import { TextArea as TA } from '@pastweb/react-components/TextArea';
import { cl } from '@/styles';
import type { TextAreaProps } from './types';

import classes from '@pastweb/components-core/TextArea/style.module.scss';

const cls = cl.setClasses(classes);

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>((props, ref) => (
  <TA {...props} ref={ref} cls={cls} />
));

TextArea.displayName = 'TextArea';
