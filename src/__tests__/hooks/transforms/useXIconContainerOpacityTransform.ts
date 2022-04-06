import { renderHook } from '@testing-library/react-hooks';
import { MotionValue } from 'framer-motion';
import type { Size } from '../../../NumericStepper';
import { useXIconContainerOpacityTransform } from '../../../hooks/transforms/useXIconContainerOpacityTransform';

type Case = [MotionValue<number>, Size, MotionValue<number>];

const cases: Case[] = [
  [new MotionValue(0), 'sm', new MotionValue(0)],
  [new MotionValue(31), 'sm', new MotionValue(0.5)],
  [new MotionValue(62), 'sm', new MotionValue(1)],
  [new MotionValue(0), 'md', new MotionValue(0)],
  [new MotionValue(46.5), 'md', new MotionValue(0.5)],
  [new MotionValue(93), 'md', new MotionValue(1)],
  [new MotionValue(0), 'lg', new MotionValue(0)],
  [new MotionValue(62), 'lg', new MotionValue(0.5)],
  [new MotionValue(124), 'lg', new MotionValue(1)],
];

describe.each(cases)(
  'useXIconContainerOpacityTransform',
  (thumbPositionY, size, expected) => {
    test(`returns ${expected.get()} when thumbPositionY=${thumbPositionY.get()} and size="${size}"`, () => {
      const { result } = renderHook(() =>
        useXIconContainerOpacityTransform(thumbPositionY, size)
      );
      expect(result.current.get()).toBe(expected.get());
    });
  }
);
