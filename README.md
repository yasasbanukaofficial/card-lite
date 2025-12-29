# 💳 Card-lite

A lightweight, zero-dependency credit card validation library with support for multiple card types, Luhn validation, CVC checking, expiry validation, and card masking.

## Installation

```bash
npm install card-lite
```

## Usage

### ESM (ES Modules)

```javascript
import {
  detectCardType,
  validateCard,
  validateCVC,
  validateLength,
  validateExpiry,
  maskCardNumber,
  mask,
  format,
  sanitizeCardNumber,
  luhnChecker,
} from "card-lite";
```

### CommonJS

```javascript
const {
  detectCardType,
  validateCard,
  validateCVC,
  validateLength,
  validateExpiry,
  maskCardNumber,
  mask,
  format,
  sanitizeCardNumber,
  luhnChecker,
} = require("card-lite");
```

---

## API Reference

### Core Functions

| Function               | Parameters                                          | Return Type             | Description                                                           |
| ---------------------- | --------------------------------------------------- | ----------------------- | --------------------------------------------------------------------- |
| `detectCardType()`     | `cardNumber: string`                                | `CardType \| undefined` | Detects the card type based on the card number                        |
| `validateCard()`       | `cardNumber: string, options?: ValidateCardOptions` | `ValidateCardResult`    | Comprehensive card validation including Luhn, length, CVC, and expiry |
| `sanitizeCardNumber()` | `input: string`                                     | `string`                | Removes whitespace from card number                                   |
| `luhnChecker()`        | `cardNumber: string`                                | `boolean`               | Validates card number using Luhn algorithm                            |

### Validators

| Function           | Parameters                                        | Return Type | Description                          |
| ------------------ | ------------------------------------------------- | ----------- | ------------------------------------ |
| `validateCVC()`    | `cvc: string, cardType?: CardType`                | `boolean`   | Validates CVC/CVV based on card type |
| `validateLength()` | `cardNumber: string, cardType?: CardType`         | `boolean`   | Validates card number length         |
| `validateExpiry()` | `month: number \| string, year: number \| string` | `boolean`   | Validates expiry date                |

### Utilities

| Function           | Parameters                                                | Return Type | Description                                    |
| ------------------ | --------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `mask()`           | `cardNumber: number \| string, visibleDigits: number = 4` | `string`    | Masks card number with asterisks               |
| `maskCardNumber()` | `cardNumber: number \| string, visibleDigits?: number`    | `string`    | Masks and formats card number                  |
| `format()`         | `cardNumber: string \| number`                            | `string`    | Formats card number with spaces every 4 digits |

---

## Detailed Examples

### 1. Detect Card Type

**ESM:**

```javascript
import { detectCardType } from "card-lite";

const visa = detectCardType("4532015112830366");
console.log(visa);

const amex = detectCardType("371449635398431");
console.log(amex);

const unknown = detectCardType("0000000000000000");
console.log(unknown);
```

**CommonJS:**

```javascript
const { detectCardType } = require("card-lite");

const visa = detectCardType("4532015112830366");
console.log(visa);
```

**Output (Success - Visa):**

```javascript
{
  id: 'visa',
  name: 'Visa',
  patterns: [4],
  gaps: [4, 8, 12],
  lengths: [13, 16, 19],
  code: { size: 3, name: 'CVV' }
}
```

**Output (Success - Amex):**

```javascript
{
  id: 'american-express',
  name: 'American Express',
  patterns: [34, 37],
  gaps: [4, 10],
  lengths: [15],
  code: { size: 4, name: 'CID' }
}
```

**Output (Unknown Card):**

```javascript
undefined;
```

---

### 2. Validate Card (Comprehensive)

**ESM:**

```javascript
import { validateCard } from "card-lite";

const result = validateCard("4532015112830366", {
  cvc: "123",
  expiryMonth: 12,
  expiryYear: 2025,
});
console.log(result);
```

**CommonJS:**

```javascript
const { validateCard } = require("card-lite");

const result = validateCard("371449635398431", { cvc: "1234" });
console.log(result);
```

**Output (Valid Card - Amex):**

```javascript
{
  isValid: true,
  cardType: {
    id: 'american-express',
    name: 'American Express',
    patterns: [34, 37],
    gaps: [4, 10],
    lengths: [15],
    code: { size: 4, name: 'CID' }
  },
  numberValid: true,
  lengthValid: true,
  cvcValid: true,
  expiryValid: undefined,
  maskedNumber: '***********8431',
  formattedNumber: '3714 4963 5398 431',
  displayNumber: '**** ****** 8431',
  reason: undefined
}
```

**Output (Invalid Card - Bad Luhn):**

```javascript
{
  isValid: false,
  cardType: {
    id: 'visa',
    name: 'Visa',
    patterns: [4],
    gaps: [4, 8, 12],
    lengths: [13, 16, 19],
    code: { size: 3, name: 'CVV' }
  },
  numberValid: false,
  lengthValid: true,
  cvcValid: undefined,
  expiryValid: undefined,
  maskedNumber: '*********0000',
  formattedNumber: '4532 0151 1283 0000',
  displayNumber: '**** **** **** 0000',
  reason: 'invalid Luhn'
}
```

**Output (Invalid Card - Unknown Type):**

```javascript
{
  isValid: false,
  cardType: 'unknown',
  numberValid: true,
  lengthValid: false,
  cvcValid: false,
  expiryValid: undefined,
  maskedNumber: '***************',
  formattedNumber: '0000 0000 0000 0000',
  displayNumber: '**** **** **** 0000',
  reason: 'unknown card type'
}
```

**Output (Invalid CVC):**

```javascript
{
  isValid: false,
  cardType: {
    id: 'american-express',
    name: 'American Express',
    patterns: [34, 37],
    gaps: [4, 10],
    lengths: [15],
    code: { size: 4, name: 'CID' }
  },
  numberValid: true,
  lengthValid: true,
  cvcValid: false,
  expiryValid: undefined,
  maskedNumber: '***********8431',
  formattedNumber: '3714 4963 5398 431',
  displayNumber: '**** ****** 8431',
  reason: 'invalid CVC'
}
```

---

### 3. Validate CVC

**ESM:**

```javascript
import { validateCVC, detectCardType } from "card-lite";

const cardType = detectCardType("371449635398431");

const validCVC = validateCVC("1234", cardType);
console.log(validCVC);

const invalidCVC = validateCVC("123", cardType);
console.log(invalidCVC);

const invalidFormat = validateCVC("12a4", cardType);
console.log(invalidFormat);
```

**CommonJS:**

```javascript
const { validateCVC, detectCardType } = require("card-lite");

const cardType = detectCardType("4532015112830366");
const isValid = validateCVC("123", cardType);
console.log(isValid);
```

**Output (Valid - Amex requires 4 digits):**

```javascript
true;
```

**Output (Invalid - Amex requires 4 digits, got 3):**

```javascript
false;
```

**Output (Invalid - Non-numeric characters):**

```javascript
false;
```

---

### 4. Validate Length

**ESM:**

```javascript
import { validateLength, detectCardType } from "card-lite";

const cardType = detectCardType("4532015112830366");

const valid = validateLength("4532015112830366", cardType);
console.log(valid);

const invalid = validateLength("453201511283", cardType);
console.log(invalid);
```

**CommonJS:**

```javascript
const { validateLength, detectCardType } = require("card-lite");

const cardType = detectCardType("371449635398431");
const isValid = validateLength("371449635398431", cardType);
console.log(isValid);
```

**Output (Valid - 16 digits for Visa):**

```javascript
true;
```

**Output (Invalid - 12 digits for Visa):**

```javascript
false;
```

**Output (Valid - 15 digits for Amex):**

```javascript
true;
```

---

### 5. Validate Expiry

**ESM:**

```javascript
import { validateExpiry } from "card-lite";

const valid = validateExpiry(12, 2025);
console.log(valid);

const invalid = validateExpiry(13, 2025);
console.log(invalid);

const expired = validateExpiry(12, 2020);
console.log(expired);

const stringInputs = validateExpiry("12", "2025");
console.log(stringInputs);
```

**CommonJS:**

```javascript
const { validateExpiry } = require("card-lite");

const isValid = validateExpiry(3, 2026);
console.log(isValid);
```

**Output (Valid - Future date):**

```javascript
true;
```

**Output (Invalid - Month > 12):**

```javascript
false;
```

**Output (Invalid - Expired):**

```javascript
false;
```

**Output (Valid - String conversion):**

```javascript
true;
```

---

### 6. Mask Card Number

**ESM:**

```javascript
import { maskCardNumber } from "card-lite";

const masked4 = maskCardNumber("4532015112830366");
console.log(masked4);

const masked6 = maskCardNumber("4532015112830366", 6);
console.log(masked6);

const masked10 = maskCardNumber("371449635398431", 10);
console.log(masked10);
```

**CommonJS:**

```javascript
const { maskCardNumber } = require("card-lite");

const masked = maskCardNumber("4532015112830366", 4);
console.log(masked);
```

**Output (Default - Last 4 digits visible):**

```javascript
"**** **** **** 0366";
```

**Output (Last 6 digits visible):**

```javascript
"**** *112 830 366";
```

**Output (Last 10 digits visible):**

```javascript
"**** *963 5398 431";
```

---

### 7. Mask (Raw)

**ESM:**

```javascript
import { mask } from "card-lite";

const masked4 = mask("4532015112830366");
console.log(masked4);

const masked6 = mask("4532015112830366", 6);
console.log(masked6);

const masked12 = mask("4532015112830366", 12);
console.log(masked12);
```

**CommonJS:**

```javascript
const { mask } = require("card-lite");

const result = mask("4532015112830366", 4);
console.log(result);
```

**Output (Default - Last 4 digits):**

```javascript
"************0366";
```

**Output (Last 6 digits):**

```javascript
"**********0366";
```

**Output (Last 12 digits):**

```javascript
"****12830366";
```

---

### 8. Format Card Number

**ESM:**

```javascript
import { format } from "card-lite";

const formatted = format("4532015112830366");
console.log(formatted);

const amexFormatted = format("371449635398431");
console.log(amexFormatted);

const shortFormatted = format("4532");
console.log(shortFormatted);
```

**CommonJS:**

```javascript
const { format } = require("card-lite");

const result = format("4532015112830366");
console.log(result);
```

**Output (Visa - Formatted every 4 digits):**

```javascript
"4532 0151 1283 0366";
```

**Output (Amex - Formatted every 4 digits):**

```javascript
"3714 4963 5398 431";
```

**Output (Too short to format):**

```javascript
"4532";
```

---

### 9. Sanitize Card Number

**ESM:**

```javascript
import { sanitizeCardNumber } from "card-lite";

const cleaned1 = sanitizeCardNumber("4532 0151 1283 0366");
console.log(cleaned1);

const cleaned2 = sanitizeCardNumber("3714-4963-5398-431");
console.log(cleaned2);

const cleaned3 = sanitizeCardNumber("4532015112830366");
console.log(cleaned3);
```

**CommonJS:**

```javascript
const { sanitizeCardNumber } = require("card-lite");

const result = sanitizeCardNumber("4532 0151 1283 0366");
console.log(result);
```

**Output (Spaces removed):**

```javascript
"4532015112830366";
```

**Output (Spaces removed):**

```javascript
"371449635398431";
```

**Output (No change needed):**

```javascript
"4532015112830366";
```

---

### 10. Luhn Checker

**ESM:**

```javascript
import { luhnChecker } from "card-lite";

const valid = luhnChecker("4532015112830366");
console.log(valid);

const invalid = luhnChecker("4532015112830000");
console.log(invalid);

const validAmex = luhnChecker("371449635398431");
console.log(validAmex);
```

**CommonJS:**

```javascript
const { luhnChecker } = require("card-lite");

const isValid = luhnChecker("4532015112830366");
console.log(isValid);
```

**Output (Valid Luhn - Visa):**

```javascript
true;
```

**Output (Invalid Luhn):**

```javascript
false;
```

**Output (Valid Luhn - Amex):**

```javascript
true;
```

---

## Supported Card Types

| Brand            | ID                 | Name             | Patterns          | Lengths    | CVC Size |
| ---------------- | ------------------ | ---------------- | ----------------- | ---------- | -------- |
| Visa             | `visa`             | Visa             | 4                 | 13, 16, 19 | 3        |
| Mastercard       | `mastercard`       | Mastercard       | 51-55, 2221-2720  | 16         | 3        |
| American Express | `american-express` | American Express | 34, 37            | 15         | 4        |
| Discover         | `discover`         | Discover         | 6011, 644-649, 65 | 16, 19     | 3        |
| Diners Club      | `diners-club`      | Diners Club      | -                 | -          | 3        |
| JCB              | `jcb`              | JCB              | -                 | -          | 3        |
| Maestro          | `maestro`          | Maestro          | -                 | -          | 3        |
| Elo              | `elo`              | Elo              | -                 | -          | 3        |
| Hiper            | `hiper`            | Hiper            | -                 | -          | 3        |
| Hipercard        | `hipercard`        | Hipercard        | -                 | -          | 3        |
| UnionPay         | `unionpay`         | UnionPay         | -                 | -          | 3        |
| Mir              | `mir`              | Mir              | -                 | -          | 3        |
| Verve            | `verve`            | Verve            | -                 | -          | 3        |

---

## Complete Validation Example

**ESM:**

```javascript
import { detectCardType, validateCard, sanitizeCardNumber } from "card-lite";

function processPayment(cardInput) {
  const sanitized = sanitizeCardNumber(cardInput);
  const cardType = detectCardType(sanitized);

  if (!cardType) {
    console.error("Card type not recognized");
    return null;
  }

  const result = validateCard(sanitized, {
    cvc: "1234",
    expiryMonth: 12,
    expiryYear: 2025,
  });

  if (result.isValid) {
    console.log(`Valid ${cardType.name} card`);
    console.log(`Masked: ${result.maskedNumber}`);
    return result;
  } else {
    console.error(`Validation failed: ${result.reason}`);
    return null;
  }
}

processPayment("3714 4963 5398 431");
```

**CommonJS:**

```javascript
const {
  detectCardType,
  validateCard,
  sanitizeCardNumber,
} = require("card-lite");

function processPayment(cardInput) {
  const sanitized = sanitizeCardNumber(cardInput);
  const cardType = detectCardType(sanitized);

  if (!cardType) {
    console.error("Card type not recognized");
    return null;
  }

  const result = validateCard(sanitized, {
    cvc: "1234",
    expiryMonth: 12,
    expiryYear: 2025,
  });

  if (result.isValid) {
    console.log(`Valid ${cardType.name} card`);
    console.log(`Masked: ${result.maskedNumber}`);
    return result;
  } else {
    console.error(`Validation failed: ${result.reason}`);
    return null;
  }
}

processPayment("371449635398431");
```

**Output (Success):**

```
Valid American Express card
Masked: ***********8431
```

**Output (Failed - Bad CVC):**

```
Validation failed: invalid CVC
```

---

## Types

### CardType

```typescript
interface CardType {
  id: string;
  name: string;
  patterns: (number | [number, number])[];
  gaps: number[];
  lengths: number[];
  code: {
    size: 3 | 4;
    name: string;
  };
}
```

### ValidateCardOptions

```typescript
interface ValidateCardOptions {
  cvc?: string;
  expiryMonth?: number;
  expiryYear?: number;
  allowedBrands?: string[];
}
```

### ValidateCardResult

```typescript
interface ValidateCardResult {
  isValid: boolean;
  cardType: CardType | "unknown";
  numberValid: boolean;
  lengthValid?: boolean;
  cvcValid?: boolean;
  expiryValid?: boolean;
  maskedNumber: string;
  formattedNumber: string;
  displayNumber: string;
  reason?: string;
}
```

---

## Error Handling

All functions are safe and return predictable values:

- `detectCardType()` returns `undefined` if no card type matches
- Validators return `boolean` (no exceptions thrown)
- Utility functions handle invalid inputs gracefully
- `validateCard()` always returns a result object with reason if validation fails

```javascript
try {
  const result = validateCard("invalid-card", { cvc: "123" });

  if (!result.isValid) {
    console.log(`Validation failed: ${result.reason}`);
  }
} catch (error) {
  // This will never happen - no exceptions are thrown
}
```

---

## License

MIT © Yasas Banu

## Repository

https://github.com/yasasbanukaofficial/card-lite

## 🌐 Links & socials

- GitHub: https://github.com/yasasbanukaofficial
- NPM: https://www.npmjs.com/~yasasbanukaofficial
- LinkedIn: https://www.linkedin.com/in/yasasbanukagunasena/

---
