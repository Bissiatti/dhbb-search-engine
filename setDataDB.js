const elasticsearch = require('elasticsearch');
const texts = require('./data.json');

async function createDB() {
    const client = new elasticsearch.Client({
      host: 'localhost:9200',
    });

    console.log(client)
    let i = 0

    for(let j =0;j<texts.length;j++){
      client.index({
          index: 'docsdhbb',
          type: "docsdhbb",
          body: texts[j]
      })
      i += 1
  };
  console.log(i)
}

createDB();
