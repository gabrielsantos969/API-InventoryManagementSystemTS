import { Router } from "express";
import { getAll, getById, create } from "../controllers/statusController";

const router = Router();

router.get('/v1/getAll', getAll);

router.get('/v1/getById/:id', getById);

router.post('/v1/create', create);

export default router;