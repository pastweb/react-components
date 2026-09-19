import type { ClassValue } from '@pastweb/tools';
import type { Row } from '../types';

export interface ExpandButtonProps {
  cls: (...args: ClassValue[]) => string;
  row: Row;
}
