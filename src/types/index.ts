export enum CardBrandId {
  AMERICAN_EXPRESS = "american-express",
  DINERS_CLUB = "diners-club",
  DISCOVER = "discover",
  ELO = "elo",
  HIPER = "hiper",
  HIPERCARD = "hipercard",
  JCB = "jcb",
  MAESTRO = "maestro",
  MASTERCARD = "mastercard",
  MIR = "mir",
  UNIONPAY = "unionpay",
  VISA = "visa",
  VERVE = "verve",
}

export enum CardBrandName {
  AMERICAN_EXPRESS = "American Express",
  DINERS_CLUB = "Diners Club",
  DISCOVER = "Discover",
  ELO = "Elo",
  HIPER = "Hiper",
  HIPERCARD = "Hipercard",
  JCB = "JCB",
  MAESTRO = "Maestro",
  MASTERCARD = "Mastercard",
  MIR = "Mir",
  UNIONPAY = "UnionPay",
  VISA = "Visa",
  VERVE = "Verve",
}

export enum SecurityCodeLabel {
  CVV = "CVV",
  CVC = "CVC",
  CID = "CID",
  CVN = "CVN",
  CVE = "CVE",
  CVP2 = "CVP2",
}

export type Pattern = number | readonly [number, number];

export interface CardType {
  readonly id: CardBrandId;
  readonly name: CardBrandName;
  readonly patterns: readonly Pattern[];
  readonly gaps: readonly number[];
  readonly lengths: readonly number[];
  readonly code: {
    readonly size: 3 | 4;
    readonly name: SecurityCodeLabel;
  };
  readonly matchStrength?: number;
  readonly exampleNumbers?: readonly string[];
}

export type CardCollection = Readonly<Record<CardBrandId, CardType>>;

export const cardTypes: CardCollection = {
  [CardBrandId.VISA]: {
    id: CardBrandId.VISA,
    name: CardBrandName.VISA,
    patterns: [4],
    gaps: [4, 8, 12],
    lengths: [13, 16, 19],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVV,
    },
  },
  [CardBrandId.MASTERCARD]: {
    id: CardBrandId.MASTERCARD,
    name: CardBrandName.MASTERCARD,
    patterns: [
      [51, 55],
      [2221, 2720],
    ],
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVC,
    },
  },
  [CardBrandId.AMERICAN_EXPRESS]: {
    id: CardBrandId.AMERICAN_EXPRESS,
    name: CardBrandName.AMERICAN_EXPRESS,
    patterns: [34, 37],
    gaps: [4, 10],
    lengths: [15],
    code: {
      size: 4,
      name: SecurityCodeLabel.CID,
    },
  },
  [CardBrandId.DISCOVER]: {
    id: CardBrandId.DISCOVER,
    name: CardBrandName.DISCOVER,
    patterns: [6011, [644, 649], 65],
    gaps: [4, 8, 12],
    lengths: [16, 19],
    code: {
      size: 3,
      name: SecurityCodeLabel.CID,
    },
  },

  [CardBrandId.DINERS_CLUB]: {
    id: CardBrandId.DINERS_CLUB,
    name: CardBrandName.DINERS_CLUB,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVC,
    },
  },
  [CardBrandId.ELO]: {
    id: CardBrandId.ELO,
    name: CardBrandName.ELO,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVC,
    },
  },
  [CardBrandId.HIPER]: {
    id: CardBrandId.HIPER,
    name: CardBrandName.HIPER,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVC,
    },
  },
  [CardBrandId.HIPERCARD]: {
    id: CardBrandId.HIPERCARD,
    name: CardBrandName.HIPERCARD,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVC,
    },
  },
  [CardBrandId.JCB]: {
    id: CardBrandId.JCB,
    name: CardBrandName.JCB,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVC,
    },
  },
  [CardBrandId.MAESTRO]: {
    id: CardBrandId.MAESTRO,
    name: CardBrandName.MAESTRO,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVC,
    },
  },
  [CardBrandId.MIR]: {
    id: CardBrandId.MIR,
    name: CardBrandName.MIR,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVP2,
    },
  },
  [CardBrandId.UNIONPAY]: {
    id: CardBrandId.UNIONPAY,
    name: CardBrandName.UNIONPAY,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVN,
    },
  },
  [CardBrandId.VERVE]: {
    id: CardBrandId.VERVE,
    name: CardBrandName.VERVE,
    patterns: [],
    gaps: [],
    lengths: [],
    code: {
      size: 3,
      name: SecurityCodeLabel.CVV,
    },
  },
};
