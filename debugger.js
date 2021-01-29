

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
