import { Request, Response } from 'express';
import * as adminService from './admin.service';
import { IAdminLoginDTO } from '../../interfaces/admin.interface';

const handleError = (res: Response, error: Error, status = 500): void => {
  res.status(status).json({ message: error.message });
};

export const getAllAdmins = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json(await adminService.getAllAdmins());
  } catch (error) {
    handleError(res, error as Error);
  }
};

export const getAdminById = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = await adminService.getAdminById(req.params.adminId);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    handleError(res, error as Error);
  }
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const newAdmin = await adminService.createAdmin(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    handleError(res, error as Error, 400);
  }
};

export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedAdmin = await adminService.updateAdmin(req.params.adminId, req.body);
    if (updatedAdmin) {
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    handleError(res, error as Error, 400);
  }
};

export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await adminService.deleteAdmin(req.params.adminId);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    handleError(res, error as Error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: IAdminLoginDTO = req.body;
    const result = await adminService.login(loginData);
    
    if (result) {
      res.json(result);
    } else {
      res.status(401).json({ message: 'Invalid login credentials' });
    }
  } catch (error) {
    handleError(res, error as Error, 400);
  }
};
