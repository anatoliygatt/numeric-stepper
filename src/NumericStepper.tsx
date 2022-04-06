import * as React from 'react';
import { LazyMotion, domMax, useMotionValue, m } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import textFit from 'textfit';
import { useFirstMountState } from './hooks/useFirstMountState';
import { useButtonOpacityTransform } from './hooks/transforms/useButtonOpacityTransform';
import { useMinusIconColorTransform } from './hooks/transforms/useMinusIconColorTransform';
import { usePlusIconColorTransform } from './hooks/transforms/usePlusIconColorTransform';
import { useTrackColorTransform } from './hooks/transforms/useTrackColorTransform';
import { useTrackPositionTransform } from './hooks/transforms/useTrackPositionTransform';
import { useXIconContainerOpacityTransform } from './hooks/transforms/useXIconContainerOpacityTransform';
import { MinusIcon } from './icons/MinusIcon';
import { XIcon } from './icons/XIcon';
import { PlusIcon } from './icons/PlusIcon';
import { sizeToScale, StyledNumericStepper } from './style';

export type Size = 'sm' | 'md' | 'lg';

export type DragDirection = 'x' | 'y';

export interface StyledProps {
  size?: Size;
  inactiveTrackColor?: string;
  activeTrackColor?: string;
  hoverButtonColor?: string;
  activeButtonColor?: string;
  inactiveIconColor?: string;
  hoverIconColor?: string;
  activeIconColor?: string;
  disabledIconColor?: string;
  thumbColor?: string;
  thumbLabelColor?: string;
  thumbShadowAnimationOnTrackHoverEnabled?: boolean;
  focusRingColor?: string;
}

export interface AccessibilityProps {
  decrementButtonAriaLabel?: string;
  thumbAriaLabel?: string;
  incrementButtonAriaLabel?: string;
}

export interface Props extends StyledProps, AccessibilityProps {
  minimumValue?: number;
  maximumValue?: number;
  stepValue?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

export function NumericStepper({
  minimumValue = 0,
  maximumValue = Number.MAX_SAFE_INTEGER,
  stepValue = 1,
  initialValue = minimumValue,
  onChange,
  size = 'sm',
  inactiveTrackColor = '#2b2b2b',
  activeTrackColor = '#1f1f1f',
  hoverButtonColor = 'transparent',
  activeButtonColor = '#ececec',
  inactiveIconColor = '#858585',
  hoverIconColor = '#ffffff',
  activeIconColor = '#000000',
  disabledIconColor = '#383838',
  thumbColor = '#444444',
  thumbLabelColor = '#ffffff',
  thumbShadowAnimationOnTrackHoverEnabled = true,
  focusRingColor = '#ececec',
  decrementButtonAriaLabel,
  thumbAriaLabel,
  incrementButtonAriaLabel,
}: Props) {
  const [value, setValue] = React.useState<number>(initialValue);
  const [dragListener, setDragListener] = React.useState<boolean>(true);
  const [dragDirection, setDragDirection] = React.useState<DragDirection>();
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const draggableAreaRef = React.useRef<HTMLDivElement>(null);
  const thumbLabelContainerRef = React.useRef<HTMLDivElement>(null);
  const isFirstMount = useFirstMountState();
  const thumbPositionX = useMotionValue<number>(0);
  const thumbPositionY = useMotionValue<number>(0);
  const buttonOpacity = useButtonOpacityTransform(thumbPositionY, size);
  const minusIconColor = useMinusIconColorTransform(
    thumbPositionX,
    size,
    inactiveIconColor,
    hoverIconColor,
    disabledIconColor
  );
  const plusIconColor = usePlusIconColorTransform(
    thumbPositionX,
    size,
    inactiveIconColor,
    hoverIconColor,
    disabledIconColor
  );
  const trackColor = useTrackColorTransform(
    thumbPositionX,
    size,
    inactiveTrackColor,
    activeTrackColor
  );
  const trackPosition = useTrackPositionTransform(
    thumbPositionX,
    thumbPositionY
  );
  const xIconContainerOpacity = useXIconContainerOpacityTransform(
    thumbPositionY,
    size
  );

  React.useEffect(() => {
    if (!isFirstMount) {
      onChange?.(value);
    }
  }, [isFirstMount, onChange, value]);

  React.useLayoutEffect(() => {
    if (
      thumbLabelContainerRef.current &&
      thumbLabelContainerRef.current.getBoundingClientRect().width
    ) {
      textFit(thumbLabelContainerRef.current, {
        detectMultiLine: false,
        minFontSize: 4 * sizeToScale(size),
        maxFontSize: 25 * sizeToScale(size),
        widthOnly: true,
      });
    }
  }, [size, value]);

  const isDecrementable = value - stepValue >= minimumValue;
  const isIncrementable = value + stepValue <= maximumValue;

  function decrementValue(): void {
    if (isDecrementable) {
      setValue((value) => value - stepValue);
    }
  }

  function incrementValue(): void {
    if (isIncrementable) {
      setValue((value) => value + stepValue);
    }
  }

  function resetValue(): void {
    setValue(minimumValue);
  }

  function onDirectionLock(axis: DragDirection): void {
    setDragDirection(axis);
  }

  function onDragStart(): void {
    setIsDragging(true);
  }

  function onDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void {
    setDragListener(false);
    setTimeout(() => {
      setIsDragging(false);
      setDragListener(true);
    }, 350);

    if (dragDirection === 'x' && info.offset.x >= 6 * sizeToScale(size)) {
      incrementValue();
    } else if (
      dragDirection === 'x' &&
      info.offset.x <= -6 * sizeToScale(size)
    ) {
      decrementValue();
    } else if (
      dragDirection === 'y' &&
      info.offset.y >= 2 * sizeToScale(size)
    ) {
      resetValue();
    }
  }

  return (
    <LazyMotion features={domMax} strict>
      <StyledNumericStepper
        size={size}
        inactiveTrackColor={inactiveTrackColor}
        activeTrackColor={activeTrackColor}
        hoverButtonColor={hoverButtonColor}
        activeButtonColor={activeButtonColor}
        inactiveIconColor={inactiveIconColor}
        hoverIconColor={hoverIconColor}
        activeIconColor={activeIconColor}
        disabledIconColor={disabledIconColor}
        thumbColor={thumbColor}
        thumbLabelColor={thumbLabelColor}
        thumbShadowAnimationOnTrackHoverEnabled={
          thumbShadowAnimationOnTrackHoverEnabled
        }
        focusRingColor={focusRingColor}
        isDragging={isDragging}
        style={{
          x: trackPosition.x,
          y: trackPosition.y,
          backgroundColor: trackColor,
        }}
        data-testid="numeric-stepper"
      >
        <div ref={draggableAreaRef}>
          <m.button
            type="button"
            style={{ opacity: buttonOpacity, color: minusIconColor }}
            aria-disabled={!isDecrementable}
            aria-label={decrementButtonAriaLabel}
            data-testid="numeric-stepper-decrement-button"
            onClick={isDecrementable ? decrementValue : undefined}
          >
            <MinusIcon aria-hidden="true" />
          </m.button>
          <m.div
            style={{
              opacity: xIconContainerOpacity,
            }}
            aria-hidden="true"
          >
            <XIcon />
          </m.div>
          <m.button
            drag
            dragConstraints={draggableAreaRef}
            dragDirectionLock
            dragSnapToOrigin
            dragElastic={{
              left: 0.3,
              bottom: 0.5,
              right: 0.3,
            }}
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 250, bounceDamping: 15 }}
            dragListener={dragListener}
            type="button"
            style={{ x: thumbPositionX, y: thumbPositionY }}
            aria-label={thumbAriaLabel}
            aria-live="polite"
            data-testid="numeric-stepper-thumb"
            onDirectionLock={onDirectionLock}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={
              isIncrementable && !isDragging ? incrementValue : undefined
            }
          >
            <div ref={thumbLabelContainerRef}>{value}</div>
          </m.button>
          <m.button
            type="button"
            style={{ opacity: buttonOpacity, color: plusIconColor }}
            aria-disabled={!isIncrementable}
            aria-label={incrementButtonAriaLabel}
            data-testid="numeric-stepper-increment-button"
            onClick={isIncrementable ? incrementValue : undefined}
          >
            <PlusIcon aria-hidden="true" />
          </m.button>
        </div>
      </StyledNumericStepper>
    </LazyMotion>
  );
}
