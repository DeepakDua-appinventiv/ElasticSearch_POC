import { Request, Response } from "express";
import {
  RESPONSE_MESSAGES,
  RESPONSE_STATUS,
  SUCCESS_MESSAGES,
} from "../constants";
import elasticClient from "../config/elasticsearch.Config";
import { IndexServiceClass } from "../services/index.Service";

export class indexClass {
  static async createIndex(req: Request, res: Response) {
    try {
      const { indexName, settings, mappings } = req.body;
      const createIndexResponse = await IndexServiceClass.createIndex(
        indexName,
        settings,
        mappings
      );
      res
        .status(RESPONSE_STATUS.success)
        .json({
          message: "Index created successfully",
          data: createIndexResponse,
        });
    } catch (error) {
      res
        .status(RESPONSE_STATUS.internalServerError)
        .json({ error: error.message });
    }
  }

  static async deleteIndex(req: Request, res: Response) {
    try {
      const indexName  = req.query.indexName as string;
      console.log(indexName);
      const deleteIndexResponse = await IndexServiceClass.deleteIndex(
        indexName
      );
      res.json({
        message: "Index deleted successfully",
        data: deleteIndexResponse,
      });
    } catch (error) {
      res
        .status(RESPONSE_STATUS.internalServerError)
        .json({ error: error.message });
    }
  }
}
