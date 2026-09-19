import type { Row as TableRow, TableDefaultProps, TableState } from '../types';

export interface RowsProps {
  rows: TableRow[];
  defaultProps: TableDefaultProps;
  state: TableState;
  tableId: string;
  ancestorIsLast?: boolean[];
}
