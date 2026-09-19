import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Tag } from '../../src/Tag';
const cls = (...v: any[]) => v.flatMap(x => !x ? [] : typeof x === 'string' ? x : Object.entries(x).filter(([, on]) => on).map(([k]) => k)).join(' ');
afterEach(cleanup);
describe('Tag', () => { it('applies rounded state while preserving its label', () => { render(<Tag cls={cls} rounded ariaLabel='Category: news'>News</Tag>); expect(screen.getByLabelText('Category: news')).toHaveClass('is-rounded'); }); });
