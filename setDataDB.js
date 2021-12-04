const elasticsearch = require('elasticsearch');
const texts = require('./data.json');

const fs = require('fs').promises;


function getClient() {
    const client = new elasticsearch.Client({
      host: 'localhost:9200',
      // log: 'trace'
    });
  
    return client;
  }


function createDB() {
    const client = getClient();
    for (arq of texts){
        client.index({
            index: 'dhbb',
            type: "dhbb",
            body: arq
        })
    }
    console.log("ok!")
}

createDB();
