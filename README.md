# React Light Snackbar

A lightweight, customizable snackbar component for React with TypeScript support. Perfect for showing notifications, alerts, and messages to users.

## Features

- 🚀 **Lightweight** - Minimal bundle size with no external dependencies
- 🎨 **Customizable** - Multiple variants, positions, and styling options
- 📱 **Responsive** - Works great on all device sizes
- ♿ **Accessible** - Built with accessibility in mind
- 🔧 **TypeScript** - Full TypeScript support with type definitions
- ⚡ **Modern React** - Built with React hooks and modern patterns
- 🎭 **Smooth Animations** - Beautiful enter/exit transitions
- 🎯 **Flexible** - Support for custom actions, styling, and behavior

## Installation

```bash
# Using npm
npm install react-light-snackbar

# Using yarn
yarn add react-light-snackbar

# Using pnpm
pnpm add react-light-snackbar
```

## Quick Start

```tsx
import React from "react";
import { SnackbarProvider, useSnackbar } from "react-light-snackbar";

const MyComponent = () => {
  const { showSnackbar } = useSnackbar();

  const handleClick = () => {
    showSnackbar({
      message: "Hello, World!",
      variant: "success",
    });
  };

  return <button onClick={handleClick}>Show Snackbar</button>;
};

const App = () => (
  <SnackbarProvider>
    <MyComponent />
  </SnackbarProvider>
);
```

## Basic Usage

### 1. Wrap your app with SnackbarProvider

```tsx
import { SnackbarProvider } from "react-light-snackbar";

function App() {
  return <SnackbarProvider>{/* Your app components */}</SnackbarProvider>;
}
```

### 2. Use the useSnackbar hook

```tsx
import { useSnackbar } from "react-light-snackbar";

function MyComponent() {
  const { showSnackbar, hideSnackbar, hideAllSnackbars } = useSnackbar();

  const showSuccess = () => {
    showSnackbar({
      message: "Operation completed successfully!",
      variant: "success",
    });
  };

  const showError = () => {
    showSnackbar({
      message: "Something went wrong!",
      variant: "error",
      duration: 5000,
    });
  };

  return (
    <div>
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>
    </div>
  );
}
```

## API Reference

### SnackbarProvider Props

| Prop              | Type               | Default           | Description                                        |
| ----------------- | ------------------ | ----------------- | -------------------------------------------------- |
| `children`        | `ReactNode`        | -                 | Your app components                                |
| `maxSnackbars`    | `number`           | `3`               | Maximum number of snackbars to show simultaneously |
| `defaultPosition` | `SnackbarPosition` | `'bottom-center'` | Default position for snackbars                     |
| `defaultDuration` | `number`           | `4000`            | Default duration in milliseconds                   |
| `defaultVariant`  | `SnackbarVariant`  | `'default'`       | Default variant for snackbars                      |

### useSnackbar Hook

Returns an object with the following methods:

#### `showSnackbar(options: SnackbarOptions): string`

Shows a snackbar and returns its ID.

#### `hideSnackbar(id: string): void`

Hides a specific snackbar by ID.

#### `hideAllSnackbars(): void`

Hides all currently visible snackbars.

### SnackbarOptions

| Option      | Type               | Default          | Description                           |
| ----------- | ------------------ | ---------------- | ------------------------------------- |
| `id`        | `string`           | Auto-generated   | Unique identifier for the snackbar    |
| `message`   | `string`           | -                | **Required** - The message to display |
| `variant`   | `SnackbarVariant`  | `'default'`      | Visual style variant                  |
| `position`  | `SnackbarPosition` | Provider default | Position on screen                    |
| `duration`  | `number`           | Provider default | Auto-hide duration (ms)               |
| `autoHide`  | `boolean`          | `true`           | Whether to auto-hide                  |
| `onClose`   | `() => void`       | -                | Callback when snackbar closes         |
| `action`    | `ReactNode`        | -                | Custom action button/component        |
| `className` | `string`           | -                | Additional CSS class                  |
| `style`     | `CSSProperties`    | -                | Additional inline styles              |

### Types

#### SnackbarPosition

```tsx
type SnackbarPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
```

#### SnackbarVariant

```tsx
type SnackbarVariant = "default" | "success" | "error" | "warning" | "info";
```

## Examples

### Basic Variants

```tsx
const { showSnackbar } = useSnackbar();

// Success message
showSnackbar({
  message: "Data saved successfully!",
  variant: "success",
});

// Error message with longer duration
showSnackbar({
  message: "Failed to save data. Please try again.",
  variant: "error",
  duration: 8000,
});

// Warning message
showSnackbar({
  message: "Your session will expire soon.",
  variant: "warning",
});
```

### Custom Positioning

```tsx
// Top-right notification
showSnackbar({
  message: "New message received",
  position: "top-right",
  variant: "info",
});

// Bottom-left notification
showSnackbar({
  message: "File uploaded",
  position: "bottom-left",
  variant: "success",
});
```

### With Action Buttons

```tsx
showSnackbar({
  message: "Item deleted from cart",
  variant: "warning",
  action: <button onClick={handleUndo}>UNDO</button>,
  duration: 6000,
});
```

### Custom Styling

```tsx
showSnackbar({
  message: "Custom styled notification",
  variant: "default",
  className: "my-custom-snackbar",
  style: {
    background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
});
```

### Persistent Snackbars

```tsx
showSnackbar({
  message: "This will not auto-hide. Click close to dismiss.",
  variant: "info",
  autoHide: false,
  duration: 0,
});
```

### Multiple Snackbars

```tsx
// Show multiple snackbars in different positions
showSnackbar({
  message: "Top notification",
  position: "top-center",
  variant: "info",
});

setTimeout(() => {
  showSnackbar({
    message: "Bottom notification",
    position: "bottom-center",
    variant: "success",
  });
}, 500);
```

## Customization

### CSS Customization

The component uses CSS classes that you can override:

```css
/* Custom snackbar styles */
.snackbar--custom {
  background: #your-color;
  border-radius: 8px;
}

.snackbar--custom .snackbar__action {
  color: #your-action-color;
}

.snackbar--custom .snackbar__close {
  background-color: rgba(255, 255, 255, 0.2);
}
```

### Theme Integration

You can integrate with your design system by passing custom styles:

```tsx
const theme = {
  colors: {
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3",
  },
};

showSnackbar({
  message: "Themed notification",
  variant: "success",
  style: {
    background: theme.colors.success,
  },
});
```

## Advanced Usage

### Custom Provider Configuration

```tsx
<SnackbarProvider
  maxSnackbars={5}
  defaultPosition="top-right"
  defaultDuration={3000}
  defaultVariant="info"
>
  <App />
</SnackbarProvider>
```

### Programmatic Control

```tsx
const { showSnackbar, hideSnackbar, hideAllSnackbars } = useSnackbar();

// Show and store ID
const snackbarId = showSnackbar({
  message: "Processing...",
  variant: "info",
  autoHide: false,
});

// Hide specific snackbar later
setTimeout(() => {
  hideSnackbar(snackbarId);
}, 5000);

// Or hide all at once
hideAllSnackbars();
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### GitHub Workflows

This project uses GitHub Actions for continuous integration, testing, and deployment. The following workflows are configured:

- **CI**: Runs on every push and PR to main/develop branches
- **Release**: Automatically publishes to npm when version tags are pushed
- **Security**: Weekly security audits and vulnerability scanning
- **CodeQL**: Advanced security analysis using GitHub's CodeQL engine
- **Dependency Review**: Reviews dependency changes for security issues
- **Test**: Runs tests and provides coverage reports (when tests are added)

### Setup for Contributors

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Run development server**: `npm run dev`
4. **Build project**: `npm run build`
5. **Run linting**: `npm run lint`
6. **Type checking**: `npm run type-check`

### Required Secrets (for maintainers)

To use all workflows, configure these secrets in the repository:

- **NPM_TOKEN**: npm authentication token for publishing
- **SNYK_TOKEN**: Snyk API token for enhanced security scanning (optional)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Before submitting a PR:

1. Ensure all CI checks pass
2. Follow the existing code style
3. Add tests for new functionality (when applicable)
4. Update documentation if needed

## License

MIT © [Luke Grech](https://github.com/lukegrech)
