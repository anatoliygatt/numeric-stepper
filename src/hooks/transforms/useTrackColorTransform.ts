import { useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { Size } from '../../NumericStepper';
import { sizeToScale } from '../../style';

export function useTrackColorTransform(
  thumbPositionX: MotionValue<number>,
  size: Size,
  inactiveTrackColor: string,
  activeTrackColor: string
): MotionValue<string> {
  return useTransform(
    thumbPositionX,
    [-110 * sizeToScale(size), 0, 110 * sizeToScale(size)],
    [activeTrackColor, inactiveTrackColor, activeTrackColor]
  );
}
