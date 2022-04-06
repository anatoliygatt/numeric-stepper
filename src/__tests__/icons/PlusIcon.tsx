import * as React from 'react';
import { render } from '@testing-library/react';
import { PlusIcon } from '../../icons/PlusIcon';

describe('PlusIcon', () => {
  test('renders without crashing', () => {
    expect(() => {
      render(<PlusIcon />);
    }).not.toThrowError();
  });

  test('renders into the document', () => {
    const { container } = render(<PlusIcon />);
    expect(container).toBeInTheDocument();
  });

  test('renders correctly', () => {
    const { container } = render(<PlusIcon />);
    expect(container).toMatchSnapshot();
  });
});
