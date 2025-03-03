# Contributing to LuxStay

First off, thank you for considering contributing to LuxStay! It's people like you that make LuxStay such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable.
2. Update the docs/\* with details of changes to the API, if applicable.
3. The PR will be merged once you have the sign-off of two other developers.

## Code Style

- We use TypeScript for type safety
- Follow the existing code style
- Use meaningful variable names
- Write comments for complex logic
- Follow the [React Native Style Guide](https://github.com/airbnb/javascript/tree/master/react)

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- feat: (new feature)
- fix: (bug fix)
- docs: (documentation)
- style: (formatting, missing semi colons, etc)
- refactor: (refactoring code)
- test: (adding tests)
- chore: (updating grunt tasks etc)

Example:
```
feat: add user wishlist functionality
```

## Project Structure

```
luxstay/
├── app/                    # App screens and navigation
├── components/            # Reusable components
├── constants/             # App constants
├── services/             # API and external services
├── store/                # Redux store and slices
├── types/                # TypeScript types
└── utils/               # Helper functions
```

## Component Guidelines

1. Use functional components with hooks
2. Keep components small and focused
3. Use TypeScript interfaces for props
4. Implement error boundaries where needed
5. Write unit tests for complex logic

Example:
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  // Component implementation
};
```

## Documentation

- Document complex functions and components
- Use JSDoc style comments
- Keep the README up to date
- Update API documentation when needed

Example:
```typescript
/**
 * Formats a price with the specified currency
 * @param price - The price to format
 * @param currency - The currency code (default: 'USD')
 * @returns The formatted price string
 */
export function formatPrice(price: number, currency = 'USD'): string {
  // Implementation
}
```

## Issue and Bug Reports

- Use the bug report template
- Include reproduction steps
- Include expected vs actual behavior
- Include screenshots if applicable
- Include app version and device info

## Feature Requests

- Use the feature request template
- Explain the problem you're solving
- Explain your proposed solution
- Include mock-ups if applicable

## Setup Development Environment

1. Install dependencies:
```bash
./scripts/install.sh
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Start development server:
```bash
yarn start
```

## Questions?

Feel free to contact the maintainers:
- Email: maintainers@luxstay.com
- Discord: [LuxStay Community](https://discord.gg/luxstay)
- Twitter: [@luxstay](https://twitter.com/luxstay)