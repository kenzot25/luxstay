import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.EXPO_PUBLIC_APP_NAME || "LuxStay",
  slug: "luxstay",
  version: process.env.EXPO_PUBLIC_APP_VERSION || "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    url: "https://u.expo.dev/your-project-id",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.luxstay.app",
    buildNumber: "1.0.0",
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.luxstay.app",
    versionCode: 1,
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you share them with your friends.",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
  extra: {
    enableMaps: process.env.EXPO_PUBLIC_ENABLE_MAPS === "true",
    enableNotifications:
      process.env.EXPO_PUBLIC_ENABLE_NOTIFICATIONS === "true",
    enableSocialLogin: process.env.EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN === "true",
    environment: process.env.EXPO_PUBLIC_APP_ENVIRONMENT || "development",
    eas: {
      projectId: "your-eas-project-id",
    },
  },
  scheme: "luxstay",
  owner: "your-expo-username",
});
