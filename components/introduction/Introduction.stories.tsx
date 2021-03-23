import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Introduction from "./Introduction";

export default {
  title: "Common/Introduction",
  component: Introduction,
} as Meta;

export const HowToPlay = () => <Introduction />;
