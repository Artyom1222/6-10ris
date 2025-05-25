import * as tourService from './tour.service.js';
import * as scheduleService from '../schedule/schedule.service.js';

const handleError = (res, error, status = 500) => {
  res.status(status).json({ message: error.message });
};

export const getAllTours = async (req, res) => {
  try {
    res.json(await tourService.getAllTours());
  } catch (error) {
    handleError(res, error);
  }
};

export const getTourById = async (req, res) => {
  try {
    const tour = await tourService.getTourById(req.params.tourId);
    if (tour) {
      res.json(tour);
    } else {
      res.status(404).json({ message: 'Tour not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const getTourSchedules = async (req, res) => {
  try {
    const tour = await tourService.getTourById(req.params.tourId);
    if (!tour) {
      res.status(404).json({ message: 'Tour not found' });
      return;
    }
    
    const schedules = await scheduleService.getSchedulesByTourId(req.params.tourId);
    res.json(schedules);
  } catch (error) {
    handleError(res, error);
  }
};

export const createTour = async (req, res) => {
  try {
    const newTour = await tourService.createTour(req.body);
    res.status(201).json(newTour);
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const updateTour = async (req, res) => {
  try {
    const updatedTour = await tourService.updateTour(req.params.tourId, req.body);
    if (updatedTour) {
      res.json(updatedTour);
    } else {
      res.status(404).json({ message: 'Tour not found' });
    }
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const deleteTour = async (req, res) => {
  try {
    const success = await tourService.deleteTour(req.params.tourId);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: 'Tour not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};