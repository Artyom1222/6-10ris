import { DeleteResult, Repository } from 'typeorm';
import { AppDataSource } from '../../common/database/data-source';
import { Schedule } from './schedule.entity';
import { IScheduleDTO, IScheduleDeletionResult } from '../../interfaces/schedule.interface';

export const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);

export const getAll = async (): Promise<Schedule[]> => scheduleRepository.find();

export const getById = async (id: string): Promise<Schedule | null> =>
  scheduleRepository.findOneBy({ id });

export const getByTourId = async (tourId: string): Promise<Schedule[]> =>
  scheduleRepository.findBy({ tourId });

export const create = async (scheduleData: IScheduleDTO): Promise<Schedule> => {
  const schedule = new Schedule();
  schedule.tourId = scheduleData.tourId;
  schedule.isActive = scheduleData.isActive !== undefined ? scheduleData.isActive : true;
  schedule.startDate = scheduleData.startDate;
  schedule.endDate = scheduleData.endDate;

  return scheduleRepository.save(schedule);
};

export const update = async (
  id: string,
  scheduleData: Partial<IScheduleDTO>
): Promise<Schedule | null> => {
  const schedule = await getById(id);
  if (!schedule) return null;

  if (scheduleData.tourId !== undefined) {
    schedule.tourId = scheduleData.tourId;
  }

  if (scheduleData.isActive !== undefined) {
    schedule.isActive = scheduleData.isActive;
  }

  if (scheduleData.startDate !== undefined) {
    schedule.startDate = scheduleData.startDate;
  }

  if (scheduleData.endDate !== undefined) {
    schedule.endDate = scheduleData.endDate;
  }

  return scheduleRepository.save(schedule);
};

export const deleteById = async (id: string): Promise<boolean> => {
  const result: DeleteResult = await scheduleRepository.delete(id);
  return result.affected ? result.affected > 0 : false;
};

export const deleteByTourId = async (tourId: string): Promise<IScheduleDeletionResult> => {
  const schedulesToDelete = await getByTourId(tourId);
  const idsToDelete = schedulesToDelete.map((s) => s.id);

  const result: DeleteResult = await scheduleRepository.delete({ tourId });

  return {
    success: result.affected ? result.affected > 0 : false,
    deletedIds: idsToDelete,
  };
};
