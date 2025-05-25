import express from 'express';
import { body, param } from 'express-validator';
import * as scheduleController from './schedule.controller.js';

const router = express.Router();

router.get('/', scheduleController.getAllSchedules);
router.get('/:scheduleId', scheduleController.getScheduleById);
router.get('/:scheduleId/prices', scheduleController.getSchedulePrices);
router.post('/',
  body('tourId').notEmpty().withMessage('Tour ID is required'),
  body('startDate').isISO8601().withMessage('Start date is required and should be a valid ISO 8601 date'),
  body('endDate').isISO8601().withMessage('End date is required and should be a valid ISO 8601 date'),
  scheduleController.createSchedule
);
router.put('/:scheduleId',
  param('scheduleId').isString().notEmpty(),
  body('tourId').optional().notEmpty(),
  body('startDate').optional().isISO8601(),
  body('endDate').optional().isISO8601(),
  scheduleController.updateSchedule
);
router.delete('/:scheduleId', scheduleController.deleteSchedule);

export default router;
