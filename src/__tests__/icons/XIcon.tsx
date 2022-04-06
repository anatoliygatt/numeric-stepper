import * as React from 'react';
import { render } from '@testing-library/react';
import { XIcon } from '../../icons/XIcon';

describe('XIcon', () => {
  test('renders without crashing', () => {
    expect(() => {
      render(<XIcon />);
    }).not.toThrowError();
  });

  test('renders into the document', () => {
    const { container } = render(<XIcon />);
    expect(container).toBeInTheDocument();
  });

  test('renders correctly', () => {
    const { container } = render(<XIcon />);
    expect(container).toMatchSnapshot();
  });
});
