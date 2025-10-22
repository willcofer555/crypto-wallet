export enum CryptoCurrency {
  BITCOIN = 'BTC',
  ETHEREUM = 'ETH',
  USDT = 'USDT',
  USDC = 'USDC',
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
}

export interface WalletBalance {
  currency: CryptoCurrency;
  amount: number;
  usdValue?: number;
}

export interface TransactionDetails {
  txHash?: string;
  fromAddress?: string;
  toAddress?: string;
  amount: number;
  currency: CryptoCurrency;
  fee?: number;
  confirmations?: number;
}
