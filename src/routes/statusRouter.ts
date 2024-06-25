import { Router } from "express";
import { getAll, getById, create, update } from "../controllers/statusController";

const router = Router();

router.get('/v1/getAll', getAll);

router.get('/v1/getById/:id', getById);

router.post('/v1/create', create);

router.put('/v1/update/:id', update);

export default router;