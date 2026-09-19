import { forwardRef } from 'react';
import { GlobalContext, Render, setRef, useRef, useBeforeUnmount, useMediator, useMounted, useSlots, withDefaultProps } from '@pastweb/react';
import { getColumnDragTransform, getPinnedStyle, orderByPin, tableMediator } from '@pastweb/components-core/Table';
import { DEFAULT_PROPS, TABLE_CONTEXT_KEY } from './constants';
import { Rows } from './Rows';
import type { TableDefaultProps, TableMediator, TableProps } from './types';

export const Table = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const p = withDefaultProps<TableDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<TableMediator>(tableMediator, p);
  const { Slots, Slot } = useSlots(p.children);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const { state: s, table } = m;
  const c = m.getContext();

  useMounted(() => {
    if (!tableRef.value) return;
    m.onMounted(tableRef.value);
    if (p.tableInstance) setRef(p.tableInstance, table);
  });

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [TABLE_CONTEXT_KEY]: c }}>
      <Slots>
        <div ref={ref} className={p.cls('Table', p.className)}>
          <div className={p.cls('header')}>
            <Slot name='header' />
          </div>
          <div className={p.cls('body')}>
            <table
              ref={tableRef}
              className={p.cls('table', s.draggingColumnId && 'is-reordering')}
              style={s.tableStyle}
              aria-label={p.caption ? undefined : p.ariaLabel || undefined}
            >
            {p.caption ? <caption className={p.cls('caption')}>{p.caption}</caption> : null}
            <thead className={p.cls('thead')}>
              {s.headerGroups.map(headerGroup => (
                <tr key={headerGroup.id} className={p.cls('headerRow')}>
                  {orderByPin(headerGroup.headers).map(header => {
                    const col = header.column;
                    const pinned = col.isPinned();
                    const sorted = col.isSorted();
                    const heading = typeof col.columnDef.header === 'string'
                      ? col.columnDef.header
                      : col.columnDef.meta?.label ?? col.id;

                    return (
                      <th
                        key={header.id}
                        id={`${m.id}-${col.id}`}
                        scope="col"
                        data-header-id={header.id}
                        data-column-id={col.id}
                        colSpan={header.colSpan}
                        className={p.cls(pinned && `pinned-${pinned}`, s.draggingColumnId === col.id && 'is-dragging')}
                        style={{ width: col.getSize(), ...getPinnedStyle(s, col.id), transform: getColumnDragTransform(col.id, s) }}
                        aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined}
                      >
                        <div
                          className={p.cls('headerCell', { 'drag-over': s.dragOverColumnId && s.dragOverColumnId === col.id })}
                          draggable={p.columnOrdering}
                          onDragStart={header.onDragStart}
                          onDragOver={header.onDragOver}
                          onDragEnd={header.onDragEnd}
                          onDrop={header.onDrop}
                        >
                          {typeof col.columnDef.header !== 'string' ? (
                            <Render content={col.columnDef.header} props={{ column: col }} />
                          ) : (
                            <div className={p.cls('headerContent')}>
                              {col.columnDef.header}
                            </div>
                          )}
                          {col.canResize() && (
                            <button
                              type="button"
                              className={p.cls('resizer')}
                              draggable={false}
                              aria-label={`Resize ${heading} column`}
                              aria-orientation="vertical"
                              onMouseDown={header.onResize}
                              onTouchStart={header.onResize}
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
              {s.rows.length === 0 ? (
                <tr className={p.cls('emptyRow')}>
                  <td className={p.cls('emptyCell')} colSpan={Math.max(1, s.allLeafColumns.length)}>
                    {p.emptyMessage}
                  </td>
                </tr>
              ) : (
                <Rows rows={s.rows} defaultProps={p} state={s} tableId={m.id} />
              )}
            </tbody>
            </table>
          </div>
          <div className={p.cls('footer')}>
            <Slot name='footer' />
          </div>
        </div>
      </Slots>
    </GlobalContext>
  );
});

Table.displayName = 'Table';
