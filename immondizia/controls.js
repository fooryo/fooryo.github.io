
var extChatWindowHandle=null;
var url ="extchat.html";
var windowName="chiacchiereEsterne"
var features=
    "menubar=0 "+
    "toolbar=0 "+
    "location=0 "+
    "status=0";
var chatOuted=false;
//const lambdapro = ()=>{ return new Promise( ()=>{extChatWindowHandle=window.open(url,windowName,features);} ); };
function detatchChatFrame(){
    let chatFrameElement = document.getElementById('chatFrame');
    let chatnode = chatFrameElement.getElementsByTagName('iframe')[0]; //ID dell'iframe di chatango è random [FORSE], quickndirty lo prendo con l'indice
    if(chatnode) chatFrameElement.removeChild(chatnode);

    if(extChatWindowHandle==null || extChatWindowHandle.closed){
        extChatWindowHandle=window.open(url,windowName,features);
        extChatWindowHandle.focus();
        extChatWindowHandle.parentWindow=window;
    }else{
        extChatWindowHandle.focus();
    }
}

function reattachChatFrame(){
    let chatFrameElement = document.getElementById('chatFrame');
    let newElem = document.createElement("script");

    let chatInnerHTML ="{\"handle\":\"fooryoembed\",\"arch\":\"js\",\"styles\":{\"a\":\"000000\",\"b\":100,\"c\":\"c0c0c0\",\"d\":\"a0a0a0\",\"e\":\"000000\",\"g\":\"e0e0e0\",\"h\":\"606060\",\"j\":\"ffffff\",\"k\":\"336666\",\"l\":\"404040\",\"m\":\"000000\",\"n\":\"FFFFFF\",\"p\":\"10\",\"q\":\"000000\",\"r\":100,\"usricon\":0,\"allowpm\":0,\"cnrs\":\"0.38\"}}";

    newElem.setAttribute("class","chatte");
    newElem.setAttribute("id","cid0020000265869400948");
    newElem.setAttribute("data-cfasynch","false");
    newElem.setAttribute("async","");
    newElem.setAttribute("src","//st.chatango.com/js/gz/emb.js");
    newElem.setAttribute("style","width: 100%;height: 100%;");
    newElem.innerHTML=chatInnerHTML;

    chatFrameElement.appendChild(newElem);
      
}


function commuteChatPopOut(){
    if(!chatOuted){
        chatOuted=true;
        detatchChatFrame();
    }else{
        chatOuted=false;
        reattachChatFrame();
        extChatWindowHandle.close();
    }
}

function receiveExitToParentWindow(test){
    if(test==0) reattachChatFrame(); //alla fine quelle chiamate "spurie" con il '2' erano quelle problematiche
    else{console.log("what the fuck: receiveExitToParentWindow with value "+test+" and closed: "+extChatWindowHandle.closed);}

}

document.getElementById('dbgPOP').addEventListener("click",commuteChatPopOut);



function dragnull(event){
    event.preventDefault();
}
//TODO: anche per le altre immagini che non devono essere draggabili tipo controlFrame
let remoteElement = document.getElementById('remote');
let idno = remoteElement.getElementsByClassName('remoteImgButton').length;
for(var i=0;i<idno;i++) remoteElement.getElementsByClassName('remoteImgButton').item(i).addEventListener("dragstart", dragnull);


let columnHidden=false;
function keyControlHandler(keydownEvent){
    if (keydownEvent.isComposing || keydownEvent.keyCode === 229)  return;
    if (keydownEvent.repeat) return;

    switch(keydownEvent.keyCode){
        case 72: //char Hh
            if(columnHidden){
                document.getElementById('columnFrame').style.setProperty("display","flex");
                columnHidden=false;
            }else{
                document.getElementById('columnFrame').style.setProperty("display","none");
                columnHidden=true;
                //TODO: mostrare fading popup che dice "per tornare premi H"
            }
            break;
        case 82: //char rR

            break;
    }
}


document.addEventListener('keydown', keyControlHandler);

try{
    document.getElementById('content').contentDocument.documentElement.getElementsByTagName('body').item(0).addEventListener('keydown', keyControlHandler);
//document.getElementById('chatFrame').getElementsByTagName('iframe').item(0).
}catch(exception){
    console.log("catched:"+exception);
}
