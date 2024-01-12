import express from 'express';
import { productClass } from '../controllers/product.Controller';

const productRouter = express.Router();

productRouter.post('/index', productClass.indexProduct);
productRouter.get('/search', productClass.searchProducts);

export default productRouter;