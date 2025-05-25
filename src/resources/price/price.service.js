import * as priceRepository from './price.memory.repository.js';
import * as scheduleRepository from '../schedule/schedule.memory.repository.js';

export const getAllPrices = async () => priceRepository.getAll();

export const getPriceById = async (id) => priceRepository.getById(id);

export const getPricesByScheduleId = async (scheduleId) => priceRepository.getByScheduleId(scheduleId);

export const createPrice = async (priceData) => {
  const schedule = await scheduleRepository.getById(priceData.scheduleId);
  if (!schedule) {
    throw new Error('Schedule not found');
  }
  
  return priceRepository.create(priceData);
};

export const updatePrice = async (id, priceData) => {
  if (priceData.scheduleId) {
    const schedule = await scheduleRepository.getById(priceData.scheduleId);
    if (!schedule) {
      throw new Error('Schedule not found');
    }
  }
  
  return priceRepository.update(id, priceData);
};

export const deletePrice = async (id) => priceRepository.deleteById(id);

export const deleteByScheduleId = async (scheduleId) => priceRepository.deleteByScheduleId(scheduleId);
