import type {
  FileUploaderDefaultProps as FUDP,
  FileUploaderProps as FUP,
} from '@pastweb/components-core/FileUploader';
import type { ReactNode } from 'react';

export type {
  FileUploaderContext,
  FileUploaderMediator,
  FileUploaderState,
} from '@pastweb/components-core/FileUploader';

export type FileUploaderProps = FUP & {
  children?: ReactNode;
};

export type FileUploaderDefaultProps = FUDP & {
  children?: ReactNode;
};
