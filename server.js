const express = require('express');
const app = express();
const elasticsearch = require('elasticsearch');
const texts = require('./data.json');

const fs = require('fs').promises;

const readFileSync = require('fs').readFileSync;
const { text } = require('express');

const client = getClient()

createData = require('./setDataDB')

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

app.get('/add/dhbb', async (req,res)=>{
  // let arquivos = await dhbbArq()
  // let allData = dhbbData(arquivos)
  for await (arq of texts){
    client.index({
        index: 'dhbb_test3',
        type: "dhbb_text3",
        body: arq
    })
  }
  return res.json({message: "save"})
});

app.get('/data/dhbb',async (req,res)=>{
  let data = await client.search({
    index: "dhbb_test"
  })
  return res.json(data);
})

//for await (let arq of arquivos){
//  getClient().index({
//      index: 'dhbb',
//      type: "dhbb_text",
//      body: arq
//  })
//}


app.get('/:data',function(req,res){
  const routeParams = req.params;
  var data = routeParams.data;
    
})

async function listarArquivosDoDiretorio(diretorio) {

    arquivos = []
    let listaDeArquivos = await fs.readdir(diretorio);
    for(let k in listaDeArquivos) {
        let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
        if(stat.isDirectory())
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        else
            arquivos.push(diretorio + '/' + listaDeArquivos[k]);
    }

    return arquivos;

}


async function dhbbArq() {
    let arquivos = await listarArquivosDoDiretorio('./dhbb/text'); 
    return arquivos;
}


function dhbbData(arquivos){
  let allData = []
  for (let arq of arquivos.slice(1,4)){
    data = readFileSync(arq,'utf-8');
    allData.push(data);
  }
  return allData;
}
