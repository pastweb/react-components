import { Fragment } from 'react';
import { Render } from '@pastweb/react';
import { getExpandCellId, isExpandableRow, orderByPin } from '@pastweb/components-core/Table';
import { ExpandButton } from '../ExpandButton';
import type { PinnedTableProps } from './types';

export function PinnedTable(props: PinnedTableProps) {
  const { defaultProps: p, mediator: m, placement } = props;
  const s = m.state;

  return (
    <table className={p.cls('table')} style={{ width: 'auto' }}>
      <thead className={p.cls('thead')}>
        {s.headerGroups.map(hg => (
          <tr key={hg.id} className={p.cls('headerRow')}>
            {hg.headers.filter(h => h.column.isPinned() === placement).map(h => {
              return (
                <th
                  key={h.id}
                  data-header-id={h.id}
                  colSpan={h.colSpan}
                  className={p.cls(
                    h.column.isPinned() && `pinned-${h.column.isPinned()}`,
                    h.column.isSorted() && `sorted-${h.column.isSorted()}`
                  )}
                  style={{ width: s.columnPinning[placement][h.id] }}
                  draggable={p.columnOrdering}
                  onDragStart={h.onDragStart}
                  onDragOver={h.onDragOver}
                  onDragEnd={h.onDragEnd}
                  onDrop={h.onDrop}
                >
                  <div className={p.cls('headerCell')}>
                    {typeof h.column.columnDef.header !== 'string' ? (
                      <Render content={h.column.columnDef.header} props={{ column: h.column }} />
                    ) : (
                      <div className={p.cls('headerContent')}>
                        {h.column.columnDef.header}
                      </div>
                    )}
                    {/* Resizer */}
                    {h.column.canResize() && (
                      <div
                        className={p.cls('resizer')}
                        draggable={false}
                        onMouseDown={h.onResize}
                        onTouchStart={h.onResize}
                      />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {s.rows.map(row => {
          const isGrouped = row.isGrouped?.();
          const isExpanded = row.isExpanded();
          const expandCellId = getExpandCellId(orderByPin(row.getVisibleCells()));
          const pinnedCells = row.getVisibleCells().filter(cell => cell.column.isPinned() === placement);

          const renderCells = (currentRow: typeof row) => {
            const grouped = currentRow.isGrouped?.();
            return currentRow.getVisibleCells()
            .filter(cell => cell.column.isPinned() === placement)
            .map(cell => {
              const colDef = cell.column.columnDef;
              const content = grouped && colDef.aggregatedCell ? colDef.aggregatedCell : colDef.cell ? colDef.cell : cell.getValue?.() ?? '';
              const cellProps = (grouped && colDef.aggregatedCell) || colDef.cell
                ? { row: currentRow, getValue: cell.getValue, isExpandable: isExpandableRow(currentRow.original) }
                : undefined;
              const isExpandCell = cell.id === expandCellId;
              const showExpand = p.expanding && isExpandCell && currentRow.canExpand();
              const alignToParentText = p.expanding && isExpandCell && currentRow.depth > 0 && !showExpand;

              return (
                <td
                  key={cell.id}
                  data-column-id={cell.column.id}
                  className={p.cls('cell')}
                  style={{ width: cell.column.getSize() }}
                >
                  {showExpand || alignToParentText ? (
                    <div className={p.cls('expandableCell')}>
                      {showExpand ? (
                        <ExpandButton cls={p.cls} row={currentRow} />
                      ) : (
                        <span className={p.cls('expandButtonSpacer')} aria-hidden="true" />
                      )}
                      <span className={p.cls('expandableCellValue')}>
                        <Render content={content} props={cellProps} />
                      </span>
                    </div>
                  ) : (
                    <div className={p.cls('cellContent')}>
                      <Render content={content} props={cellProps} />
                    </div>
                  )}
                </td>
              );
            });
          };

          return (
            <Fragment key={row.id}>
              <tr
                onClick={() => p.onRowClick?.(row)}
                className={p.cls(
                  'row',
                  row.isSelected() && 'selected',
                  isGrouped && 'groupedRow',
                  row.depth > 0 && 'subRow'
                )}
                style={{ paddingLeft: `${row.depth * 20}px` }}
              >
                {renderCells(row)}
              </tr>
              {p.expanding && row.subRows.length > 0 && pinnedCells.length > 0 && (
                <tr className={p.cls('expandedRow', { 'is-open': isExpanded })}>
                  <td colSpan={Math.max(1, pinnedCells.length)}>
                    <div className={p.cls('expandedPanel', { 'is-open': isExpanded })}>
                      <div
                        className={p.cls('expandedPanelInner')}
                        aria-hidden={!isExpanded || undefined}
                        inert={!isExpanded || undefined}
                      >
                        <table className={p.cls('table', 'expandedTable')}>
                          <tbody>
                            {row.subRows.map(subRow => (
                              <tr key={subRow.id} className={p.cls('row', 'subRow')}>
                                {renderCells(subRow)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
