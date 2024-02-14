import elasticClient from "../config/elasticsearch.Config";

class ElasticSearch {
  async esInitIndex(indexName: string,settings: object ,mappings: object) {
    try {
      if (!(await this.esIndexExists(indexName))) {
        return await elasticClient.indices.create({
          index: indexName,
          body: {
            settings: settings,
            mappings: mappings
          },
        });
      } else {
        console.log("error in elasticSearch Create Index function ");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esIndexExists(indexName: string) {
    try {
      return await elasticClient.indices.exists({
        index: indexName,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esCreateDocument(indexName: string, payload: any) {
    try {
      return await elasticClient.index({
        index: indexName,
        body: payload,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esCreateBulkDocument(indexName: string, payload: any) {
    try {
      if (Array.isArray(payload)) {
        const bulkRequestBody = payload.reduce((acc, doc) => {
          acc.push({ index: { _index: indexName } });
          acc.push(doc);
          return acc;
        }, []);
        console.log(bulkRequestBody);
        return await elasticClient.bulk({
          body: bulkRequestBody,
        });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // const updateQuery = {
  //     index: 'products',
  //     id,
  //     body: {
  //       doc: updateBody,
  //       upsert: updateBody,
  //     },
  //   };

  async esUpdateDocument(indexName: string, id: string, payload: any) {
    try {
      return await elasticClient.update({
        index: indexName,
        id: id.toString(),
        body: {
          doc: payload,
        },
        retry_on_conflict: 10,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esSearch(indexName: string, payload: any) {
    try {
      return await elasticClient.search({
        index: indexName,
        body: payload,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esFindAndUpdate(indexName: string, payload: any) {
    try {
      return await elasticClient.updateByQuery({
        index: indexName,
        body: payload,
        conflicts: "proceed",
        //refresh=wait_for
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esDelete(indexName: string, id: string) {
    try {
      return await elasticClient.delete({
        index: indexName,
        id: id.toString(),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esDeleteByQuery(indexName: string, payload: any) {
    try {
      return await elasticClient.deleteByQuery({
        index: indexName,
        body: payload,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esGetById(indexName: string, _id: string) {
    try {
      return await elasticClient.get({
        index: indexName,
        id: _id,
      });
    } catch (error) {
      throw error;
    }
  }

  // parameter -> mapping: object --> removed for not being in use
  async esAddSettingToIndex(indexName: string) {
    try {
      await elasticClient.indices.close({ index: indexName });
      let esResponse = await elasticClient.indices.putSettings({
        index: indexName,
        body: {
          settings: {
            analysis: {
              analyzer: {
                my_analyzer: {
                  type: "standard",
                },
              },
            },
          },
        },
      });
      await elasticClient.indices.open({ index: indexName });
      return esResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async esGetMultipleByIds(
    indexName: string,
    _ids: string[],
    _source: string[]
  ) {
    try {
      const docs = _ids.map((x) => ({ _index: indexName, _id: x, _source }));
      return await elasticClient.mget({
        index: indexName,
        body: { docs },
      });
    } catch (error) {
      return {};
    }
  }

  async esDeleteIndex(indexName: string) {
    try {
      if (await this.esIndexExists(indexName)) {
        console.log("base entity", indexName);
        return await elasticClient.indices.delete({
          index: indexName,
        });
      } else {
        console.log("Index does not exist");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

// async esDeleteAll(indexName: string){
//     try {
//         return await DB.delete({
//             index: indexName
//         });
//     } catch (error) {
//         utils.consolelog('esDeleteAll', error, false)
//         return Promise.reject(error)
//     }
// }

// async esGetBusinessById(indexName: string, _id: string) {
//     try {
//         return await DB.get({
//             index: indexName,
//             id: _id,
//             _source: ELASTIC.BUSINESS_ATTRIBUTES
//         });
//     } catch (error) {
//         return {}
//     }
// }

export const ES = new ElasticSearch();
