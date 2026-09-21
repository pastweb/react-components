import { forwardRef } from 'react';
import { FileUploader as F } from '@pastweb/react-components/FileUploader';
import { cl } from '@pastweb/tools';
import type { FileUploaderProps } from './types';

import classes from '@pastweb/components-core/FileUploader/style.module.scss';

const cls = cl.setClasses(classes);

export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>((props, ref) => (
  <F {...props} ref={ref} cls={cls} />
));

FileUploader.displayName = 'FileUploader';
