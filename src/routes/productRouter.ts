import { Router } from "express";
import { getProductCode, getProductId, getProducts, productCreate, productDelete, productUpdate } from "../controllers/productController";


const router = Router();

router.get('/v1/getAll', getProducts);

router.get('/v1/getById/:id', getProductId);

router.get('/v1/getByCode/:code', getProductCode);

router.post('/v1/createProduct', productCreate);

router.put('/v1/updateProduct/:id', productUpdate);

router.delete('/v1/deleteProduct/:id', productDelete);

export default router;