export const PATHS = {
  c2b: "/ipg/v1x/c2bPayment/singleStage/",
  b2c: "/ipg/v1x/b2cPayment/",
  b2b: "/ipg/v1x/b2bPayment/",
  reversal: "/ipg/v1x/reversal/",
  status: "/ipg/v1x/queryTransactionStatus/",
  customer: "/ipg/v1x/queryCustomerName/",
} as const;

export const PORTS = {
  [PATHS.c2b]: 18352,
  [PATHS.b2c]: 18345,
  [PATHS.b2b]: 18349,
  [PATHS.reversal]: 18354,
  [PATHS.status]: 18353,
  [PATHS.customer]: 19323,
} as const;

export const DEFAULT_PORT = 18352;

export const portForPath = (path: string): number => {
  for (const [prefix, port] of Object.entries(PORTS)) {
    if (path.startsWith(prefix)) return port;
  }
  return DEFAULT_PORT;
};
