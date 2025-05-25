import { body, param, ValidationChain } from 'express-validator';

export const createValidator: ValidationChain[] = [
  body('login').notEmpty().withMessage('Login is required'),
  body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('isActive').optional().isBoolean()
];

export const updateValidator: ValidationChain[] = [
  param('adminId').isString().notEmpty(),
  body('login').optional(),
  body('password').optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('isActive').optional().isBoolean()
];

export const loginValidator: ValidationChain[] = [
  body('login').notEmpty().withMessage('Login is required'),
  body('password').notEmpty().withMessage('Password is required')
];
