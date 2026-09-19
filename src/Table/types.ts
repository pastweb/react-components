import type { ReactNode, RefObject } from 'react';
import type {
  TableProps as TP,
  TableDefaultProps as TDP,
  TableInstance,
  ColumnDef as CD,
  Column,
  Row,
} from '@pastweb/components-core/Table';

export type TableProps = TP & {
  tableInstance?: RefObject<TableInstance<any> | null> & { value: TableInstance<any> | null; };
  children?: ReactNode | ReactNode[];
};

export type TableDefaultProps = TDP & {
  tableInstance?: RefObject<TableInstance<any> | null> & { value: TableInstance<any> | null; };
  children?: ReactNode | ReactNode[];
};

export interface ColumnDef<TData = any> extends CD {
  header: string | ReactNode | ((props: { column: Column<TData> }) => ReactNode);
  cell?: (props: { row: Row<TData>; getValue: () => any; isExpandable: boolean }) => ReactNode;
  aggregatedCell?: (props: { row: Row<TData>; getValue: () => any }) => ReactNode;
  footer?: string | ReactNode | ((props: { column: Column<TData> }) => ReactNode);
};

export type {
  TableContext,
  TableMediator,
  TableState,
  TableInstance,
  TableRowFeatures,
  GetRowId,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  VisibilityState,
  ColumnOrderState,
  ColumnPinningState,
  GroupingState,
  ExpandedState,
  Row,
  Column,
  HeaderGroup,
  Header,
  Cell,
} from '@pastweb/components-core/Table';
