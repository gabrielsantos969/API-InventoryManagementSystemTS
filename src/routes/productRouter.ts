import { Router } from "express";
import { getProductCode, getProductId, getProducts, productCreate, productUpdate } from "../controllers/productController";


const router = Router();

router.get('/v1/getAll', getProducts);

router.get('/v1/getById/:id', getProductId);

router.post('/v1/createProduct', productCreate);

router.get('/v1/getByCode/:code', getProductCode);

router.put('/v1/updateProduct/:id', productUpdate);

export default router;