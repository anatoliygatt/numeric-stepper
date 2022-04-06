import { renderHook } from '@testing-library/react-hooks';
import { MotionValue } from 'framer-motion';
import { useTrackPositionTransform } from '../../../hooks/transforms/useTrackPositionTransform';
import type { TrackPosition } from '../../../hooks/transforms/useTrackPositionTransform';

type Case = [MotionValue<number>, MotionValue<number>, TrackPosition];

const cases: Case[] = [
  [
    new MotionValue(0),
    new MotionValue(0),
    { x: new MotionValue(0), y: new MotionValue(0) },
  ],
  [
    new MotionValue(-176),
    new MotionValue(0),
    { x: new MotionValue(-32), y: new MotionValue(0) },
  ],
  [
    new MotionValue(0),
    new MotionValue(26),
    { x: new MotionValue(0), y: new MotionValue(4) },
  ],
  [
    new MotionValue(44),
    new MotionValue(-130),
    { x: new MotionValue(8), y: new MotionValue(-20) },
  ],
];

describe.each(cases)(
  'useTrackPositionTransform',
  (thumbPositionX, thumbPositionY, expected) => {
    test(`returns {x: ${expected.x.get()}, y: ${expected.y.get()}} when thumbPositionX=${thumbPositionX.get()} and thumbPositionY=${thumbPositionY.get()}`, () => {
      const { result } = renderHook(() =>
        useTrackPositionTransform(thumbPositionX, thumbPositionY)
      );
      expect(result.current.x.get()).toBe(expected.x.get());
      expect(result.current.y.get()).toBe(expected.y.get());
    });
  }
);
