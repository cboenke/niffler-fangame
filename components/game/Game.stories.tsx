import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import Game from "./Game";

export default {
  title: "Common/Game",
  component: Game,
} as Meta;

export const Play = () => <Game />;
