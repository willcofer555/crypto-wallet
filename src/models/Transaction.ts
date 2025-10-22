import mongoose, { Document, Schema } from 'mongoose';
import { CryptoCurrency, TransactionType, TransactionStatus } from '../types/wallet.types';

export interface TransactionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  walletId: mongoose.Types.ObjectId;
  type: TransactionType;
  status: TransactionStatus;
  currency: CryptoCurrency;
  amount: number;
  fee: number;
  fromAddress?: string;
  toAddress?: string;
  txHash?: string;
  confirmations: number;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<TransactionDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  walletId: {
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(TransactionType),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    required: true,
    default: TransactionStatus.PENDING,
  },
  currency: {
    type: String,
    enum: Object.values(CryptoCurrency),
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  fee: {
    type: Number,
    default: 0,
    min: 0,
  },
  fromAddress: {
    type: String,
  },
  toAddress: {
    type: String,
  },
  txHash: {
    type: String,
    sparse: true,
  },
  confirmations: {
    type: Number,
    default: 0,
    min: 0,
  },
  description: {
    type: String,
  },
  metadata: {
    type: Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

// Indexes for efficient querying
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ walletId: 1, createdAt: -1 });
transactionSchema.index({ txHash: 1 });
transactionSchema.index({ status: 1 });

const Transaction = mongoose.model<TransactionDocument>('Transaction', transactionSchema);

export default Transaction;
