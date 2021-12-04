const express = require('express');
const app = express();
const elasticsearch = require('elasticsearch');
const texts = require('./data.json');

const fs = require('fs').promises;
 
const readFileSync = require('fs').readFileSync;
const { text } = require('express');

const client = getClient()


function getClient() {
  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    // log: 'trace'
  });

  return client;
}


const host = "0.0.0.0"

// set localhost

app.set('port', 3000);
app.use(express.static('public'))

app.listen(app.get('port'),host, function () {
  console.log("App listening on port 3000!");
});

app.get('/',(request,response) =>{

    const client = getClient();
    response.json(message="ok")
})


app.get('/api/dhbb-all',async (req,res)=>{
  let data = await client.search({
    index: "dhbb_test"
  })
  return res.json(data);
})


app.get('/api/search/:data',function(req,res){
  const routeParams = req.params;
  var data = routeParams.data;
  console.log(data);
})

