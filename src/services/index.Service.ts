import elasticClient from "../config/elasticsearch.Config";
import { RESPONSE_MESSAGES } from "../constants";
import { ES } from "../entity/elastic.entity";

export class IndexServiceClass {
  static async createIndex(indexName: any, settings: any, mappings: any) {
    try {
      const createIndexResponse = await ES.esInitIndex(indexName, settings, mappings);
      return createIndexResponse;
    } catch (error) {
      console.log(error);
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }

  static async deleteIndex(indexName: string) {
    try {
      const deleteIndexResponse = await ES.esDeleteIndex(indexName);
      return deleteIndexResponse;
    } catch (error) {
      console.log(error);
      throw new Error(RESPONSE_MESSAGES.SERVER_ERROR);
    }
  }
}
