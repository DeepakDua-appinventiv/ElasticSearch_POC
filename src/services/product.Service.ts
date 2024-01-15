import elasticClient from "../config/elasticsearch.Config";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../constants";

export class productServiceClass {
static async indexProduct (body) {
  try {
    const response = await elasticClient.index({
      index: 'products',
      body,
    });
    return response;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.INDEX_ERROR);
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
    throw new Error(ERROR_MESSAGES.SEARCH_ERROR);
  }
};

static async getProductById(id) {
  const query = {
    index: 'products',
    id,
  };

  try {
    const resp = await elasticClient.get(query);
    if (!resp) {
      throw new Error(RESPONSE_MESSAGES.NOT_FOUND);
    }
    return {
      product: resp,
    };
  } catch (err) {
    console.error(err);
    throw new Error(ERROR_MESSAGES.FETCH_ERROR);
  }
}

static async updateProduct(id, updateBody) {
  try {
  const updateQuery = {
    index: 'products',
    id,
    body: {
      doc: updateBody,
      upsert: updateBody,
    },
  };
    await elasticClient.update(updateQuery);
    return { msg: 'Product updated' };
  } catch (err) {
    console.error(err);
    throw new Error(ERROR_MESSAGES.UPDATE_ERROR);
  }
}

static async deleteProduct(id) {
  try {
    const deleteQuery = {
      index: 'products',
      id,
    };

    await elasticClient.delete(deleteQuery);
    return { msg: 'Product deleted' };
  } catch (error) {
    console.log(error);
    throw new Error(ERROR_MESSAGES.DELETE_ERROR);
  }
}
}