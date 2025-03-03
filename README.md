# LuxStay - Luxury Room Booking App

A modern React Native mobile application for booking luxury accommodations. Built with Expo, Firebase, and Redux Toolkit.

![LuxStay Preview](./assets/images/preview.png)

## ✨ Features

- 🏨 Browse and search luxury rooms
- 🔍 Advanced filtering options
- 🔐 Firebase authentication
- 💳 Secure payment processing
- ❤️ Wishlist functionality
- 📱 Modern UI with native feel
- 🌙 Dark mode support
- 🌍 Multi-language support (coming soon)

## 🛠️ Built With

- [React Native](https://reactnative.dev/) - Mobile framework
- [Expo](https://expo.dev/) - Development platform
- [Firebase](https://firebase.google.com/) - Authentication & Cloud Functions
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Strapi](https://strapi.io/) - Headless CMS
- [Stripe](https://stripe.com/) - Payment processing (coming soon)

## 🚀 Getting Started

See our comprehensive [Setup Guide](./scripts/setup.md) for detailed instructions.

Quick start:

```bash
# Clone the repository
git clone https://github.com/yourusername/luxstay.git

# Install dependencies
cd luxstay
./scripts/install.sh

# Set up environment variables
cp .env.example .env

# Start the development server
yarn start
```

## 📱 App Structure

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
├── types/                # TypeScript definitions
└── utils/               # Helper functions
```

## 📄 Documentation

- [Setup Guide](./scripts/setup.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [State Management](./docs/state.md)

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run with coverage
yarn test --coverage

# Run specific test file
yarn test SearchScreen.test.ts
```

## 🚀 Deployment

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Developer - [Your Name](https://github.com/yourusername)
- Designer - [Designer Name](https://github.com/designerusername)

## 🙏 Acknowledgements

- [Expo Team](https://expo.dev) for the amazing development platform
- [Firebase](https://firebase.google.com) for authentication services
- [Strapi](https://strapi.io) for the headless CMS
- All contributors who helped with the project

## 📫 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourtwitter](https://twitter.com/yourtwitter)
- Email: your.email@example.com
