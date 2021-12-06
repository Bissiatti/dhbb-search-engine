const lupa = document.querySelector("#lupa");
const search = document.querySelector("#search");

const column = document.querySelector("#leftColumn");

const content = document.querySelector("#content");

const allMarked = document.createElement("div");

var filter = {must:[]};


lupa.addEventListener("click",()=>{
    console.log(search.value);
    fetch("/api/search/" + search.value).then(data=>data.json())
        .then(data=>addDocsHTML(data));
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
    console.log(filter);
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
        var filter = {must:[]};
        allMarked.textContent = ""
        createType();
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
    tipo.appendChild(document.createTextNode("Ano de nascimento:"))

    let form = document.createElement("form");
    let input = document.createElement("input");
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
        console.log(filter);
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
        console.log(filter);
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
        birthplace("cargo",e.target[0].value);
        let marked = document.createElement("div")
        marked.classList.add("marked")
        marked.appendChild(document.createTextNode(e.target[0].value))
        allMarked.appendChild(marked);
        e.path[0].innerHTML = "";
        console.log(filter);
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
        console.log(filter);
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
        console.log(filter);
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
        console.log(filter);
    })

    form.appendChild(tipo);
    form.appendChild(input);
    column.appendChild(form);
    
    let send = document.createElement("button")
    send.classList.add("send")
    send.appendChild(document.createTextNode("Enviar"))
    send.addEventListener("click",()=>{
        fetch("/api/fil/"+JSON.stringify(filter)).then(data=>data.json())
        .then(data=>{
            console.log(data);
            addDocsHTML(data);
        })
    })
    
    column.appendChild(send);

}


function createTema(text) {
    console.log(filter);
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
        var filter = {must:[]};
        allMarked.textContent = ""
        createType();
    })

    allMarked.appendChild(marked);
    column.appendChild(allMarked);
    column.appendChild(clear);

    let tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Tipo:"))

    let d = document.createElement("div")
    const tipos = ['Formulação Política', 'Formulação política', 'Documento', 'Conceito', 'Evento', 'Organização']

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

    
    let send = document.createElement("button")
    send.classList.add("send")
    send.appendChild(document.createTextNode("Enviar"))
    send.addEventListener("click",()=>{
        fetch("/api/fil/"+JSON.stringify(filter)).then(data=>data.json())
        .then(data=>addDocsHTML(data))
    })
    
    column.appendChild(send);

}

function addJsonSearch(key,value){
    filter.must.push({match:{key,value}})
}

function addDocsHTML(data) {
    content.innerHTML  = "";
    console.log(data);
    if (data == ['Sem resultados']){
        let div = document.createElement("div");
        div.classList.add("docs");
        div.innerHTML = "<p>Sem resultados</p>";
        content.appendChild(div);
    }
    for(doc of data){
        let div = document.createElement("div");
        div.classList.add("docs");
        div.innerHTML = "Documento de número: <strong>" + 
                        doc["_source"]["document"] +
                        "</strong> </br> <p>" +
                        doc["_source"]["text"].replace(/\n\n/g, "</p><p>") +
                        "</p>";
        content.appendChild(div);
    }
}
