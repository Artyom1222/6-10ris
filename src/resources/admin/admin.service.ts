import jsonwebtoken from 'jsonwebtoken';
import { IAdmin, IAdminDTO, IAdminLoginDTO, ILoginResponse, ITokenPayload } from '../../interfaces/admin.interface';
import * as adminRepository from './admin.repository';
import { JWT_SECRET_KEY } from '../../common/config';

export const getAllAdmins = async (): Promise<IAdmin[]> => adminRepository.getAll();

export const getAdminById = async (id: string): Promise<IAdmin | null> => adminRepository.getById(id);

export const getAdminByLogin = async (login: string): Promise<IAdmin | null> => adminRepository.getByLogin(login);

export const createAdmin = async (adminData: IAdminDTO): Promise<IAdmin> => {
  const existingAdmin = await adminRepository.getByLogin(adminData.login);
  if (existingAdmin) {
    throw new Error('Admin with this login already exists');
  }
  return adminRepository.create(adminData);
};

export const updateAdmin = async (id: string, adminData: Partial<IAdminDTO>): Promise<IAdmin | null> => {
  return adminRepository.update(id, adminData);
};

export const deleteAdmin = async (id: string): Promise<boolean> => {
  return adminRepository.deleteById(id);
};

export const login = async (loginData: IAdminLoginDTO): Promise<ILoginResponse | null> => {
  const admin = await adminRepository.getByLogin(loginData.login);
  if (!admin) return null;

  if (!admin.isActive) return null;

  const isPasswordValid = await adminRepository.comparePassword(
    loginData.password,
    admin.password
  );

  if (!isPasswordValid) return null;

  const payload: ITokenPayload = {
    id: admin.id,
    login: admin.login
  };

  const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY, { expiresIn: '24h' });

  return { token };
};
