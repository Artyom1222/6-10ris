import { DeleteResult, Repository } from 'typeorm';
import { AppDataSource } from '../../common/database/data-source';
import { Tour } from './tour.entity';
import { ITourDTO } from '../../interfaces/tour.interface';

export const tourRepository: Repository<Tour> = AppDataSource.getRepository(Tour);

export const getAll = async (): Promise<Tour[]> => tourRepository.find();

export const getById = async (id: string): Promise<Tour | null> => tourRepository.findOneBy({ id });

export const getBySlug = async (slug: string): Promise<Tour | null> =>
  tourRepository.findOneBy({ slug });

export const create = async (tourData: ITourDTO): Promise<Tour> => {
  const tour = new Tour();
  tour.title = tourData.title;
  tour.slug = Tour.createSlug(tourData.title);
  tour.description = tourData.description || '';
  tour.isActive = tourData.isActive !== undefined ? tourData.isActive : true;

  return tourRepository.save(tour);
};

export const update = async (id: string, tourData: Partial<ITourDTO>): Promise<Tour | null> => {
  const tour = await getById(id);
  if (!tour) return null;

  if (tourData.title !== undefined) {
    tour.title = tourData.title;
    tour.slug = Tour.createSlug(tourData.title);
  }

  if (tourData.description !== undefined) {
    tour.description = tourData.description;
  }

  if (tourData.isActive !== undefined) {
    tour.isActive = tourData.isActive;
  }

  return tourRepository.save(tour);
};

export const deleteById = async (id: string): Promise<boolean> => {
  const result: DeleteResult = await tourRepository.delete(id);
  return result.affected ? result.affected > 0 : false;
};
