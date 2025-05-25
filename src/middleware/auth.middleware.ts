import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { ITokenPayload } from '../interfaces/admin.interface';
import * as adminService from '../resources/admin/admin.service';

interface IAuthRequest extends Request {
  user?: ITokenPayload;
}

export const authMiddleware = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Разрешаем доступ к endpoint /login без аутентификации
  if (req.path === '/login' || req.path === '/') {
    next();
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header is missing' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ message: 'Authorization scheme must be Bearer' });
    return;
  }

  const token = parts[1];

  try {
    const payload = jsonwebtoken.verify(token, JWT_SECRET_KEY) as ITokenPayload;
    
    // Проверяем, существует ли пользователь в базе данных
    const admin = await adminService.getAdminById(payload.id);
    
    if (!admin) {
      res.status(403).json({ message: 'Forbidden: User not found' });
      return;
    }

    if (!admin.isActive) {
      res.status(403).json({ message: 'Forbidden: User is not active' });
      return;
    }
    
    // Добавляем данные пользователя в запрос для использования в следующих middleware
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
