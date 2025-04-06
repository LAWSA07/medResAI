#!/bin/bash

# Install dependencies globally to avoid permission issues
npm install --no-save @vitejs/plugin-react vite

# Run the build directly using npx
npx --no-install vite build