
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
    let chatFrameElement = document.getElementById('chatDiv');
    let chatnode = chatFrameElement.getElementsByTagName('iframe')[0]; //ID dell'iframe di chatango è random [FORSE], quickndirty lo prendo con l'indice
    if(chatnode) chatFrameElement.removeChild(chatnode);

    if(extChatWindowHandle==null || extChatWindowHandle.closed){
        extChatWindowHandle=window.open(url,windowName,features);
        extChatWindowHandle.focus();
        extChatWindowHandle.parentWindow=window;
    }else{
        extChatWindowHandle.focus();
    }

    //scrivi in var parent =extChatWindowHandle.document.[...] magari uno <script> per comunicare this.window.document per la finestra del video
    //questo nel caso volessi spostare, con la chat, anche controls e remote. cioè staccare tutta la column.
    //giustamente il problema che mi ero porso 

    //riorganizzaLayoutSenzaChatFrame();
}

function reattachChatFrame(){
    let chatFrameElement = document.getElementById('chatDiv');
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


    //riorganizzaLayoutConChatFrame();       
}

//SE FACCIO LO SWITCH NELLA FINESTRA PRINCIPALE DEVO MANTENERE UN HANDLE DELLA FINESTRA CON LA CHAT COSÌ DA POTERLA CHIUDERE

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
    //console.log("received Exit with test:"+test+"and ");
    //if(extChatWindowHandle.closed) reattachChatFrame(); //<-- non funziona bene sta cosa. mi ritorna false sempre, poi lo faccio a mano nella console e mi torna true, come se la scrittura della variabile sia async
    //console.log("extChatWH.closed "+extChatWindowHandle.closed);
    if(test==0) reattachChatFrame(); //alla fine quelle chiamate "spurie" con il '2' erano quelle problematiche
    else{console.log("what the fuck: receiveExitToParentWindow with value "+test+" and closed: "+extChatWindowHandle.closed);}

}
document.getElementById('dbgPOP').addEventListener("click",commuteChatPopOut);



//TODO: faccio una funzione+booleano switch per la questione della chat?




/*
 * not draggable image issue
 * https://stackoverflow.com/questions/26356877/html5-draggable-false-not-working-in-firefox-browser
*/


//function dragnull(event){ //deprecato uso la lambda (e)=>e.preventDefault()
//    event.preventDefault();
//}
//TODO: anche per le altre immagini che non devono essere draggabili tipo controlFrame


//let remoteElement = document.getElementById('remoteDiv');
//let idno = remoteElement.getElementsByClassName('remoteImgButton').length;
//for(var i=0;i<idno;i++) remoteElement.getElementsByClassName('remoteImgButton').item(i).addEventListener("dragstart", (e)=>e.preventDefault());



/*  
 *  https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 *  https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
 *  https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
*/
let columnHidden=false;
function keyControlHandler(keydownEvent){
    //keydownEvent.preventDefault(); //SE LASCIO QUESTO NON COMMENTATO MANCO LA CONSOLE CON F12 POSSO APRIRE, FARE ATTENZIONE
    if (keydownEvent.isComposing || keydownEvent.keyCode === 229)  return;
    //if (keydownEvent.isComposing || keydownEvent.keyCode === 229 || keydownEvent.repeat)  return;
    if (keydownEvent.repeat) return;

    switch(keydownEvent.keyCode){
        case 72: //char Hh
            if(!columnHidden){
                document.documentElement.style.setProperty("--widescreen-cols-config","100vw");
                document.documentElement.style.setProperty("--widescreen-rows-config","100vh");
                columnHidden=true;
            }else{
                document.documentElement.style.setProperty("--widescreen-cols-config",
                    document.documentElement.style.getPropertyValue("--default-widescreen-cols-config"));
                document.documentElement.style.setProperty("--widescreen-rows-config",
                    document.documentElement.style.getPropertyValue("--default-widescreen-rows-config"));
                columnHidden=false;
                //TODO: mostrare fading popup che dice "per tornare premi H"
            }
            break;
        case 82: //char rR
            //potrei usare le variabili CSS sfruttare il fallback mettendo come valore invalid alla variabile
            // --valore
            // property: var(--valore, defaultValue)
            // set(--valore,invalid)
            //property verrà settato al valore di defaultValue
            break;
    }
}

/*
let iframes = document.getElementsByTagName('iframe');
for(i=0;i<iframes.length;i++) iframes.item(i).addEventListener('keydown', keyControlHandler);
*/

document.addEventListener('keydown', keyControlHandler);
/*quick n dirty: in caso di video tipo iframe injecta la roba correttamente, in caso di <video> fallisce che tanto è injectata dalla linea di sopra che addEventListener su tutto il documento */
try{
    document.getElementById('content').contentDocument.documentElement.getElementsByTagName('body').item(0).addEventListener('keydown', keyControlHandler);

}catch(exception){
    console.log("catched:"+exception);
}