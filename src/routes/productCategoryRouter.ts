import { Router } from "express";
import { addCategoryProduct } from "../controllers/productCategoryController";

const router = Router();

router.post('/v1/addCategoryInProduct/:id_product', addCategoryProduct)

export default router;