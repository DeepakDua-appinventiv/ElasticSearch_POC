import { productServiceClass } from "../services/product.Service";
import { Request, Response } from "express";
import { RESPONSE_MESSAGES, RESPONSE_STATUS, SUCCESS_MESSAGES } from "../constants";

export class productClass {
/* The `static async createProduct(req: Request, res: Response)` function is a method of the
`productClass` class. It is used to handle the request for creating a new product. */
static async createProduct(req: Request, res: Response) {
  try {
    const { body } = req;
    const response = await productServiceClass.createProduct(body);
    res.status(RESPONSE_STATUS.success).json({ message: SUCCESS_MESSAGES.INDEX_SUCCESS, data: response });
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
};

/**
 * The function inserts multiple products into a database in bulk.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The "res" parameter is the response object that is used to send the response
 * back to the client. It is an instance of the Express Response class.
 */
static async insertBulkProducts(req: Request, res: Response) {
  try {
    const body = req.body;
    const response = await productServiceClass.insertBulkProducts(body.documents);
    res.status(RESPONSE_STATUS.success).json({ message: SUCCESS_MESSAGES.BULK_SUCCESS, data: response });
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
}

/* The `static async searchProducts(req: Request, res: Response)` function is a method of the
`productClass` class. It is used to handle the request for searching products. */
static async searchProducts(req: Request, res: Response) {
  try {
    const { data, page, limit } = req.query;
    const pageNumber = +page || 1;
    const pageSize = +limit || 10;
    const response = await productServiceClass.searchProducts(data, pageNumber, pageSize);
    if(response.products.length>0){
      res.status(RESPONSE_STATUS.success).json({ message: SUCCESS_MESSAGES.SEARCH_SUCCESS, data: response });
    }else{
      res.status(RESPONSE_STATUS.notFound).json({ message: RESPONSE_MESSAGES.NOT_FOUND, data: response });
    }
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
};

/**
 * The function getProductById retrieves a product by its ID and sends the result as a JSON response,
 * handling any errors that occur.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request method, headers, query parameters, and request
 * body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It is an instance of the `Response` class from the Express framework.
 */
static async getElasticProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await productServiceClass.getElasticProduct(id);
    if (!result.product) {
      return res.status(RESPONSE_STATUS.notFound).json({ error: RESPONSE_MESSAGES.NOT_FOUND });
    }
    res.json(result);
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
}

static async getMongoProduct(req: Request, res: Response) {
  try {
    console.log("controller called")
    const { id } = req.params;
    const result = await productServiceClass.getMongoProduct(id);
    if(!result.product) {
      return res.status(RESPONSE_STATUS.notFound).json({ error: RESPONSE_MESSAGES.NOT_FOUND });
    }
    res.json(result);
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
}

/**
 * The function updates a product with the given ID using the updateBody and returns the updated
 * product.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request parameters, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body. In this code snippet, it is used to send a JSON response with a success status
 * code and a
 */
static async updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateBody = req.body;
    const result = await productServiceClass.updateProduct(id, updateBody);
    res.status(RESPONSE_STATUS.success).json({ message: SUCCESS_MESSAGES.UPDATE_SUCCESS, data: result });
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
}

/**
 * The above function is an asynchronous function that handles the deletion of a product by calling a
 * method from a productServiceClass and returns a success message with the deleted product data or an
 * error message if an error occurs.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, request
 * URL, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body. In this code snippet, it is used to send a JSON response with a success status
 * code and a
 */
static async deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await productServiceClass.deleteProduct(id);
    res.status(RESPONSE_STATUS.success).json({ message: SUCCESS_MESSAGES.DELETE_SUUCESS, data: result });
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
}
}