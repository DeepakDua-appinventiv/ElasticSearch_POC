import express from 'express';
import { productClass } from '../controllers/product.Controller';

const productRouter = express.Router();

/* The code is defining various routes for handling HTTP requests related to products. */
productRouter.post('/create', productClass.createProduct);
productRouter.post('/bulkInsert', productClass.insertBulkProducts);
productRouter.get('/search', productClass.searchProducts);
productRouter.get('/getElasticProduct/:id', productClass.getElasticProduct); 
productRouter.get('/getMongoProduct/:id', productClass.getMongoProduct);  
productRouter.put('/update/:id', productClass.updateProduct);
productRouter.delete('/delete/:id', productClass.deleteProduct);

export default productRouter;