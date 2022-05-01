/* COSA ABBIAMO IMPARATO


abbiamo imparato che:
    var non rispetta lo scope; chiamato una volta la variabile è chiamabile e modificabile ovunque;
    let rispetta lo scope, se nasce nello scope muore nello scope.
    const rispetta lo scope.


abbiamo imparato che:
    "HOISTING": era la pratica di assegnare a delle variabili, non ancora dichiarate, dei valori. 
                questo perchè il parser spingeva in alto la dichiarazione delle variabili. 
                questo non è vero con LET. funziona solo con VAR.

abbiamo imparato che:
    HTMLCollection non ha il metodo remove. non potevo cancellare a cazzo duro come facevo:
    document.getElementByIf('remote').getElemensByClassName('remoteImgButton).item( last ).remote();
    non esiste sta cosa.

    prendo il NODO interessato, prendo il PADRE, ci invoco removeChild indicando il NODO

abbiamo imparato che:
    non è proprio pratica bellissima ficca a cazzo duro codice html nel nodo padre come facevo io.
    ma è possibile costruire l'oggetto nodo con il suo elementTag, attributi e innerHTML
    quindi injectarlo nel nodo. è tutta una questioni di nodi DOM, 
*/

document.getElementById('dbgADD').addEventListener("click",addChannelButton);
document.getElementById('dbgDEL').addEventListener("click",removeLastChannelButton);

function addChannelButton(){
    //TODO refacor con le proprie funzioni. creare nodo, prendere il padre, appendere il nodo al padre. no sta cosa della concatenazione stringa su innterHTML
    let newbutton = "<img class=\"remoteImgButton\" role=\"button\" src=\"res/icons/balloon.png\"   alt=\"fallback text\" onclick=\"void(0);\"    >"
    //document.getElementById('remote').appendChild(newbutton); //error newbutton non è un tipo 'Node'
    document.getElementById('remote').innerHTML+=newbutton;
    console.log("new child:\n"+newbutton+"\nEND");
    
}


function removeLastChannelButton(){

    let parent = document.getElementById('remote');
    let idno = parent.getElementsByClassName('remoteImgButton').length;
    let node = parent.getElementsByClassName('remoteImgButton').item(idno-1);  
    parent.removeChild(node);

}

/*

https://www.abeautifulsite.net/adding-and-removing-elements-on-the-fly-using-javascript

function addElement( parentID, elementTAG, elementID, html){
    var parent = document.getElementById(parentID);
    var newElem = document.createElement(elementTAG);

    newElem.setAttribute('id',elementId);
    newElem.setAttribute('src', '/res/stuff.jpg');
    newElem.setAttribute('width','100%');
    newElem.innerHTML = html;

    parent.appendChild(newElement);

    
    //<parentElement id="parent">
    //    <elementTAG id="elementID"> innerHTML </elementTAG>
    //</parentElement>
    
}


function removeElementById(elemenId){
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element)
}

*/