import * as scheduleRepository from './schedule.memory.repository.js';
import * as priceService from '../price/price.service.js';
import * as tourRepository from '../tour/tour.memory.repository.js';

export const getAllSchedules = async () => scheduleRepository.getAll();

export const getScheduleById = async (id) => scheduleRepository.getById(id);

export const getSchedulesByTourId = async (tourId) => scheduleRepository.getByTourId(tourId);

export const createSchedule = async (scheduleData) => {
  const tour = await tourRepository.getById(scheduleData.tourId);
  if (!tour) {
    throw new Error('Tour not found');
  }
  
  return scheduleRepository.create(scheduleData);
};

export const updateSchedule = async (id, scheduleData) => {
  if (scheduleData.tourId) {
    const tour = await tourRepository.getById(scheduleData.tourId);
    if (!tour) {
      throw new Error('Tour not found');
    }
  }
  
  return scheduleRepository.update(id, scheduleData);
};

export const deleteSchedule = async (id) => {
  const result = await scheduleRepository.deleteById(id);
  if (result) {
    await priceService.deleteByScheduleId(id);
  }
  return result;
};

export const deleteByTourId = async (tourId) => {
  const result = await scheduleRepository.deleteByTourId(tourId);
  
  if (result.success && result.deletedIds.length > 0) {
    const deletePromises = result.deletedIds.map(scheduleId => 
      priceService.deleteByScheduleId(scheduleId)
    );
    await Promise.all(deletePromises);
  }
  
  return result.success;
};