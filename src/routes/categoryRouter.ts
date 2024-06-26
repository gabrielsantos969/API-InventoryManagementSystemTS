import { Router } from 'express';
import { getAll, getById, updateActive } from '../controllers/categoryController';

const router = Router();

router.get('/v1/getAll', getAll);

router.get('/v1/getById/:id', getById);

router.put('/v1/updateActive/:id', updateActive);

export default router;