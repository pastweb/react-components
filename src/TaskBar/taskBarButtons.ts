import type { WindowBounds } from '@pastweb/tools';

const buttons = new Map<string, HTMLButtonElement>();

/**
 * Stores the rendered TaskBar button for a managed window.
 *
 * @example
 * ```tsx
 * <button ref={button => setTaskBarButton(window.id, button)} />
 * ```
 */
export function setTaskBarButton(id: string, button: HTMLButtonElement | null): void {
  if (button) buttons.set(id, button);
  else buttons.delete(id);
}

/**
 * Reads framework-neutral bounds for a rendered TaskBar button.
 *
 * @example
 * ```ts
 * const bounds = getTaskBarButtonBounds('editor');
 * ```
 */
export function getTaskBarButtonBounds(id: string): WindowBounds | undefined {
  const rect = buttons.get(id)?.getBoundingClientRect();
  if (!rect) return undefined;

  return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
}
