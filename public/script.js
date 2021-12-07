const lupa = document.querySelector("#lupa");
const search = document.querySelector("#search");

const column = document.querySelector("#leftColumn");

const content = document.querySelector("#content");

const allMarked = document.createElement("div");

var filter = {must:[]};


lupa.addEventListener("click",()=>{
    if (search.value != ""){
        fetch("/api/search/" + search.value).then(data=>data.json())
        .then(data=>addDocsHTML(data));
    }

})

function createType() {
    column.innerHTML = ""
    h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Refine sua busca"))
    column.appendChild(h2)

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Natureza do documento:"))

    column.appendChild(tipo)


    mark = document.createElement("input")
    mark.classList.add("marks")
    mark.setAttribute("type","checkbox");
    
    mark.addEventListener('click',()=>{
        addJsonSearch("natureza", "biográfico")
        createBio("Biográfico")
    })
    
    op1 = document.createElement("div")
    op1.classList.add("opt")
    op1.appendChild(mark);
    op1.appendChild(document.createTextNode("Biográfico"));

    mark = document.createElement("input")
    mark.classList.add("marks")
    mark.setAttribute("type","checkbox");

    mark.addEventListener('click',()=>{
        addJsonSearch("natureza", "temático");
        createTema("Temático");
    })

    op2 = document.createElement("div")
    op2.classList.add("opt") 
    op2.appendChild(mark);
    op2.appendChild(document.createTextNode("Temático"))

    column.appendChild(op1);
    column.appendChild(op2);
    
    
}

createType();

function createBio(text) {
    column.innerHTML = "";

    let h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Refine sua busca"))

    column.appendChild(h2)

    let marked = document.createElement("div")
    marked.classList.add("marked")
    marked.appendChild(document.createTextNode(text))

    let clear = document.createElement("button")
    clear.classList.add("clear")
    clear.appendChild(document.createTextNode("Limpar filtros"))
    clear.addEventListener("click",()=>{
        filter = {must:[]};
        allMarked.textContent = ""
        createType();
        fetch("/api/clear").then(data=>data.json()).then(data=>addDocsHTML(data));
    })

    allMarked.appendChild(marked);
    column.appendChild(allMarked);
    column.appendChild(clear);

    let tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Sexo:"))


    let mark = document.createElement("input")
    mark.classList.add("marks")
    mark.setAttribute("type","checkbox");
    
    mark.addEventListener('click',(e)=>{
        addJsonSearch("sexo", "m")
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode("Masculino"))
        allMarked.appendChild(marked);
        e.path[2].innerHTML = "";
    })
    
    let op1 = document.createElement("div")
    op1.classList.add("opt")
    op1.appendChild(mark);
    op1.appendChild(document.createTextNode("Masculino"));

    mark = document.createElement("input")
    mark.classList.add("marks")
    mark.setAttribute("type","checkbox");

    mark.addEventListener('click',(e)=>{
        addJsonSearch("sexo", "m");
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode("Feminino"))
        allMarked.appendChild(marked);
        e.path[2].innerHTML = "";
    })

    let op2 = document.createElement("div")
    op2.classList.add("opt") 
    op2.appendChild(mark);
    op2.appendChild(document.createTextNode("Feminino"))

    let d = document.createElement("div")
    d.appendChild(tipo);
    d.appendChild(op1);
    d.appendChild(op2);
    column.appendChild(d);

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Nome do indivíduo:"))

    let form = document.createElement("form");
    let input = document.createElement("input");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addJsonSearch("name", e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Ano de nascimento:"))

    form = document.createElement("form");
    input = document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("max","2099");
    input.setAttribute("min","1400");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addJsonSearch("birthdate",e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);
    
    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Local de nascimento:"))

    form = document.createElement("form");
    input = document.createElement("input");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addJsonSearch("birthplace", e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Cargos:"))

    form = document.createElement("form");
    input = document.createElement("input");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addJsonSearch("cargos", e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Pai do indivíduo:"))

    form = document.createElement("form");
    input = document.createElement("input");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addJsonSearch("father", e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Mãe do indivíduo:"))

    form = document.createElement("form");
    input = document.createElement("input");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addJsonSearch("mother", e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Autor do documento:"))

    form = document.createElement("form");
    input = document.createElement("input");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addJsonSearch("autor",e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);
    
    let send = document.createElement("button")
    send.classList.add("send")
    send.appendChild(document.createTextNode("Enviar"))
    send.addEventListener("click",()=>{
        if(search.value != ""){
            addJsonSearch("text",search.value);
            fetch("/api/fil/"+JSON.stringify(filter)).then(data=>data.json())
            .then(data=>{
                addDocsHTML(data);
            })
            filter.must.pop();
        }
        else{
            fetch("/api/fil/"+JSON.stringify(filter)).then(data=>data.json())
            .then(data=>{
                addDocsHTML(data);
            })
        }
    })
    
    column.appendChild(send);

}


function createTema(text) {
    column.innerHTML = "";

    let h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Refine sua busca"))

    column.appendChild(h2)

    let marked = document.createElement("div")
    marked.classList.add("marked")
    marked.appendChild(document.createTextNode(text))

    let clear = document.createElement("button")
    clear.classList.add("clear")
    clear.appendChild(document.createTextNode("Limpar filtros"))
    clear.addEventListener("click",(e)=>{
        filter = {must:[]};
        allMarked.textContent = ""
        createType();
        fetch("/api/clear").then(data=>data.json()).then(data=>addDocsHTML(data));
    })

    allMarked.appendChild(marked);
    column.appendChild(allMarked);
    column.appendChild(clear);

    let tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Tipo:"))

    let d = document.createElement("div")
    const tipos = ['Formulação Política', 'Documento', 'Conceito', 'Evento', 'Organização']

    d.appendChild(tipo);

    for(let i of tipos){
        let mark = document.createElement("input")
        mark.classList.add("marks")
        mark.setAttribute("type","checkbox");
        mark.addEventListener('click',(e)=>{
            addJsonSearch("tipo", i);
            let marked = document.createElement("div")
            marked.classList.add("marked")
            marked.appendChild(document.createTextNode(i))
            allMarked.appendChild(marked);
            e.path[2].innerHTML = "";
        })
        let op1 = document.createElement("div")
        op1.classList.add("opt")
        op1.appendChild(mark);
        op1.appendChild(document.createTextNode(i));
        d.appendChild(op1);

    }
    
    column.appendChild(d);

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Subtipos:"))

    d = document.createElement("div")
    const subtipos = ['Carta', 'Imprensa', 'Televisão', 'Manifesto', 'Jurídica', 'Rádio', 'Plano/Programa', 'Empresa', 'Legislação', 'Sociedade civil', 'Político-administrativa', 'Ensino', 'Acordo/Tratado']

    d.appendChild(tipo);

    for(let i of subtipos){
        let mark = document.createElement("input")
        mark.classList.add("marks")
        mark.setAttribute("type","checkbox");
        mark.addEventListener('click',(e)=>{
            addJsonSearch("subtipo", i);
            let marked = document.createElement("div")
            marked.classList.add("marked")
            marked.appendChild(document.createTextNode(i))
            allMarked.appendChild(marked);
            e.path[2].innerHTML = "";
        })
        let op1 = document.createElement("div")
        op1.classList.add("opt")
        op1.appendChild(mark);
        op1.appendChild(document.createTextNode(i));
        d.appendChild(op1);

    }
    
    column.appendChild(d);

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Autor do documento:"))

    let form = document.createElement("form");
    let input = document.createElement("input");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        addJsonSearch("autor",e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);

    
    let send = document.createElement("button")
    send.classList.add("send")
    send.appendChild(document.createTextNode("Enviar"))
    send.addEventListener("click",()=>{
        if(search.value != ""){
            addJsonSearch("text",search.value);
            fetch("/api/fil/"+JSON.stringify(filter)).then(data=>data.json())
            .then(data=>{
                addDocsHTML(data);
            })
            filter.must.pop();
        }
        else{
            fetch("/api/fil/"+JSON.stringify(filter)).then(data=>data.json())
            .then(data=>{
                addDocsHTML(data);
            })
        }
    })
    
    column.appendChild(send);

    

}

function addJsonSearch(key,value){
    let c = {}
    c[key] = value
    filter.must.push({match:c})
}

function addDocsHTML(data) {
    content.innerHTML  = "";
    try{
        let div = document.createElement("div");
        div.classList.add("docs");
        if(data.length < 1000)
        div.innerHTML = "<p>Número de documentos encontrados: "+ data.length +".</p>";
        else div.innerHTML = "<p>Número de documentos encontrados: +1000.</p>";
        content.appendChild(div);
        
        for(doc of data){
        let div = document.createElement("div");
        div.classList.add("docs");
        div.innerHTML = "Documento de número: <strong>" + 
                        doc["_source"]["document"] +
                        "</strong> </br> <p>" +
                        doc["_source"]["text"].replace(/\n\n/g, "</p><p>") +
                        "</p>";
        content.appendChild(div);
    }}catch{
        
        let div = document.createElement("div");
        div.classList.add("docs");
        div.innerHTML = "<p>Resultado não encontrado.</p>";
        content.appendChild(div);
        
    }
    
}
