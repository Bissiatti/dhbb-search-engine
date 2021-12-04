const lupa = document.querySelector("#lupa");
const search = document.querySelector("#search");

const column = document.querySelector("#leftColumn");

var filter = [];

lupa.addEventListener("click",()=>{
    console.log(search.value);
    fetch("/api/search/" + search.value);
})

function createSidebar() {
    h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode("Refine sua busca"))
    column.appendChild(h2)

    tipo = document.createElement("div")
    tipo.classList.add("infoMark")
    tipo.appendChild(document.createTextNode("Tipo de documento"))

    column.appendChild(tipo)


    mark = document.createElement("input")
    mark.classList.add("marks")
    mark.setAttribute("type","checkbox");
    
    mark.addEventListener('click',()=>{
        filter.push("biográfico");
    })
    
    op1 = document.createElement("div")
    op1.classList.add("opt")
    op1.appendChild(mark);
    op1.appendChild(document.createTextNode("Biográfico"));

    mark = document.createElement("input")
    mark.classList.add("marks")
    mark.setAttribute("type","checkbox");
    
    mark.addEventListener('click',()=>{
        filter.push("temático");
    })

    op2 = document.createElement("div")
    op2.classList.add("opt") 
    op2.appendChild(mark);
    op2.appendChild(document.createTextNode("Temático"))

    column.appendChild(op1);
    column.appendChild(op2);
}


createSidebar();