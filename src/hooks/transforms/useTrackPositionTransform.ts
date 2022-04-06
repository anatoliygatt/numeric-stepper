import { useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

export interface TrackPosition {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function useTrackPositionTransform(
  thumbPositionX: MotionValue<number>,
  thumbPositionY: MotionValue<number>
): TrackPosition {
  const x = useTransform(thumbPositionX, (value) => value / 5.5);
  const y = useTransform(thumbPositionY, (value) => value / 6.5);
  return { x, y };
}
