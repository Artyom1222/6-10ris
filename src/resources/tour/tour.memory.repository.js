import { Tour } from './tour.model.js';

const tours = [];

export const getAll = async () => [...tours];

export const getById = async (id) => tours.find(t => t.id === id);

export const getBySlug = async (slug) => tours.find(t => t.slug === slug);

export const create = async (tourData) => {
  const newTour = new Tour(tourData);
  tours.push(newTour);
  return newTour;
};

export const update = async (id, tourData) => {
  const index = tours.findIndex(t => t.id === id);
  if (index === -1) return null;

  tours[index] = {
    ...tours[index],
    ...tourData,
    slug: tours[index].title !== tourData.title && tourData.title
      ? Tour.createSlug(tourData.title) : tours[index].slug,
    updatedAt: new Date()
  };

  return tours[index];
};

export const deleteById = async (id) => {
  const index = tours.findIndex(t => t.id === id);
  if (index === -1) return false;
  tours.splice(index, 1);
  return true;
};