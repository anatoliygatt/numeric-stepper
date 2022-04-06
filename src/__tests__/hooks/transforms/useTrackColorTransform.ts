import { renderHook } from '@testing-library/react-hooks';
import { MotionValue } from 'framer-motion';
import type { Size } from '../../../NumericStepper';
import { useTrackColorTransform } from '../../../hooks/transforms/useTrackColorTransform';

type Case = [MotionValue<number>, Size, string, string, MotionValue<string>];

const cases: Case[] = [
  [
    new MotionValue(-110),
    'sm',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(31, 31, 31, 1)'),
  ],
  [
    new MotionValue(-55),
    'sm',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(37, 37, 37, 1)'),
  ],
  [
    new MotionValue(0),
    'sm',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(43, 43, 43, 1)'),
  ],
  [
    new MotionValue(55),
    'sm',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(37, 37, 37, 1)'),
  ],
  [
    new MotionValue(110),
    'sm',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(31, 31, 31, 1)'),
  ],
  [
    new MotionValue(-165),
    'md',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(31, 31, 31, 1)'),
  ],
  [
    new MotionValue(-82.5),
    'md',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(37, 37, 37, 1)'),
  ],
  [
    new MotionValue(0),
    'md',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(43, 43, 43, 1)'),
  ],
  [
    new MotionValue(82.5),
    'md',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(37, 37, 37, 1)'),
  ],
  [
    new MotionValue(165),
    'md',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(31, 31, 31, 1)'),
  ],
  [
    new MotionValue(-220),
    'lg',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(31, 31, 31, 1)'),
  ],
  [
    new MotionValue(-110),
    'lg',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(37, 37, 37, 1)'),
  ],
  [
    new MotionValue(0),
    'lg',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(43, 43, 43, 1)'),
  ],
  [
    new MotionValue(110),
    'lg',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(37, 37, 37, 1)'),
  ],
  [
    new MotionValue(220),
    'lg',
    '#2b2b2b',
    '#1f1f1f',
    new MotionValue('rgba(31, 31, 31, 1)'),
  ],
];

describe.each(cases)(
  'useTrackColorTransform',
  (thumbPositionX, size, inactiveTrackColor, activeTrackColor, expected) => {
    test(`returns "${expected.get()}" when thumbPositionX=${thumbPositionX.get()}, size="${size}", inactiveTrackColor="${inactiveTrackColor}" and activeTrackColor="${activeTrackColor}"`, () => {
      const { result } = renderHook(() =>
        useTrackColorTransform(
          thumbPositionX,
          size,
          inactiveTrackColor,
          activeTrackColor
        )
      );
      expect(result.current.get()).toBe(expected.get());
    });
  }
);
