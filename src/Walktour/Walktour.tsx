import { forwardRef } from 'react';
import { Render, useBeforeUnmount, useMediator, useMounted, withDefaultProps } from '@pastweb/react';
import { DEFAULT_PROPS, walktourMediator } from '@pastweb/components-core/Walktour';
import type { WalktourDefaultProps, WalktourMediator, WalktourProps } from './types';

export const Walktour = forwardRef<HTMLDivElement, WalktourProps>((props, ref) => {
  const p = withDefaultProps<WalktourDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<WalktourMediator>(walktourMediator, p);
  const s = m.state;
  const step = s.step;

  useMounted(m.useMounted);
  useBeforeUnmount(m.useBeforeUnmount);

  if (!s.isOpen || !step) return null;

  return (
    <div ref={ref} className={p.cls('Walktour', p.className)} style={{ zIndex: p.zIndex }} aria-live='polite'>
      {s.isMaskVisible && s.hole ? (
        <>
          <button type='button' className={p.cls('maskPiece')} style={{ top: 0, left: 0, right: 0, height: s.hole.top }} onClick={m.onMaskClick} tabIndex={-1} aria-hidden='true' />
          <button type='button' className={p.cls('maskPiece')} style={{ top: s.hole.bottom, left: 0, right: 0, bottom: 0 }} onClick={m.onMaskClick} tabIndex={-1} aria-hidden='true' />
          <button type='button' className={p.cls('maskPiece')} style={{ top: s.hole.top, left: 0, width: s.hole.left, height: s.hole.bottom - s.hole.top }} onClick={m.onMaskClick} tabIndex={-1} aria-hidden='true' />
          <button type='button' className={p.cls('maskPiece')} style={{ top: s.hole.top, left: s.hole.right, right: 0, height: s.hole.bottom - s.hole.top }} onClick={m.onMaskClick} tabIndex={-1} aria-hidden='true' />
          <div
            className={p.cls('spotlight')}
            style={{
              top: s.hole.top,
              left: s.hole.left,
              width: s.hole.right - s.hole.left,
              height: s.hole.bottom - s.hole.top,
              borderRadius: s.maskRadius,
              pointerEvents: s.isTargetInteractionDisabled ? 'auto' : 'none',
            }}
            onClick={s.isTargetInteractionDisabled ? m.onMaskClick : undefined}
          />
        </>
      ) : null}
      {s.isMaskVisible && !s.hole ? <button type='button' className={p.cls('maskPiece')} style={{ inset: 0 }} onClick={m.onMaskClick} tabIndex={-1} aria-hidden='true' /> : null}
      <section className={p.cls('card')} style={s.cardPosition} role='dialog' aria-modal='true' aria-label={typeof step.title === 'string' ? step.title : 'Guided tour'}>
        {step.title ? <h2 className={p.cls('title')}><Render content={step.title} /></h2> : null}
        <div className={p.cls('description')}><Render content={step.description} /></div>
        <footer className={p.cls('footer')}>
          <span className={p.cls('progress')}>{s.stepIndex + 1} / {p.steps.length}</span>
          {s.canClose ? <button type='button' className={p.cls('button')} onClick={m.close}>{s.closeLabel}</button> : null}
          {s.canPrevious ? <button type='button' className={p.cls('button')} onClick={m.previous}>{s.previousLabel}</button> : null}
          {s.canNext ? <button type='button' className={p.cls('button')} onClick={m.next}>{s.nextLabel}</button> : null}
        </footer>
      </section>
    </div>
  );
});

Walktour.displayName = 'Walktour';
