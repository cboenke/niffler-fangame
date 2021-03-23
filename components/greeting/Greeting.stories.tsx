import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Greeting from "./Greeting";

export default {
  title: "Common/Greeting",
  component: Greeting,
} as Meta;

export const Welcome = () => <Greeting />;
