import { Router } from "express";
import { getAll } from "../controllers/statusController";

const router = Router();

router.get('/v1/getAll', getAll);

export default router;