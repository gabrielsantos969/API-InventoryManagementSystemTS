import { Router } from "express";
import { getProductId, getProducts, productCreate } from "../controllers/productController";


const router = Router();

router.get('/v1/getAll', getProducts);

router.get('/v1/getById/:id', getProductId);

router.post('/v1/createProduct', productCreate);

export default router;