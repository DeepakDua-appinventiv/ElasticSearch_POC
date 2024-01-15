import { productServiceClass } from "../services/product.Service";
import { Request, Response } from "express";
import { RESPONSE_MESSAGES, RESPONSE_STATUS, SUCCESS_MESSAGES } from "../constants";

export class productClass {
static async indexProduct(req: Request, res: Response) {
  try {
    const { body } = req;
    const response = await productServiceClass.indexProduct(body);
    res.status(RESPONSE_STATUS.success).json({ message: SUCCESS_MESSAGES.INDEX_SUCCESS, data: response });
    res.json(response);
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
};

static async searchProducts(req: Request, res: Response) {
  try {
    const { q } = req.query;
    const response = await productServiceClass.searchProducts(q);
    res.status(RESPONSE_STATUS.success).json({ message: SUCCESS_MESSAGES.SEARCH_SUCCESS, data: response });
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
};

static async getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await productServiceClass.getProductById(id);
    res.json(result);
  } catch (error) {
    res.status(RESPONSE_STATUS.internalServerError).json({ error: error.message });
  }
}

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