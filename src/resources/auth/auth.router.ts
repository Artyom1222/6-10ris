import express, { Router } from 'express';
import * as adminController from "../admin/admin.controller";
 import * as validators from "../admin/admin.validator";
import { asyncHandler } from '../../common/asyncHandler';
import { validateRequest } from '../../middleware/validateRequest.middleware';

const router: Router = express.Router();

router.post('/login', validators.loginValidator, validateRequest, asyncHandler(adminController.login));

export default router;
