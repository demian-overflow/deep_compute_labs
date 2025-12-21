import type { Meta, StoryObj } from "@storybook/react";
import ValueTile from "./ValueTile";

const meta: Meta<typeof ValueTile> = {
  title: "UI/ValueTile",
  component: ValueTile,
  argTypes: {
    color: { control: "color" },
    valueType: { control: { type: "inline-radio" }, options: ["number", "percent", "text"] },
    value: { control: "text" },
    index: { control: "number" },
  },
};

export default meta;

type Story = StoryObj<typeof ValueTile>;

export const Default: Story = {
  args: { value: 42, valueType: "number" },
};

export const Percent: Story = {
  args: { value: 0.873, valueType: "percent", color: "#ecfdf5", index: 1 },
};

export const Text: Story = {
  args: { value: "N/A", valueType: "text", color: "#f8fafc" },
};
