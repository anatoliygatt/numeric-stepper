import * as React from 'react';

export const PlusIcon = React.forwardRef<
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
      d="M12 4v16m8-8H4"
    />
  </svg>
));

PlusIcon.displayName = 'PlusIcon';
