import express, { Router } from 'express';
import * as adminController from './admin.controller';
import * as validators from './admin.validator';
import { asyncHandler } from '../../common/asyncHandler';
import { validateRequest } from '../../middleware/validateRequest.middleware';

const router: Router = express.Router();

router.get('/', asyncHandler(adminController.getAllAdmins));
router.post('/', validators.createValidator, validateRequest, asyncHandler(adminController.createAdmin));
router.get('/:adminId', asyncHandler(adminController.getAdminById));
router.put('/:adminId', validators.updateValidator, validateRequest, asyncHandler(adminController.updateAdmin));
router.delete('/:adminId', asyncHandler(adminController.deleteAdmin));

export default router;
