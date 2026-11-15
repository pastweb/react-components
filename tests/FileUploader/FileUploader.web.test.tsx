import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FileUploader } from '../../src/FileUploader';

function cls(...values: any[]): string {
  return values
    .flatMap(value => {
      if (!value) return [];
      if (typeof value === 'string') return value;
      return Object.entries(value)
        .filter(([, enabled]) => enabled)
        .map(([className]) => className);
    })
    .join(' ');
}

afterEach(cleanup);

describe('FileUploader', () => {
  it('given a native change event, when a file is selected, then it reports the selected file', () => {
    const onAddFile = vi.fn();
    const { container } = render(
      <FileUploader cls={cls} label='Upload a document' onAddFile={onAddFile}>
        Choose file
      </FileUploader>,
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['content'], 'report.txt', { type: 'text/plain' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onAddFile).toHaveBeenCalledWith(file, expect.any(FormData));
  });
});
