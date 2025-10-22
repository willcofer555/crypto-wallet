import { Router } from 'express';
import { createWallet, getWallet, addAddress, getBalances, getTransactionHistory } from '../controllers/walletController';
import { authMiddleware } from '../controllers/authController';

const router = Router();

// All wallet routes require authentication
router.use(authMiddleware);

// Wallet management
router.post('/create', createWallet);
router.get('/', getWallet);
router.post('/address', addAddress);
router.get('/balances', getBalances);
router.get('/transactions', getTransactionHistory);

export default router;
