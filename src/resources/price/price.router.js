import express from 'express';
import { body, param } from 'express-validator';
import * as priceController from './price.controller.js';

const router = express.Router();

router.get('/', priceController.getAllPrices);
router.post('/',
  body('scheduleId').notEmpty().withMessage('Schedule ID is required'),
  body('priceValue').isNumeric().withMessage('Price value should be a number'),
  body('priceCurrency').notEmpty().withMessage('Price currency is required'),
  priceController.createPrice
);
router.get('/:priceId', priceController.getPriceById);
router.put('/:priceId',
  param('priceId').isString().notEmpty(),
  body('priceValue').optional().isNumeric(),
  body('priceCurrency').optional().notEmpty(),
  priceController.updatePrice
);
router.delete('/:priceId', priceController.deletePrice);

export default router;
