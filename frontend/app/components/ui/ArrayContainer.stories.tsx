import type { Meta, StoryObj } from "@storybook/react";
import ArrayContainer from "./ArrayContainer";
import ValueTile from "./ValueTile";

const meta: Meta<typeof ArrayContainer> = {
  title: "UI/ArrayContainer",
  component: ArrayContainer,
  argTypes: {
    maxVisibleElements: { control: "number" },
    valueType: { control: { type: "inline-radio" }, options: ["number", "percent", "text"] },
    color: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof ArrayContainer>;

export const Default: Story = {
  args: { items: [1, 2, 3, 4, 5], maxVisibleElements: undefined },
};

export const Truncated: Story = {
  args: { items: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], maxVisibleElements: 5 },
};

export const PercentValues: Story = {
  args: { items: [0.12, 0.5, 0.873, 0.3], valueType: "percent", maxVisibleElements: undefined },
};

export const CustomColors: Story = {
  render: () => (
    <ArrayContainer
      items={[5, 6, 7, 8, 9, 10, 11]}
      maxVisibleElements={5}
      valueType="number"
      getColor={(i) => (i % 2 === 0 ? "#fef3c7" : "#ecfccb")}
    />
  ),
};
