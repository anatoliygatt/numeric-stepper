import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { css } from '@emotion/react';
import { m } from 'framer-motion';
import type { Size, StyledProps } from './NumericStepper';

export function sizeToScale(size: Size): number {
  switch (size) {
    case 'sm':
      return 1;
    case 'md':
      return 1.5;
    case 'lg':
      return 2;
  }
}

type Props = Required<StyledProps> & { isDragging: boolean };

const options = {
  shouldForwardProp: isPropValid,
};

export const StyledNumericStepper = styled(m.div, options)<Props>`
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 9999px;
  box-sizing: border-box;
  width: ${(props) => 185 * sizeToScale(props.size)}px;
  height: ${(props) => 74 * sizeToScale(props.size)}px;
  padding: ${(props) => 7 * sizeToScale(props.size)}px
    ${(props) => 17 * sizeToScale(props.size)}px;
  background-color: ${(props) => props.inactiveTrackColor};

  ${(props) =>
    props.thumbShadowAnimationOnTrackHoverEnabled &&
    css`
      &:hover > div > button:nth-of-type(2) {
        box-shadow: 0 ${20 * sizeToScale(props.size)}px
            ${25 * sizeToScale(props.size)}px ${28 * sizeToScale(props.size)}px
            rgb(0 0 0 / 0.1),
          0 ${1.5 * sizeToScale(props.size)}px ${2 * sizeToScale(props.size)}px
            ${-1 * sizeToScale(props.size)}px rgb(0 0 0 / 0.5);
      }
    `}

  & > div {
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;

    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      color: ${(props) => props.hoverIconColor};

      & > svg {
        width: ${(props) => 30 * sizeToScale(props.size)}px;
        height: ${(props) => 30 * sizeToScale(props.size)}px;
      }
    }

    & > button {
      align-items: center;
      justify-content: center;
      display: flex;
      border: 0 solid ${(props) => props.focusRingColor};
      border-radius: 50%;
      padding: 0;
      cursor: pointer;
      appearance: none;
      outline: none;
      -webkit-tap-highlight-color: transparent;

      &:focus {
        border-width: ${(props) => 1 * sizeToScale(props.size)}px;
      }

      &:focus:not(:focus-visible) {
        border-width: 0;
      }

      &:focus-visible {
        border-width: ${(props) => 1 * sizeToScale(props.size)}px;
      }
    }

    & > button:nth-of-type(2n + 1) {
      transition: border-width 50ms,
        color ${(props) => (props.isDragging ? 0 : 150)}ms,
        background-color 150ms;
      width: ${(props) => 34 * sizeToScale(props.size)}px;
      height: ${(props) => 34 * sizeToScale(props.size)}px;
      margin: ${(props) => 5 * sizeToScale(props.size)}px;
      background-color: transparent;
      color: ${(props) => props.inactiveIconColor};
      user-select: none;

      & > svg {
        width: ${(props) => 30 * sizeToScale(props.size)}px;
        height: ${(props) => 30 * sizeToScale(props.size)}px;
      }

      &[aria-disabled='false']:hover {
        background-color: ${(props) => props.hoverButtonColor};
        color: ${(props) => props.hoverIconColor} !important;
      }

      &[aria-disabled='false']:active {
        background-color: ${(props) => props.activeButtonColor};
        color: ${(props) => props.activeIconColor} !important;
      }

      &[aria-disabled='true'] {
        cursor: default;
        color: ${(props) => props.disabledIconColor} !important;
      }
    }

    & > button:nth-of-type(2) {
      z-index: 1;
      transition: box-shadow 150ms;
      margin: 0 ${(props) => 2 * sizeToScale(props.size)}px;
      box-shadow: 0 ${(props) => 5 * sizeToScale(props.size)}px
          ${(props) => 5 * sizeToScale(props.size)}px
          ${(props) => -2 * sizeToScale(props.size)}px rgb(0 0 0 / 0.1),
        0 ${(props) => 1.5 * sizeToScale(props.size)}px
          ${(props) => 2 * sizeToScale(props.size)}px
          ${(props) => -1 * sizeToScale(props.size)}px rgb(0 0 0 / 0.5);
      width: ${(props) => 60 * sizeToScale(props.size)}px;
      height: ${(props) => 60 * sizeToScale(props.size)}px;
      background-color: ${(props) => props.thumbColor};
      color: ${(props) => props.thumbLabelColor};

      & > div {
        align-items: center;
        justify-content: center;
        display: flex;
        width: ${(props) => 46 * sizeToScale(props.size)}px;
      }

      &:active {
        box-shadow: 0 ${(props) => 5 * sizeToScale(props.size)}px
            ${(props) => 5 * sizeToScale(props.size)}px
            ${(props) => -2 * sizeToScale(props.size)}px rgb(0 0 0 / 0.1),
          0 ${(props) => 1.5 * sizeToScale(props.size)}px
            ${(props) => 2 * sizeToScale(props.size)}px
            ${(props) => -1 * sizeToScale(props.size)}px rgb(0 0 0 / 0.5);
      }
    }
  }
`;
