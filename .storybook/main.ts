import { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.{js,jsx,ts,tsx}",
  ],
  framework: "@storybook/react-vite",
};

export default config;
