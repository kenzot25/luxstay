#!/bin/bash

# Install dependencies
yarn install

# Install specific dev dependencies for types
yarn add -D @types/lodash

# Install additional required dependencies
yarn add lodash @react-native-community/slider

# Run type check
yarn type-check