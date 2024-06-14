import { Router } from "express";
import { getProducts } from "../controllers/productController";


const router = Router();

router.get('/v1/getAll', getProducts);

export default router;