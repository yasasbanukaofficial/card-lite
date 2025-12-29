### Card Lite

Current Architecture

card-lite/
├── src/
│ ├── index.ts # Public API exports
│ ├── core/
│ │ ├── sanitize.ts # Input cleanup
│ │ ├── luhn.ts # Luhn algorithm
│ │ ├── detect.ts # Card type detection
│ │ ├── validate.ts # Main validator
│ │
│ ├── validators/
│ │ ├── expiry.ts # Expiry date validation
│ │ ├── cvc.ts # CVC validation
│ │ └── length.ts # Length rules
│ │
│ ├── utils/
│ │ ├── mask.ts # Mask card numbers
│ │ ├── format.ts # Formatting helpers
│ │ └── constants.ts # Card metadata
│ │
│ └── types/
│ └── index.ts # Public TypeScript types
│
├── tests/
│ ├── luhn.test.ts
│ ├── validate.test.ts
│ ├── expiry.test.ts
│ └── cvc.test.ts
│
├── dist/ # Compiled output
├── package.json
├── tsconfig.json
├── tsup.config.ts # Build config
├── README.md
├── LICENSE
└── .npmignore
