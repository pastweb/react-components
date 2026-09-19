import { getContext } from '@pastweb/react';
import { TABLE_CONTEXT_KEY } from './constants';
import type { TableContext } from './types';

/**
 * Reads the nearest Table's live state and command methods.
 *
 * Use this hook from slot content or from a custom header or cell renderer.
 *
 * @example
 * ```tsx
 * function TableSearch() {
 *   const table = useTableContext();
 *
 *   return (
 *     <input
 *       value={table.state.tableFilter ?? ''}
 *       onChange={event => table.setTableFilter(event.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 */
export function useTableContext<TData = any>(): TableContext<TData> {
  return getContext<TableContext<TData>>(TABLE_CONTEXT_KEY);
}
