import Wallet, { WalletDocument } from '../models/Wallet';
import Transaction from '../models/Transaction';
import { CryptoCurrency, TransactionType, TransactionStatus, WalletBalance } from '../types/wallet.types';
import mongoose from 'mongoose';

export class WalletService {
  // Create a new wallet for a user
  async createWallet(userId: string): Promise<WalletDocument> {
    const existingWallet = await Wallet.findOne({ userId });
    if (existingWallet) {
      throw new Error('Wallet already exists for this user');
    }

    const wallet = new Wallet({
      userId,
      addresses: {},
      balances: [],
      isActive: true,
    });

    return await wallet.save();
  }

  // Get wallet by user ID
  async getWalletByUserId(userId: string): Promise<WalletDocument | null> {
    return await Wallet.findOne({ userId }).populate('userId');
  }

  // Add or update a cryptocurrency address
  async addAddress(userId: string, currency: CryptoCurrency, address: string): Promise<WalletDocument> {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    wallet.addresses[currency] = address;
    return await wallet.save();
  }

  // Update wallet balance
  async updateBalance(userId: string, currency: CryptoCurrency, amount: number): Promise<WalletDocument> {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const balanceIndex = wallet.balances.findIndex(b => b.currency === currency);

    if (balanceIndex >= 0) {
      wallet.balances[balanceIndex].amount = amount;
    } else {
      wallet.balances.push({
        currency,
        amount,
        usdValue: 0,
      });
    }

    return await wallet.save();
  }

  // Get wallet balance for specific currency
  async getBalance(userId: string, currency: CryptoCurrency): Promise<number> {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const balance = wallet.balances.find(b => b.currency === currency);
    return balance ? balance.amount : 0;
  }

  // Get all balances
  async getAllBalances(userId: string): Promise<WalletBalance[]> {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    return wallet.balances;
  }

  // Get transaction history
  async getTransactionHistory(userId: string, limit: number = 50): Promise<any[]> {
    return await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }
}

export default new WalletService();
