import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();
const elasticClient = new Client({ node: process.env.ELASTICSEARCH_URL });

export default elasticClient;