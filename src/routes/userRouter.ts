import { Router } from "express"; 
import { getAll, getByEmail, getById, getByName, getByUsername, create, update, userDelete } from "../controllers/userController";

const router = Router();

router.get('/v1/getAll', getAll);

router.get('/v1/getById/:id', getById);

router.get('/v1/getByUsername/:username', getByUsername);

router.get('/v1/getByName/:name', getByName);

router.get('/v1/getByEmail/:email', getByEmail);

router.post('/v1/create', create);

router.put('/v1/update/:id', update);

router.delete('/v1/delete/:id', userDelete);

export default router;