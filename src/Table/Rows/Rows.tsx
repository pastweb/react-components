import { Fragment } from 'react';
import { getChildAncestorIsLast } from '@pastweb/components-core/Table';
import { Row } from '../Row';
import type { RowsProps } from './types';

export function Rows({ rows, defaultProps: p, state: s, tableId, ancestorIsLast = [] }: RowsProps) {
  return rows.map((row, index) => {
    const isExpanded = row.isExpanded();
    const isLast = index === rows.length - 1;

    return (
      <Fragment key={row.id}>
        <Row
          row={row}
          defaultProps={p}
          state={s}
          tableId={tableId}
          isLast={isLast}
          ancestorIsLast={ancestorIsLast}
        />
        {p.expanding && row.subRows.length > 0 && (
          <tr className={p.cls('expandedRow', { 'is-open': isExpanded })}>
            <td colSpan={s.allLeafColumns.length}>
              <div className={p.cls('expandedPanel', { 'is-open': isExpanded })}>
                <div
                  className={p.cls('expandedPanelInner')}
                  aria-hidden={!isExpanded || undefined}
                  inert={!isExpanded || undefined}
                >
                  <table
                    className={p.cls('table', 'expandedTable')}
                    style={s.tableStyle}
                    aria-label={`Expanded rows for ${row.id}`}
                  >
                    <colgroup>
                      {s.allLeafColumns.map(column => (
                        <col key={column.id} style={{ width: column.getSize() }} />
                      ))}
                    </colgroup>
                    <thead className={p.cls('visuallyHidden')}>
                      <tr>
                        {s.allLeafColumns.map(column => (
                          <th key={column.id} id={`${tableId}-${row.id}-${column.id}`} scope="col">
                            {column.columnDef.meta?.label ?? column.id}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <Rows
                        rows={row.subRows}
                        defaultProps={p}
                        state={s}
                        tableId={`${tableId}-${row.id}`}
                        ancestorIsLast={getChildAncestorIsLast(ancestorIsLast, row.depth, isLast)}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </td>
          </tr>
        )}
      </Fragment>
    );
  });
}
