const elasticsearch = require('elasticsearch');
const texts = require('./data.json');

const l = texts.length

async function createDB(i0,i1) {
    const client = new elasticsearch.Client({
      host: 'localhost:9200',
    });

    let i = 0

    for(let j =i0;j<i1;j++){
      client.index({
          index: 'dhbb_fgv',
          type: "dhbb_fgv",
          body: texts[j]
      })
      i += 1
  };
  console.log(i)
}

createDB(0,l/2).then(createDB(l/2,l));
