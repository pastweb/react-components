import { getContext } from '@pastweb/react';
import { DROPDOWN_CONTEXT_KEY } from './constants';
import type { DropDownContext } from './types';

export function useDropDownContext(): DropDownContext {
  return getContext<DropDownContext>(DROPDOWN_CONTEXT_KEY);
}
