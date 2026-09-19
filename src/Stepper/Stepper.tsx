import { forwardRef } from 'react';
import { Render, useBeforeUnmount, useMediator, withDefaultProps } from '@pastweb/react';
import { getStepAriaLabel, stepperMediator } from '@pastweb/components-core/Stepper';
import { DEFAULT_PROPS, DEFAULT_STEP_PROPS } from './constants';
import type { StepDefaultProps, StepperDefaultProps, StepperMediator, StepperProps } from './types';

export const Stepper = forwardRef<HTMLDivElement, StepperProps>((props, ref) => {
  const p = withDefaultProps<StepperDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<StepperMediator>(stepperMediator, p);
  const s = m.state;
  const steps = p.steps.map(step => withDefaultProps<StepDefaultProps>(step, DEFAULT_STEP_PROPS));

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <div
      ref={ref}
      id={m.id}
      className={p.cls('Stepper', `is-${p.orientation}`, `labels-${s.labelPosition}`, p.className)}
    >
      <ol className={p.cls('steps')} aria-label={s.ariaLabel}>
        {steps.map((step, index) => {
          const state = m.getStepState(index);
          const titleId = `title${m.id}${index}`;
          const descriptionId = `description${m.id}${index}`;
          const stepAriaLabel = getStepAriaLabel(step, index, steps.length);
          const indicator = (
            <span className={p.cls('indicator-content')} aria-hidden='true'>
              <Render content={step.content ?? index + 1} />
            </span>
          );

          return (
            <li
              key={`${m.id}${index}`}
              className={p.cls('step', `is-${state}`, { 'is-disabled': step.disabled }, step.className)}
              aria-current={state === 'active' ? 'step' : undefined}
              aria-label={!step.label && step.onClick === DEFAULT_STEP_PROPS.onClick ? stepAriaLabel : undefined}
            >
              <div className={p.cls('step-main')}>
                {step.onClick !== DEFAULT_STEP_PROPS.onClick ? (
                  <button
                    type='button'
                    className={p.cls('indicator')}
                    disabled={step.disabled}
                    onClick={step.onClick}
                    aria-label={stepAriaLabel}
                    aria-labelledby={!step.ariaLabel && step.label ? titleId : undefined}
                    aria-describedby={step.description ? descriptionId : undefined}
                  >
                    {indicator}
                  </button>
                ) : (
                  <span className={p.cls('indicator')}>{indicator}</span>
                )}
                {index < steps.length - 1 && <span className={p.cls('line')} aria-hidden='true' />}
              </div>
              {(step.label || step.description) && (
                <div className={p.cls('label')}>
                  {step.label && <span id={titleId} className={p.cls('title')}>{step.label}</span>}
                  {step.description && <small id={descriptionId}>{step.description}</small>}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
});

Stepper.displayName = 'Stepper';
