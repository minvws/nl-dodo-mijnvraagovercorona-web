import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "theme-ui";
import { withNextRouter } from "storybook-addon-next-router";
import { theme } from "../src/theme";

addDecorator(withNextRouter());
addDecorator((storyFn) => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
));
