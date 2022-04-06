import { useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { Size } from '../../NumericStepper';
import { sizeToScale } from '../../style';

export function useXIconContainerOpacityTransform(
  thumbPositionY: MotionValue<number>,
  size: Size
): MotionValue<number> {
  return useTransform(thumbPositionY, [0, 62 * sizeToScale(size)], [0, 1]);
}
