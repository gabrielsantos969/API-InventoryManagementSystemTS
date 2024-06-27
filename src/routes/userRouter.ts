import { Router } from "express"; 
import { getById } from "../controllers/userController";

const router = Router();

router.get('/v1/getById/:id', getById);

export default router;