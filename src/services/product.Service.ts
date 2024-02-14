import mongoose from "mongoose";
import elasticClient from "../config/elasticsearch.Config";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../constants";
import { Product } from "../models/product.model";
import { ES } from "../entity/elastic.entity";

export class productServiceClass {
  /**
   * The function creates a new product by indexing it in Elasticsearch and returns the response.
   * @param body - The `body` parameter is an object that represents the data of the product that you
   * want to create. It contains the properties and values that describe the product, such as its name,
   * price, description, etc.
   * @returns The response from the elasticClient.index() method is being returned.
   */
  static async createProduct(body: any) {
    try {
      const response = await ES.esCreateDocument("products", body);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }

  /**
   * The function `insertBulkProducts` inserts multiple products into an Elasticsearch index called
   * "products".
   * @param {any} body - The "body" parameter is of type "any", which means it can accept any data
   * type. In this case, it is likely that the "body" parameter is expected to be an array of objects
   * representing products to be inserted into a database.
   * @returns The response from the ES.esCreateBulkDocument function is being returned.
   */
  static async insertBulkProducts(body: any) {
    try {
      const response = await ES.esCreateBulkDocument("products", body);
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }

  /**
   * The function `searchProducts` searches for products in an Elasticsearch index based on a given
   * query and returns the search results.
   * @param query - The `query` parameter is a string that represents the search query for products. It
   * is used to search for products in the Elasticsearch index. If a query is provided, it will be used
   * to perform a wildcard search on the products index. If no query is provided, all products will be
   * returned.
   * @returns The function `searchProducts` returns an object with a property `products` that contains
   * an array of search results. If there are no search results, an empty array is returned.
   */
  static async searchProducts(query: any, page, limit) {
    try {
      const searchQuery = {
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query: query,
                  fields: ["name^2", "category", "description"],
                  fuzziness: "auto",
                  analyzer: "lowercase_analyzer",
                },
              },
            ],
          },
        },
        aggs: {
          categoryAggregation: {
            terms: {
              field: "category.keyword",
              size: 10,
            },
          },
        },
        from: (page - 1) * limit,
        size: limit,
      };

      const resp = await elasticClient.search(searchQuery);

      if (resp.hits.hits.length < 1) {
        return { products: [] };
      }

      return { products: resp.hits.hits };
    } catch (error) {
      console.error(error);
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }

  /**
   * The function `getElasticProduct` retrieves a product from an Elasticsearch index based on its ID.
   * @param id - The `id` parameter is the unique identifier of the product that you want to retrieve
   * from the Elasticsearch index.
   * @returns an object with a property "product" that contains the response from the
   * elasticClient.get() method.
   */ 
  static async getElasticProduct(id) {
    const query = {
      index: "products",
      id,
    };

    try {
      const resp = await ES.esGetById("products", id);

      if (!resp) {
        throw new Error(RESPONSE_MESSAGES.NOT_FOUND);
      }

      return { product: resp };
    } catch (error) {
      console.error(error);
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }

  static async getMongoProduct(id) {
    try {
      console.log("service called");
      const product = await Product.findById(id);
      console.log("product", product);

      if (!product) {
        throw new Error(RESPONSE_MESSAGES.NOT_FOUND);
      }
      return { product };
    } catch (error) {
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }

  /**
   * The function updates a product in Elasticsearch using the provided ID and update body.
   * @param id - The `id` parameter is the unique identifier of the product that needs to be updated.
   * It is used to specify which document in the Elasticsearch index should be updated.
   * @param updateBody - The `updateBody` parameter is an object that contains the fields and values
   * that you want to update for a product. It represents the updated data that you want to apply to
   * the product.
   * @returns an object with a property "msg" set to the value "Product updated".
   */
  static async updateProduct(id, updateBody) {
    try {
      const updateQuery = {
        index: "products",
        id,
        body: {
          doc: updateBody,
        },
      };

      await elasticClient.update(updateQuery);
      return { msg: "Product updated" };
    } catch (error) {
      console.error(error);
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }

  /**
   * The function deletes a product from the Elasticsearch index and returns a success message.
   * @param id - The `id` parameter is the unique identifier of the product that needs to be deleted
   * from the Elasticsearch index.
   * @returns an object with a property "msg" set to the value "Product deleted".
   */
  static async deleteProduct(id) {
    try {
      await ES.esDelete("products", id);
      return { msg: "Product deleted" };
    } catch (error) {
      console.error(error);
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }
}
