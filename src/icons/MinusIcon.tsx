import * as React from 'react';

export const MinusIcon = React.forwardRef<
  SVGSVGElement,
  JSX.IntrinsicElements['svg']
>((props, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
    ref={ref}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M20 12H4"
    />
  </svg>
));

MinusIcon.displayName = 'MinusIcon';
