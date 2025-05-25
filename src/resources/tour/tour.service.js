import * as tourRepository from './tour.memory.repository.js';
import * as scheduleService from '../schedule/schedule.service.js';

export const getAllTours = async () => tourRepository.getAll();

export const getTourById = async (id) => tourRepository.getById(id);

export const createTour = async (tourData) => {
  if (await tourRepository.getBySlug(tourData.slug)) {
    throw new Error('Slug must be unique');
  }
  return tourRepository.create(tourData);
};

export const updateTour = async (id, tourData) => {
  const allowedFields = ['title', 'description', 'isActive'];
  const filteredData = Object.keys(tourData)
    .filter(key => allowedFields.includes(key))
    .reduce((obj, key) => ({ ...obj, [key]: tourData[key] }), {});

  return tourRepository.update(id, filteredData);
};

export const deleteTour = async (id) => {
  const result = await tourRepository.deleteById(id);
  if (result) await scheduleService.deleteByTourId(id);
  return result;
};
