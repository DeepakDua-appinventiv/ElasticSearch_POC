import express from 'express';  
import bodyParser from "body-parser";
import productRouter from './routes/product.Routes';
import dotenv from 'dotenv';
 
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', productRouter);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})