import type { Content } from '@pastweb/react';
import type { PaginationDefaultProps as PDP, PaginationProps as PP } from '@pastweb/components-core/Pagination';

export type { PaginationItem, PaginationMediator, PaginationState } from '@pastweb/components-core/Pagination';

export type PaginationProps = Omit<PP, 'next' | 'prev'> & {
  next?: Content;
  prev?: Content;
};

export type PaginationDefaultProps = Omit<PDP, 'next' | 'prev'> & {
  next: Content;
  prev: Content;
};
