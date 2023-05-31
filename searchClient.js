
const elasticsearch = require('elasticsearch');


module.exports =  async function getClient() {
  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    // log: 'trace'
  });

  return client;
}

