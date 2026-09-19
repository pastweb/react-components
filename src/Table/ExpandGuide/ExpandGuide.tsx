import { ExpandButton } from '../ExpandButton';
import type { ExpandGuideProps } from './types';

export function ExpandGuide({ cls, marks, row }: ExpandGuideProps) {
  return (
    <span className={cls('expandGuide')}>
      {marks.map((mark, level) => (
        <span key={level} className={cls('expandBranch')} aria-hidden="true">
          {mark}
        </span>
      ))}
      {row.canExpand() ? <ExpandButton cls={cls} row={row} /> : null}
    </span>
  );
}
