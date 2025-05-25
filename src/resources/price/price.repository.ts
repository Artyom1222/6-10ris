import { DeleteResult, Repository } from 'typeorm';
import { AppDataSource } from '../../common/database/data-source';
import { Price } from './price.entity';
import { IPriceDTO } from '../../interfaces/price.interface';

export const priceRepository: Repository<Price> = AppDataSource.getRepository(Price);

export const getAll = async (): Promise<Price[]> => priceRepository.find();

export const getById = async (id: string): Promise<Price | null> =>
  priceRepository.findOneBy({ id });

export const getByScheduleId = async (scheduleId: string): Promise<Price[]> =>
  priceRepository.findBy({ scheduleId });

export const create = async (priceData: IPriceDTO): Promise<Price> => {
  const price = new Price();
  price.scheduleId = priceData.scheduleId;
  price.priceValue = priceData.priceValue;
  price.priceCurrency = priceData.priceCurrency;

  return priceRepository.save(price);
};

export const update = async (id: string, priceData: Partial<IPriceDTO>): Promise<Price | null> => {
  const price = await getById(id);
  if (!price) return null;

  if (priceData.scheduleId !== undefined) {
    price.scheduleId = priceData.scheduleId;
  }

  if (priceData.priceValue !== undefined) {
    price.priceValue = priceData.priceValue;
  }

  if (priceData.priceCurrency !== undefined) {
    price.priceCurrency = priceData.priceCurrency;
  }

  return priceRepository.save(price);
};

export const deleteById = async (id: string): Promise<boolean> => {
  const result: DeleteResult = await priceRepository.delete(id);
  return result.affected ? result.affected > 0 : false;
};

export const deleteByScheduleId = async (scheduleId: string): Promise<boolean> => {
  const result: DeleteResult = await priceRepository.delete({ scheduleId });
  return result.affected ? result.affected > 0 : false;
};
