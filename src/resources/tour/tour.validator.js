import { body, param } from 'express-validator';

export const createValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional(),
  body('isActive').optional().isBoolean()
];

export const updateValidator = [
  param('tourId').isString().notEmpty(),
  body('title').optional(),
  body('description').optional(),
  body('isActive').optional().isBoolean()
];
