import { renderHook } from '@testing-library/react-hooks';
import { MotionValue } from 'framer-motion';
import type { Size } from '../../../NumericStepper';
import { useButtonOpacityTransform } from '../../../hooks/transforms/useButtonOpacityTransform';

type Case = [MotionValue<number>, Size, MotionValue<number>];

const cases: Case[] = [
  [new MotionValue(0), 'sm', new MotionValue(1)],
  [new MotionValue(11), 'sm', new MotionValue(0.5)],
  [new MotionValue(22), 'sm', new MotionValue(0)],
  [new MotionValue(0), 'md', new MotionValue(1)],
  [new MotionValue(16.5), 'md', new MotionValue(0.5)],
  [new MotionValue(33), 'md', new MotionValue(0)],
  [new MotionValue(0), 'lg', new MotionValue(1)],
  [new MotionValue(22), 'lg', new MotionValue(0.5)],
  [new MotionValue(44), 'lg', new MotionValue(0)],
];

describe.each(cases)(
  'useButtonOpacityTransform',
  (thumbPositionY, size, expected) => {
    test(`returns ${expected.get()} when thumbPositionY=${thumbPositionY.get()} and size="${size}"`, () => {
      const { result } = renderHook(() =>
        useButtonOpacityTransform(thumbPositionY, size)
      );
      expect(result.current.get()).toBe(expected.get());
    });
  }
);
