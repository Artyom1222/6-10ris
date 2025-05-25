import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../../common/database/data-source';
import { Admin } from './admin.entity';
import { IAdminDTO } from '../../interfaces/admin.interface';

export const adminRepository: Repository<Admin> = AppDataSource.getRepository(Admin);

export const getAll = async (): Promise<Admin[]> => adminRepository.find();

export const getById = async (id: string): Promise<Admin | null> => 
  adminRepository.findOneBy({ id });

export const getByLogin = async (login: string): Promise<Admin | null> => 
  adminRepository.findOneBy({ login });

export const create = async (adminData: IAdminDTO): Promise<Admin> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

  const admin = new Admin();
  admin.login = adminData.login;
  admin.password = hashedPassword;
  admin.isActive = adminData.isActive !== undefined ? adminData.isActive : true;

  return adminRepository.save(admin);
};

export const update = async (
  id: string, 
  adminData: Partial<IAdminDTO>
): Promise<Admin | null> => {
  const admin = await getById(id);
  if (!admin) return null;

  if (adminData.login !== undefined) {
    admin.login = adminData.login;
  }

  if (adminData.password !== undefined) {
    const saltRounds = 10;
    admin.password = await bcrypt.hash(adminData.password, saltRounds);
  }

  if (adminData.isActive !== undefined) {
    admin.isActive = adminData.isActive;
  }

  return adminRepository.save(admin);
};

export const deleteById = async (id: string): Promise<boolean> => {
  const result: DeleteResult = await adminRepository.delete(id);
  return result.affected ? result.affected > 0 : false;
};

export const comparePassword = async (
  password: string, 
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
