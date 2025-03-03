# LuxStay Setup Guide

## Prerequisites

- Node.js (v14 or later)
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)
- Firebase account and project
- Strapi backend server

## Installation Steps

1. Clone the repository
```bash
git clone <repository-url>
cd luxstay
```

2. Install Dependencies
```bash
# Make the install script executable
chmod +x scripts/install.sh

# Run the install script
./scripts/install.sh
```

3. Set up environment variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env
```

Required environment variables:
```
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
EXPO_PUBLIC_API_URL=your_strapi_api_url
```

4. Start the development server
```bash
# Start Expo development server
yarn start

# For iOS
yarn ios

# For Android
yarn android
```

## Project Structure

```
luxstay/
├── app/                    # App screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (payment)/         # Payment and checkout screens
│   ├── (tabs)/            # Main tab screens
│   └── room/              # Room details screens
├── components/            # Reusable components
├── constants/             # App constants and theme
├── services/             # API and Firebase services
├── store/                # Redux store and slices
│   └── slices/          # Redux Toolkit slices
├── types/                # TypeScript type definitions
└── utils/               # Helper functions and utilities
```

## Development Tasks

- `yarn start` - Start the Expo development server
- `yarn ios` - Start iOS simulator
- `yarn android` - Start Android emulator
- `yarn web` - Start web development server
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking

## Troubleshooting

1. Type errors after installation:
```bash
# Reinstall dependencies and types
yarn install
yarn add -D @types/lodash
```

2. Metro bundler issues:
```bash
# Clear Metro bundler cache
yarn start --clear
```

3. iOS build issues:
```bash
cd ios
pod install
cd ..
```

4. Android build issues:
```bash
cd android
./gradlew clean
cd ..
```

## Additional Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Strapi Documentation](https://strapi.io/documentation)