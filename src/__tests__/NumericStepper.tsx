import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { NumericStepper } from '../NumericStepper';

describe('NumericStepper', () => {
  test('renders without crashing', () => {
    expect(() => {
      render(<NumericStepper />);
    }).not.toThrowError();
  });

  test('renders into the document', () => {
    render(<NumericStepper />);
    expect(screen.getByTestId('numeric-stepper')).toBeInTheDocument();
  });

  test('renders with the default props', () => {
    render(<NumericStepper />);
    expect(screen.getByTestId('numeric-stepper')).toMatchSnapshot();
  });

  test('renders with the default props and size="md"', () => {
    render(<NumericStepper size="md" />);
    expect(screen.getByTestId('numeric-stepper')).toMatchSnapshot();
  });

  test('renders with the custom props', () => {
    render(
      <NumericStepper
        minimumValue={10}
        maximumValue={100}
        stepValue={10}
        initialValue={20}
        size="lg"
        inactiveTrackColor="#fed7aa"
        activeTrackColor="#fddec0"
        activeButtonColor="#ffedd5"
        inactiveIconColor="#fb923c"
        hoverIconColor="#ea580c"
        activeIconColor="#9a3412"
        disabledIconColor="#fdba74"
        thumbColor="#f97316"
        thumbShadowAnimationOnTrackHoverEnabled={false}
        focusRingColor="#fff7ed"
      />
    );
    expect(screen.getByTestId('numeric-stepper')).toMatchSnapshot();
  });

  test('renders a decrement button in a disabled but focusable state when the value is not decrementable', async () => {
    const onChange = jest.fn();

    render(<NumericStepper onChange={onChange} />);

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-disabled', 'true');
    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).not.toHaveFocus();

    await userEvent.tab();

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveFocus();

    await userEvent.keyboard('{space/}');

    expect(onChange).not.toHaveBeenCalled();

    await userEvent.tab();

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).not.toHaveFocus();
  });

  test('renders a thumb in a pseudo-disabled but focusable state when the value is not incrementable', async () => {
    const onChange = jest.fn();

    render(
      <NumericStepper maximumValue={3} initialValue={3} onChange={onChange} />
    );

    expect(screen.getByTestId('numeric-stepper-thumb')).not.toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();

    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveFocus();

    await userEvent.keyboard('{space/}');

    expect(onChange).not.toHaveBeenCalled();

    await userEvent.tab();

    expect(screen.getByTestId('numeric-stepper-thumb')).not.toHaveFocus();
  });

  test('renders an increment button in a disabled but focusable state when the value is not incrementable', async () => {
    const onChange = jest.fn();

    render(
      <NumericStepper maximumValue={10} initialValue={10} onChange={onChange} />
    );

    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-disabled', 'true');
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).not.toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();

    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveFocus();

    await userEvent.keyboard('{space/}');

    expect(onChange).not.toHaveBeenCalled();

    await userEvent.tab();

    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).not.toHaveFocus();
  });

  test('renders a decrement button with an aria-label attribute when decrementButtonAriaLabel="Decrement"', () => {
    render(<NumericStepper decrementButtonAriaLabel="Decrement" />);
    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-label', 'Decrement');
  });

  test('renders a thumb with an aria-label attribute when thumbAriaLabel="0 items"', () => {
    render(<NumericStepper thumbAriaLabel="0 items" />);
    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveAttribute(
      'aria-label',
      '0 items'
    );
  });

  test('renders an increment button with an aria-label attribute when incrementButtonAriaLabel="Increment"', () => {
    render(<NumericStepper incrementButtonAriaLabel="Increment" />);
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-label', 'Increment');
  });

  test('responds to a user interaction', async () => {
    const onChange = jest.fn();

    render(
      <NumericStepper
        minimumValue={1}
        maximumValue={5}
        stepValue={2}
        initialValue={3}
        onChange={onChange}
      />
    );

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveTextContent('3');
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(onChange).not.toHaveBeenCalled();

    await userEvent.click(
      screen.getByTestId('numeric-stepper-decrement-button')
    );

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveTextContent('1');
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1);

    await userEvent.click(
      screen.getByTestId('numeric-stepper-decrement-button')
    );

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveTextContent('1');
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(onChange).toHaveBeenCalledTimes(1);

    await userEvent.click(screen.getByTestId('numeric-stepper-thumb'));

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveTextContent('3');
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(3);

    await userEvent.click(
      screen.getByTestId('numeric-stepper-increment-button')
    );

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveTextContent('5');
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-disabled', 'true');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith(5);

    await userEvent.click(screen.getByTestId('numeric-stepper-thumb'));

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveTextContent('5');
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-disabled', 'true');
    expect(onChange).toHaveBeenCalledTimes(3);

    await userEvent.click(
      screen.getByTestId('numeric-stepper-increment-button')
    );

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveTextContent('5');
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveAttribute('aria-disabled', 'true');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  test('responds to a change in focused state when tabbing with the keyboard', async () => {
    render(<NumericStepper />);

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).not.toHaveFocus();
    expect(screen.getByTestId('numeric-stepper-thumb')).not.toHaveFocus();
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).not.toHaveFocus();

    await userEvent.tab();

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).toHaveFocus();

    await userEvent.tab();

    expect(screen.getByTestId('numeric-stepper-thumb')).toHaveFocus();

    await userEvent.tab();

    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).toHaveFocus();

    await userEvent.tab();

    expect(
      screen.getByTestId('numeric-stepper-decrement-button')
    ).not.toHaveFocus();
    expect(screen.getByTestId('numeric-stepper-thumb')).not.toHaveFocus();
    expect(
      screen.getByTestId('numeric-stepper-increment-button')
    ).not.toHaveFocus();
  });

  test('complies with the web accessibility standards', async () => {
    const { container } = render(
      <NumericStepper
        decrementButtonAriaLabel="Decrement"
        incrementButtonAriaLabel="Increment"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
