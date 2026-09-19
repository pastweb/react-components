import { DEFAULT_PROPS as CORE_DEFAULT_PROPS } from '@pastweb/components-core/Pagination';
import type { PaginationDefaultProps } from './types';

/** React renderer defaults preserve `Content` for previous and next controls. */
export const DEFAULT_PROPS: Partial<PaginationDefaultProps> = {
  ...CORE_DEFAULT_PROPS,
  prev: '◄',
  next: '►',
};
