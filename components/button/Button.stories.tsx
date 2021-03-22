import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Button, { ButtonProps } from "./Button";

export default {
  title: "Common/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Play = Template.bind({});
Play.args = {
  imgSrc: "/playSymbol.svg",
  href: "#",
};

export const Intro = Template.bind({});
Intro.args = {
  imgSrc: "/iSymbol.svg",
  href: "#",
};
