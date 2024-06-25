import { Router } from "express";
import { getAll, getById } from "../controllers/statusController";

const router = Router();

router.get('/v1/getAll', getAll);

router.get('/v1/getById/:id', getById);

export default router;