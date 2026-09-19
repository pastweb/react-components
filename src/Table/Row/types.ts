import type { Row as TableRow, TableDefaultProps, TableState } from '../types';

export interface RowProps {
  row: TableRow;
  defaultProps: TableDefaultProps;
  state: TableState;
  tableId: string;
  isLast?: boolean;
  ancestorIsLast?: boolean[];
}
