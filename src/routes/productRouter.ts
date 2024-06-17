import { Router } from "express";
import { getProductId, getProducts } from "../controllers/productController";


const router = Router();

router.get('/v1/getAll', getProducts);

router.get('/v1/getById/:id', getProductId)

export default router;