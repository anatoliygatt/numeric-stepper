import { renderHook } from '@testing-library/react-hooks';
import { MotionValue } from 'framer-motion';
import type { Size } from '../../../NumericStepper';
import { usePlusIconColorTransform } from '../../../hooks/transforms/usePlusIconColorTransform';

type Case = [
  MotionValue<number>,
  Size,
  string,
  string,
  string,
  MotionValue<string>
];

const cases: Case[] = [
  [
    new MotionValue(-16),
    'sm',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(56, 56, 56, 1)'),
  ],
  [
    new MotionValue(-8),
    'sm',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(102, 102, 102, 1)'),
  ],
  [
    new MotionValue(0),
    'sm',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(133, 133, 133, 1)'),
  ],
  [
    new MotionValue(8),
    'sm',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(203, 203, 203, 1)'),
  ],
  [
    new MotionValue(16),
    'sm',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(255, 255, 255, 1)'),
  ],
  [
    new MotionValue(-24),
    'md',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(56, 56, 56, 1)'),
  ],
  [
    new MotionValue(-12),
    'md',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(102, 102, 102, 1)'),
  ],
  [
    new MotionValue(0),
    'md',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(133, 133, 133, 1)'),
  ],
  [
    new MotionValue(12),
    'md',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(203, 203, 203, 1)'),
  ],
  [
    new MotionValue(24),
    'md',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(255, 255, 255, 1)'),
  ],
  [
    new MotionValue(-32),
    'lg',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(56, 56, 56, 1)'),
  ],
  [
    new MotionValue(-16),
    'lg',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(102, 102, 102, 1)'),
  ],
  [
    new MotionValue(0),
    'lg',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(133, 133, 133, 1)'),
  ],
  [
    new MotionValue(16),
    'lg',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(203, 203, 203, 1)'),
  ],
  [
    new MotionValue(32),
    'lg',
    '#858585',
    '#ffffff',
    '#383838',
    new MotionValue('rgba(255, 255, 255, 1)'),
  ],
];

describe.each(cases)(
  'usePlusIconColorTransform',
  (
    thumbPositionX,
    size,
    inactiveIconColor,
    hoverIconColor,
    disabledIconColor,
    expected
  ) => {
    test(`returns "${expected.get()}" when thumbPositionX=${thumbPositionX.get()}, size="${size}", inactiveIconColor="${inactiveIconColor}", hoverIconColor="${hoverIconColor}" and disabledIconColor="${disabledIconColor}"`, () => {
      const { result } = renderHook(() =>
        usePlusIconColorTransform(
          thumbPositionX,
          size,
          inactiveIconColor,
          hoverIconColor,
          disabledIconColor
        )
      );
      expect(result.current.get()).toBe(expected.get());
    });
  }
);
