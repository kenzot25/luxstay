export const Colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#4CD964",
  danger: "#FF3B30",
  warning: "#FF9500",
  info: "#5AC8FA",
  gray: "#8E8E93",
  lightGray: "#E5E5EA",
  background: "#F2F2F7",
  white: "#FFFFFF",
  black: "#000000",
  text: {
    primary: "#000000",
    secondary: "#8E8E93",
    light: "#C7C7CC",
  },
  border: {
    default: "#C6C6C8",
    light: "#E5E5EA",
  },
  // Theme specific colors
  dark: {
    primary: "#0A84FF",
    background: "#000000",
    card: "#151515",
    text: "#FFFFFF",
    border: "#262629",
  },
  light: {
    primary: "#007AFF",
    background: "#F2F2F7",
    card: "#FFFFFF",
    text: "#000000",
    border: "#C6C6C8",
  },
} as const;

export type ColorTheme = typeof Colors;

export default Colors;
