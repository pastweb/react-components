import type { TableMediator } from '@pastweb/components-core/Table';
import type { TableDefaultProps } from '../types';

export interface PinnedTableProps {
  mediator: TableMediator;
  defaultProps: TableDefaultProps;
  placement: 'left' | 'right';
};
