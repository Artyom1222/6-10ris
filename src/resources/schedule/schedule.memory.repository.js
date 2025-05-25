import { Schedule } from './schedule.model.js';

const schedules = [];

export const getAll = async () => [...schedules];

export const getById = async (id) => schedules.find(s => s.id === id);

export const getByTourId = async (tourId) => schedules.filter(s => s.tourId === tourId);

export const create = async (scheduleData) => {
  const newSchedule = new Schedule(scheduleData);
  schedules.push(newSchedule);
  return newSchedule;
};

export const update = async (id, scheduleData) => {
  const schedule = schedules.find(s => s.id === id);
  if (!schedule) return null;
  schedule.update(scheduleData);
  return schedule;
};

export const deleteById = async (id) => {
  const index = schedules.findIndex(s => s.id === id);
  if (index === -1) return false;
  schedules.splice(index, 1);
  return true;
};

export const deleteByTourId = async (tourId) => {
  const initialLength = schedules.length;
  const schedulesToDelete = schedules.filter(s => s.tourId === tourId);
  const idsToDelete = schedulesToDelete.map(s => s.id);

  for (let i = schedules.length - 1; i >= 0; i -= 1) {
    if (schedules[i].tourId === tourId) {
      schedules.splice(i, 1);
    }
  }
  
  return {
    success: initialLength > schedules.length,
    deletedIds: idsToDelete
  };
};