import e from "express";
import elasticClient from "../config/elasticsearch.Config";

export class productServiceClass {
static async indexProduct (body) {
  try {
    const response = await elasticClient.index({
      index: 'products',
      body,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

static async searchProducts(query) {
  try {
    let searchQuery: any = {
      index: 'products',
    };
    if (query) {
      searchQuery.q = `*${query}*`;
    }
    const resp = await elasticClient.search(searchQuery);

    return {
      products: resp.hits.hits,
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
}