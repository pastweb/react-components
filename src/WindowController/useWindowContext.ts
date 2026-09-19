import { getContext } from '@pastweb/react';
import { WINDOW_CONTEXT_KEY } from './constants';
import type { WindowContext } from './types';

export function useWindowContext(): WindowContext {
  return getContext<WindowContext>(WINDOW_CONTEXT_KEY);
}
