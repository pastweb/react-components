import { getContext } from '@pastweb/react';
import { SHEET_CONTEXT_KEY } from './constants';
import type { SheetContext } from './types';

export function useSheetContext(): SheetContext {
  return getContext<SheetContext>(SHEET_CONTEXT_KEY);
}
