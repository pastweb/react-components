import { getContext } from '@pastweb/react';
import { SELECT_CONTEXT_KEY } from './constants';
import type { SelectContext } from './types';

export function useSelectContext(): SelectContext {
  return getContext<SelectContext>(SELECT_CONTEXT_KEY);
}
