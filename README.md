# ColorJS

A TypeScript library for color manipulation and conversion, providing comprehensive color utilities and calculations across various color spaces.

## Features

- Color class with RGB input
- Support for multiple color spaces: HSV, HSL, HSI
- Color utility functions for conversions and calculations
- TypeScript support with full type definitions
- Comprehensive API documentation

## Installation

```bash
npm install colorjs
```

## Usage

```typescript
import { Color, ColorUtil } from 'colorjs';

// Create a color from RGB values
const color = new Color(255, 0, 0); // Red

// Access color properties
console.log(color.HSL); // ['0%', 1, 0.5]
console.log(color.HSV); // ['0%', 1, 1]

// Use color utilities
const util = new ColorUtil();
const hex = util.RGBToHex(255, 0, 0); // '#ff0000'
const rgb = util.HexToRGB('#ff0000'); // [255, 0, 0]
```

## API Documentation

Full API documentation is available in the [docs](./docs/) directory.

## Development

### Prerequisites

- Node.js >= 8.0
- npm or yarn

### Scripts

- `npm run build` - Compile TypeScript
- `npm run lint` - Run linting
- `npm run prettify` - Format code
- `npm run docs` - Generate API documentation
- `npm run ci` - Full CI build

### Building

```bash
npm install
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT