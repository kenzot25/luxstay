export type TabIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

// App route paths as string literals
export type AppRoutePaths =
  | "/"
  | "/search"
  | "/cart"
  | "/profile"
  | "/payment"
  | "/room/[id]"
  | "/(auth)/login"
  | "/(auth)/signup"
  | "/(auth)/forgot-password"
  | "/(tabs)"
  | "/(tabs)/search"
  | "/(tabs)/cart"
  | "/(tabs)/profile"
  | "/(tabs)/room/[id]"
  | "/(payment)/checkout"
  | "/(payment)/confirmation";

// Navigation params for routes that need them
export type RouteParams = {
  "/room/[id]": { id: string };
  "/(tabs)/room/[id]": { id: string };
  "/(payment)/checkout": { total: number; deposit: number };
  "/(payment)/confirmation": { bookingId: string };
};

// Helper type for dynamic route generation
export type DynamicRoute<T extends string> =
  T extends `${infer Start}[${infer Param}]${infer Rest}`
    ? `${Start}${string}${Rest}`
    : T;

// Helper type for getting params of a specific route
export type ParamsOf<T extends AppRoutePaths> = T extends keyof RouteParams
  ? RouteParams[T]
  : undefined;

// Type for router.push and router.replace
export interface RouterActions {
  push<T extends AppRoutePaths>(
    route: DynamicRoute<T>,
    params?: ParamsOf<T>
  ): void;
  replace<T extends AppRoutePaths>(
    route: DynamicRoute<T>,
    params?: ParamsOf<T>
  ): void;
  back(): void;
}

// Augment the expo-router module
declare module "expo-router" {
  export function useRouter(): RouterActions;
  export function useLocalSearchParams<T = Record<string, string>>(): T;
}
