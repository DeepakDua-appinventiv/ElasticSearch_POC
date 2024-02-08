import express from 'express';  
import bodyParser from "body-parser";
import productRouter from './routes/product.Routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger/swagger.json';
import dotenv from 'dotenv';
import connectDatabase from './database/db.connection';
import indexRouter from './routes/index.Routes';
 
/* The code is setting up an Express application and configuring it with various middleware and
settings. */
const app = express();
dotenv.config();
const port = process.env.PORT; 

console.log(port);
connectDatabase()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/index', indexRouter);
app.use('/products', productRouter);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})