import * as React from 'react';
import { render } from '@testing-library/react';
import { MinusIcon } from '../../icons/MinusIcon';

describe('MinusIcon', () => {
  test('renders without crashing', () => {
    expect(() => {
      render(<MinusIcon />);
    }).not.toThrowError();
  });

  test('renders into the document', () => {
    const { container } = render(<MinusIcon />);
    expect(container).toBeInTheDocument();
  });

  test('renders correctly', () => {
    const { container } = render(<MinusIcon />);
    expect(container).toMatchSnapshot();
  });
});
