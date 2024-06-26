import { Router } from 'express';
import { getAll } from '../controllers/categoryController';

const router = Router();

router.get('/v1/getAll', getAll);

export default router;