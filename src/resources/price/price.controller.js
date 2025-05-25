import * as priceService from './price.service.js';

const handleError = (res, error, status = 500) => {
  res.status(status).json({ message: error.message });
};

export const getAllPrices = async (req, res) => {
  try {
    res.json(await priceService.getAllPrices());
  } catch (error) {
    handleError(res, error);
  }
};

export const getPriceById = async (req, res) => {
  try {
    const price = await priceService.getPriceById(req.params.priceId);
    if (price) {
      res.json(price);
    } else {
      res.status(404).json({ message: 'Price not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const createPrice = async (req, res) => {
  try {
    const newPrice = await priceService.createPrice(req.body);
    res.status(201).json(newPrice);
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const updatePrice = async (req, res) => {
  try {
    const updatedPrice = await priceService.updatePrice(req.params.priceId, req.body);
    if (updatedPrice) {
      res.json(updatedPrice);
    } else {
      res.status(404).json({ message: 'Price not found' });
    }
  } catch (error) {
    handleError(res, error, 400);
  }
};

export const deletePrice = async (req, res) => {
  try {
    const success = await priceService.deletePrice(req.params.priceId);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: 'Price not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
};