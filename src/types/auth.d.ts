import { ITokenPayload } from '../interfaces/admin.interface';

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload;
    }
  }
}
