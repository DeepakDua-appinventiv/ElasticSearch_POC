import { productServiceClass } from "../services/product.Service";

export class productClass {
static async indexProduct(req, res) {
  try {
    const { body } = req;
    const response = await productServiceClass.indexProduct(body);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

static async searchProducts(req, res) {
  try {
    const { q } = req.query;
    const response = await productServiceClass.searchProducts(q);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
}