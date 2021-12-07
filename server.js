const express = require('express');
const app = express();
const elasticsearch = require('elasticsearch');
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
var data = "";
var filter = {must:[]};;

app.get("/",()=>{
  data = "";
  filter = {must:[]};
})

app.get('/api/dhbb-all',async (req,res)=>{
  let data = await client.search({
    index: "dhbb_fgv"
  })
  return res.json(data);
})

app.get("/api/clear",function(req,res) {
  filter = {must:[]};
  filter.must.push({match:{text: data}})
  query = client.search({
    index: 'dhbb_fgv',
    size: 1000,
    body: {
      query: {
        bool : filter
      },
    }
  }, (err, result) => {
    if (err) console.log(err);
    if(result.hits != undefined){
      res.send(result.hits.hits)
    }else {
      res.send(["Sem resultados"])
    };
  })
  filter.must.pop();
})

app.get('/api/search/:data',function(req,res){
  const routeParams = req.params;
  data = routeParams.data;
  filter.must.push({match:{text: data}})
  query = client.search({
    index: 'dhbb_fgv',
    size: 1000,
    body: {
      query: {
        bool : filter
      },
    }
  }, (err, result) => {
    if (err) console.log(err);
    if(result.hits != undefined){
      res.send(result.hits.hits)
    }else {
      res.send(["Sem resultados"])
    };
  })
  filter.must.pop();
})

app.get('/api/fil/:filter',function(req,res){
  const routeParams = req.params;
  filter = JSON.parse(routeParams.filter);
  query = client.search({
    index: 'dhbb_fgv',
    size: 1000,
    body: {
      query: {
        bool : filter
      },
    }
  }, (err, result) => {
    if (err) console.log(err);
    if(result.hits != undefined){
      res.send(result.hits.hits)
    }else {
      res.send(["Sem resultados"])
    };
  })
})

