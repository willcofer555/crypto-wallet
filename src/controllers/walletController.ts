import { Request, Response } from 'express';
import walletService from '../services/walletService';
import { CryptoCurrency } from '../types/wallet.types';

interface AuthRequest extends Request {
  user?: any;
}

export const createWallet = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const wallet = await walletService.createWallet(userId);
    res.status(201).json({ success: true, wallet });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getWallet = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const wallet = await walletService.getWalletByUserId(userId);

    if (!wallet) {
      return res.status(404).json({ success: false, error: 'Wallet not found' });
    }

    res.status(200).json({ success: true, wallet });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addAddress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { currency, address } = req.body;

    if (!currency || !address) {
      return res.status(400).json({ success: false, error: 'Currency and address are required' });
    }

    if (!Object.values(CryptoCurrency).includes(currency)) {
      return res.status(400).json({ success: false, error: 'Invalid currency' });
    }

    const wallet = await walletService.addAddress(userId, currency, address);
    res.status(200).json({ success: true, wallet });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getBalances = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const balances = await walletService.getAllBalances(userId);
    res.status(200).json({ success: true, balances });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getTransactionHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const transactions = await walletService.getTransactionHistory(userId, limit);
    res.status(200).json({ success: true, transactions });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
