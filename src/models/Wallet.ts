import mongoose, { Document, Schema } from 'mongoose';
import { CryptoCurrency, WalletBalance } from '../types/wallet.types';

export interface WalletDocument extends Document {
  userId: mongoose.Types.ObjectId;
  addresses: {
    [key in CryptoCurrency]?: string;
  };
  balances: WalletBalance[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const walletBalanceSchema = new Schema({
  currency: {
    type: String,
    enum: Object.values(CryptoCurrency),
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  usdValue: {
    type: Number,
    default: 0,
  },
}, { _id: false });

const walletSchema = new Schema<WalletDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  addresses: {
    [CryptoCurrency.BITCOIN]: {
      type: String,
      sparse: true,
    },
    [CryptoCurrency.ETHEREUM]: {
      type: String,
      sparse: true,
    },
    [CryptoCurrency.USDT]: {
      type: String,
      sparse: true,
    },
    [CryptoCurrency.USDC]: {
      type: String,
      sparse: true,
    },
  },
  balances: {
    type: [walletBalanceSchema],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Index for faster lookups
walletSchema.index({ userId: 1 });

const Wallet = mongoose.model<WalletDocument>('Wallet', walletSchema);

export default Wallet;
