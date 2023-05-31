const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
  });

const str =  '{"type":"Biográfico","sexo":"Masculino"}'

console.log(str)
let test = {filter:[{match: {text: 'natureza', natureza: 'biográfico'}}]}
let r = JSON.parse(str);

client.search({
  index: 'dhbb_fgv',
  size: 1000,
  body: 
  {
    query: {
      bool: 
        {filter:[{match: {text: 'natureza'}, match: { natureza: 'biográfico'}}]}
    }
      
  }
}, (err, result) => {
  if (err) console.log(err);
  if(result.hits != undefined){
    console.log(result.hits.hits)
  }
})


console.log(r);