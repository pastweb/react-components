import { getContext } from '@pastweb/react';
import { TOAST_CONTEXT_KEY } from './constants';
import type { ToastContext } from './types';

export function useToastContext(): ToastContext {
  return getContext<ToastContext>(TOAST_CONTEXT_KEY);
}
