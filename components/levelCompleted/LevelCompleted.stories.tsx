import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import LevelCompleted from "./LevelCompleted";

export default {
  title: "Common/LevelCompleted",
  component: LevelCompleted,
} as Meta;

export const Completed = () => <LevelCompleted />;
