import type { KeyboardEvent } from 'react';
import { Render } from '@pastweb/react';
import { getBranchMarks, getColumnDragTransform, getExpandCellId, getPinnedStyle, isExpandableRow, orderByPin } from '@pastweb/components-core/Table';
import { ExpandGuide } from '../ExpandGuide';
import type { RowProps } from './types';

export function Row({ row, defaultProps: p, state: s, tableId, isLast = false, ancestorIsLast = [] }: RowProps) {
  const isGrouped = row.isGrouped?.();
  const cells = orderByPin(row.getVisibleCells());
  const expandCellId = getExpandCellId(cells);
  const marks = getBranchMarks(row.depth, isLast, ancestorIsLast);

  const activateRow = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (!p.onRowClick || event.target !== event.currentTarget) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    p.onRowClick(row);
  };

  return (
    <tr
      tabIndex={p.onRowClick ? 0 : undefined}
      onClick={() => p.onRowClick?.(row)}
      onKeyDown={activateRow}
      aria-selected={p.rowSelection ? row.isSelected() : undefined}
      className={p.cls(
        'row',
        row.isSelected() && 'selected',
        isGrouped && 'groupedRow',
        row.depth > 0 && 'subRow',
        p.onRowClick && 'is-interactive',
      )}
    >
      {cells.map(cell => {
        const colDef = cell.column.columnDef;
        const pinned = cell.column.isPinned();
        const content = isGrouped && colDef.aggregatedCell
          ? colDef.aggregatedCell
          : colDef.cell
            ? colDef.cell
            : cell.getValue?.() ?? '';
        const cellProps = (isGrouped && colDef.aggregatedCell) || colDef.cell
          ? { row, getValue: cell.getValue, isExpandable: isExpandableRow(row.original) }
          : undefined;
        const isExpandCell = cell.id === expandCellId;
        const showTree = isExpandCell && (row.canExpand() || (p.expanding && marks.length > 0));
        const isRowHeader = isGrouped && isExpandCell;
        const CellTag = isRowHeader ? 'th' : 'td';

        return (
          <CellTag
            key={cell.id}
            data-column-id={cell.column.id}
            headers={`${tableId}-${cell.column.id}`}
            scope={isRowHeader ? 'row' : undefined}
            className={p.cls('cell', pinned && `pinned-${pinned}`)}
            style={{ width: cell.column.getSize(), ...getPinnedStyle(s, cell.column.id), transform: getColumnDragTransform(cell.column.id, s) }}
          >
            {showTree ? (
              <div className={p.cls('expandableCell')}>
                <ExpandGuide cls={p.cls} marks={marks} row={row} />
                <span className={p.cls('expandableCellValue')}>
                  <Render content={content} props={cellProps} />
                </span>
              </div>
            ) : (
              <div className={p.cls('cellContent')}>
                <Render content={content} props={cellProps} />
              </div>
            )}
          </CellTag>
        );
      })}
    </tr>
  );
}
