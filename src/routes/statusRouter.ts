import { Router } from "express";
import { getAll, getById, statusCreate, statusUpdate, statusDelete } from "../controllers/statusController";

const router = Router();

router.get('/v1/getAll', getAll);

router.get('/v1/getById/:id', getById);

router.post('/v1/createStatus', statusCreate);

router.put('/v1/updateStatus/:id', statusUpdate);

router.delete('/v1/deleteStatus/:id', statusDelete);

export default router;