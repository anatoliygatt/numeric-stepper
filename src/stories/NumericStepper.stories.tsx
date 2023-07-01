import * as React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { NumericStepper } from '../NumericStepper';

export default {
  title: 'NumericStepper',
  component: NumericStepper,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    controls: { disabled: true },
    actions: { disabled: true },
    a11y: { disable: true },
  },
} as ComponentMeta<typeof NumericStepper>;

const Template: ComponentStory<typeof NumericStepper> = (args) => {
  const [value, setValue] = React.useState(0);
  const onChange = (val: number) => {
    setValue(val);
  };
  return <NumericStepper {...args} value={value} onChange={onChange} />;
};

export const Playground = Template.bind({});
Playground.args = {
  minimumValue: 0,
  maximumValue: Number.MAX_SAFE_INTEGER,
  stepValue: 1,
  size: 'lg',
  inactiveTrackColor: '#2b2b2b',
  activeTrackColor: '#1f1f1f',
  hoverButtonColor: 'transparent',
  activeButtonColor: '#ececec',
  inactiveIconColor: '#858585',
  hoverIconColor: '#ffffff',
  activeIconColor: '#000000',
  disabledIconColor: '#383838',
  thumbColor: '#444444',
  thumbLabelColor: '#ffffff',
  thumbShadowAnimationOnTrackHoverEnabled: true,
  focusRingColor: '#ececec',
  decrementButtonAriaLabel: 'Decrement',
  thumbAriaLabel: undefined,
  incrementButtonAriaLabel: 'Increment',
};
Playground.parameters = {
  controls: { disabled: false },
  actions: { disabled: false },
  a11y: { disable: false },
};

export const Default = Template.bind({});

export const Customized = Template.bind({});
Customized.args = {
  minimumValue: 10,
  maximumValue: 100,
  stepValue: 10,
  size: 'lg',
  inactiveTrackColor: '#fed7aa',
  activeTrackColor: '#fddec0',
  activeButtonColor: '#ffedd5',
  inactiveIconColor: '#fb923c',
  hoverIconColor: '#ea580c',
  activeIconColor: '#9a3412',
  disabledIconColor: '#fdba74',
  thumbColor: '#f97316',
  thumbShadowAnimationOnTrackHoverEnabled: false,
  focusRingColor: '#fff7ed',
};
Customized.parameters = {
  backgrounds: {
    default: 'light',
  },
};
