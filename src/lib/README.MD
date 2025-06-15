# Library Directory

This directory contains utility functions, hooks, and types used throughout the application.

## Contents

- **hooks/**: Custom React hooks

  - `useWindowSize.ts`: Hook to track window dimensions

- **types/**: TypeScript type definitions

  - `index.ts`: Common type definitions used across the app

- **utils/**: Utility functions
  - `formatDate.ts`: Date formatting utilities

## Usage Examples

### Using the window size hook:

```tsx
import { useWindowSize } from "../lib/hooks/useWindowSize";

function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
    </div>
  );
}

import { formatDate } from "../lib/utils/formatDate";

function DateDisplay({ date }) {
  return <span>{formatDate(date)}</span>;
}
```
