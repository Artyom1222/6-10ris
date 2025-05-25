import { Price } from './price.model.js';

const prices = [];

export const getAll = async () => [...prices];

export const getById = async (id) => prices.find(p => p.id === id);

export const getByScheduleId = async (scheduleId) => prices.filter(p => p.scheduleId === scheduleId);

export const create = async (priceData) => {
  const newPrice = new Price(priceData);
  prices.push(newPrice);
  return newPrice;
};

export const update = async (id, priceData) => {
  const price = prices.find(p => p.id === id);
  if (!price) return null;
  price.update(priceData);
  return price;
};

export const deleteById = async (id) => {
  const index = prices.findIndex(p => p.id === id);
  if (index === -1) return false;
  prices.splice(index, 1);
  return true;
};

export const deleteByScheduleId = async (scheduleId) => {
  const initialLength = prices.length;

  for (let i = prices.length - 1; i >= 0; i -= 1) {
    if (prices[i].scheduleId === scheduleId) {
      prices.splice(i, 1);
    }
  }
  
  return initialLength > prices.length;
};