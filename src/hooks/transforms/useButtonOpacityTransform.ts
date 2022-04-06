import { useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { Size } from '../../NumericStepper';
import { sizeToScale } from '../../style';

export function useButtonOpacityTransform(
  thumbPositionY: MotionValue<number>,
  size: Size
): MotionValue<number> {
  return useTransform(thumbPositionY, [0, 22 * sizeToScale(size)], [1, 0]);
}
