import type { ReactNode } from 'react';
import type { TextAreaDefaultProps as TADP, TextAreaProps as TAP } from '@pastweb/components-core/TextArea';

export type { TextAreaMediator } from '@pastweb/components-core/TextArea';

export type TextAreaProps = TAP & {
  children?: ReactNode;
};

export type TextAreaDefaultProps = TADP & {
  children?: ReactNode;
};
