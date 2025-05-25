import express from 'express';
import * as tourController from './tour.controller.js';
import * as validators from './tour.validator.js';

const router = express.Router();

router.get('/', tourController.getAllTours);
router.post('/', validators.createValidator, tourController.createTour);
router.get('/:tourId', tourController.getTourById);
router.get('/:tourId/schedules', tourController.getTourSchedules);
router.put('/:tourId', validators.updateValidator, tourController.updateTour);
router.delete('/:tourId', tourController.deleteTour);

export default router;
