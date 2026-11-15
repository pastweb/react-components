import { forwardRef } from 'react';
import {
  GlobalContext,
  useBeforeUnmount,
  useMediator,
  useMounted,
  useRef,
  withDefaultProps,
} from '@pastweb/react';
import { fileUploaderMediator } from '@pastweb/components-core/FileUploader';
import { DEFAULT_PROPS, FILE_UPLOADER_CONTEXT_KEY } from './constants';
import type {
  FileUploaderDefaultProps,
  FileUploaderMediator,
  FileUploaderProps,
} from './types';

export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>((props, ref) => {
  const p = withDefaultProps<FileUploaderDefaultProps>(props, DEFAULT_PROPS);
  const m = useMediator<FileUploaderMediator>(fileUploaderMediator, p);
  const s = m.state;
  const c = m.getContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useMounted(() => {
    if (!inputRef.value) return;
    m.useMounted(inputRef.value);
  });

  useBeforeUnmount(m.useBeforeUnmount);

  return (
    <GlobalContext update={{ [FILE_UPLOADER_CONTEXT_KEY]: c }}>
      <div
        ref={ref}
        id={m.id}
        className={p.cls('FileUploader', p.className, {
          'is-disabled': s.isDisabled,
          'is-dragging': s.isDragging,
          'is-dropzone': p.dropzone,
          'is-full': !s.canAddMore,
        })}
        aria-disabled={s.isDisabled}
        onDragEnter={m.onDragEnter}
        onDragOver={m.onDragOver}
        onDragLeave={m.onDragLeave}
        onDrop={m.onDrop}
      >
        {p.label ? (
          <label id={m.labelId} className={p.cls('label')} htmlFor={m.inputId}>
            {p.label}
          </label>
        ) : null}
        <button
          type='button'
          className={p.cls('trigger')}
          disabled={s.isDisabled}
          aria-disabled={s.isDisabled}
          aria-label={s.ariaLabel}
          aria-labelledby={p.label ? m.labelId : undefined}
          tabIndex={p.tabIndex}
          onClick={m.onActivate}
          onKeyDown={m.onKeyDown}
        >
          {p.children}
        </button>
        <input
          ref={inputRef}
          id={m.inputId}
          className={p.cls('inputElement')}
          type='file'
          name={p.name}
          accept={p.accept}
          multiple={p.multiple}
          disabled={s.isDisabled}
          tabIndex={-1}
          onChange={event => m.onChange(event)}
        />
      </div>
    </GlobalContext>
  );
});

FileUploader.displayName = 'FileUploader';
