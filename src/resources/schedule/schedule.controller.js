import * as scheduleService from './schedule.service.js';
import * as priceService from '../price/price.service.js';

const handleError = (res, error, status = 500) => {
  res.status(status).json({ message: error.message });
};

export const getAllSchedules = async (req, res) => {
  try {
    res.json(await scheduleService.getAllSchedules());
  } catch (error) {
    handleError(res, error);
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const schedule = await scheduleService.getScheduleById(req.params.scheduleId);
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const getSchedulePrices = async (req, res) => {
  try {
    const schedule = await scheduleService.getScheduleById(req.params.scheduleId);
    if (!schedule) {
      res.status(404).json({ message: 'Schedule not found' });
      return;
    }
    
    const prices = await priceService.getPricesByScheduleId(req.params.scheduleId);
    res.json(prices);
  } catch (error) {
    handleError(res, error);
  }
};

export const createSchedule = async (req, res) => {
  try {
    const newSchedule = await scheduleService.createSchedule(req.body);
    res.status(201).json(newSchedule);
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const updatedSchedule = await scheduleService.updateSchedule(req.params.scheduleId, req.body);
    if (updatedSchedule) {
      res.json(updatedSchedule);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const success = await scheduleService.deleteSchedule(req.params.scheduleId);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};