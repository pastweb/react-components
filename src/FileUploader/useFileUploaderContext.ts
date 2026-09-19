import { getContext } from '@pastweb/react';
import { FILE_UPLOADER_CONTEXT_KEY } from './constants';
import type { FileUploaderContext } from './types';

export function useFileUploaderContext(): FileUploaderContext {
  return getContext<FileUploaderContext>(FILE_UPLOADER_CONTEXT_KEY);
}
