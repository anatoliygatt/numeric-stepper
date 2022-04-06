import { useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { Size } from '../../NumericStepper';
import { sizeToScale } from '../../style';

export function useMinusIconColorTransform(
  thumbPositionX: MotionValue<number>,
  size: Size,
  inactiveIconColor: string,
  hoverIconColor: string,
  disabledIconColor: string
): MotionValue<string> {
  return useTransform(
    thumbPositionX,
    [16 * sizeToScale(size), 0, -16 * sizeToScale(size)],
    [disabledIconColor, inactiveIconColor, hoverIconColor]
  );
}
