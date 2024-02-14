# Elasticsearch POC (Proof of Concept) on ExpressJS

This project demonstrates how to integrate Elasticsearch with NestJS for search purposes. It includes endpoints for indexing, searching, updating, and deleting documents in Elasticsearch.

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Indexing Documents](#indexing-documents)
  - [Searching Documents](#searching-documents)
  - [Updating Documents](#updating-documents)
  - [Deleting Documents](#deleting-documents)
- [Advanced Configuration](#advanced-configuration)
- [Contributing](#contributing)
- [License](#license)

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DeepakDua-appinventiv/ElasticSearch_POC.git
   cd Elasticsearch-POC
   npm install

   ```

## Configuration
  1. Create a .env File:
Create a .env file in the root directory with the following content:

.env 
```bash
PORT: The port on which the application will run.
Example: PORT=3008

ELASTICSEARCH_URL: The URL for connecting to Elasticsearch.
Example: ELASTICSEARCH_URL=http://localhost:9200

DB_NAME: The connection string for MongoDB.
Example: DB_NAME=mongodb://localhost:27017/ProductsDB

STACK_VERSION: The version of Node.js used for development.
Example: STACK_VERSION=8.12.0
```

## @elastic/elasticsearch Package
The @elastic/elasticsearch package is a Node.js client library for Elasticsearch, developed and maintained by Elastic. It provides a convenient way to interact with Elasticsearch clusters from Node.js applications.

* Usage:
To use the @elastic/elasticsearch package in your Node.js application, you can install it via npm or yarn:
```typescript
npm install @elastic/elasticsearch
```

## ElasticSearch Configuration
Elasticsearch Client Initialization: The Elasticsearch client is initialized using the new Client() constructor. It is configured with the Elasticsearch node URL obtained from the ELASTICSEARCH_URL environment variable. This URL specifies the address and port where Elasticsearch is hosted, allowing the client to establish a connection.

Exporting the Client: The initialized Elasticsearch client is exported as a default module, making it available for use throughout the application. By exporting the client, other modules can import it and perform Elasticsearch operations like indexing documents or executing search queries.
```typescript
import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";

dotenv.config();
const elasticClient = new Client({ node: process.env.ELASTICSEARCH_URL });

export default elasticClient;
```

## ElasticSearch Features
* Full-Text Search: Elasticsearch offers powerful full-text search capabilities, allowing users to quickly and efficiently search through large volumes of text-based data.

* Real-Time Indexing: With real-time indexing, Elasticsearch can index data as soon as it's added or updated, ensuring that search results reflect the latest changes in near real-time.

* Scalability: Elasticsearch is designed to scale horizontally, enabling it to handle large datasets and high query loads by distributing data and workload across multiple nodes in a cluster.

* High Availability: Elasticsearch provides built-in support for high availability and fault tolerance, ensuring that data remains accessible even in the event of node failures or network issues.

* RESTful API: Elasticsearch exposes a RESTful API, making it easy to interact with and integrate into various applications and systems using standard HTTP methods and JSON payloads.

## Advanced Configuration
1.Index Settings:
Fine-tune index settings such as the number of shards and replicas, refresh interval, or allocation policies.

2.Dynamic Mapping Configuration:
Configure dynamic mapping behavior to control how Elasticsearch dynamically adds fields to the index.

3.Aliases:
Define aliases to provide a stable endpoint for client applications and facilitate index management operations such as rolling upgrades or A/B testing.

4.Tokenizers and Analyzers:
Create custom tokenizers and analyzers tailored to your specific use cases and language requirements.

5.Monitoring and Logging:
Set up monitoring and logging configurations to monitor cluster health, performance metrics, and log events for troubleshooting.

## Usage
```bash
npm run start:dev
```

## Contributing
Contributions are welcome! Please follow the contribution guidelines.

## License

This README provides detailed instructions on prerequisites, installation, configuration, usage, advanced configuration (deduplication and message groups), contributing, and licensing. Feel free to adjust it further based on your project's specifics.