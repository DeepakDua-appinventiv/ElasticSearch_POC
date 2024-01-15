import express from 'express';
import { productClass } from '../controllers/product.Controller';

const productRouter = express.Router();

productRouter.post('/index', productClass.indexProduct);
productRouter.get('/search', productClass.searchProducts);
productRouter.get('/getProduct/:id', productClass.getProductById);
productRouter.put('/update/:id', productClass.updateProduct);
productRouter.delete('/delete/:id', productClass.deleteProduct);

export default productRouter;