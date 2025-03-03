export type RootStackParamList = {
  home: undefined;
  search: undefined;
  room: { id: string };
  cart: undefined;
  profile: undefined;
  "(auth)/login": undefined;
  "(auth)/signup": undefined;
  editProfile: undefined;
  settings: undefined;
  bookings: undefined;
  "(payment)/payment": undefined;
  "(payment)/confirmation": undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
