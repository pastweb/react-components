import type { BranchMark, Row } from '@pastweb/components-core/Table';
import type { ClassValue } from '@pastweb/tools';

export interface ExpandGuideProps {
  cls: (...args: ClassValue[]) => string;
  marks: BranchMark[];
  row: Row;
}
