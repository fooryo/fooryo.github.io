///detatchChatJS--global
var extChatWindowHandle=null;
var chatOuted=false;

///keycontrolJS--global
let columnHidden=false;

///resizeJS--global
let inDragging = false;


///detatchChatJS--function
function detatchChatFrame(){
    let chatFrameElement = document.getElementById('chatDiv');
    let chatnode = chatFrameElement.getElementsByTagName('iframe')[0]; //ID dell'iframe di chatango è random [FORSE], quickndirty lo prendo con l'indice
    if(chatnode) chatFrameElement.removeChild(chatnode);

    var url ="extchat.html";
    var windowName="chiacchiereEsterne"
    var features=
        "menubar=0 "+
        "toolbar=0 "+
        "location=0 "+
        "status=0";

    if(extChatWindowHandle==null || extChatWindowHandle.closed){
        extChatWindowHandle=window.open(url,windowName,features);
        extChatWindowHandle.focus();
        extChatWindowHandle.parentWindow=window;
    }else{
        extChatWindowHandle.focus();
    }
}
function reattachChatFrame(){
    let chatFrameElement = document.getElementById('chatDiv');
    let newElem = document.createElement("script");

    let chatInnerHTML ="{\"handle\":\"chiacchiere\",\"arch\":\"js\",\"styles\":{\"a\":\"000000\",\"b\":100,\"c\":\"c0c0c0\",\"d\":\"a0a0a0\",\"e\":\"000000\",\"g\":\"e0e0e0\",\"h\":\"606060\",\"j\":\"ffffff\",\"k\":\"336666\",\"l\":\"404040\",\"m\":\"000000\",\"n\":\"FFFFFF\",\"p\":\"10\",\"q\":\"000000\",\"r\":100,\"usricon\":0,\"allowpm\":0,\"cnrs\":\"0.38\"}}";
    //let chatInnerHTML ="{\"handle\":\"fooryoembed\",\"arch\":\"js\",\"styles\":{\"a\":\"000000\",\"b\":100,\"c\":\"c0c0c0\",\"d\":\"a0a0a0\",\"e\":\"000000\",\"g\":\"e0e0e0\",\"h\":\"606060\",\"j\":\"ffffff\",\"k\":\"336666\",\"l\":\"404040\",\"m\":\"000000\",\"n\":\"FFFFFF\",\"p\":\"10\",\"q\":\"000000\",\"r\":100,\"usricon\":0,\"allowpm\":0,\"cnrs\":\"0.38\"}}";



    newElem.setAttribute("class","chatte");
    //newElem.setAttribute("id","cid0020000265869400948");//foortest
    newElem.setAttribute("id","cid0020000154051602021"); //chiacchiere
    newElem.setAttribute("data-cfasynch","false");
    newElem.setAttribute("async","");
    newElem.setAttribute("src","//st.chatango.com/js/gz/emb.js");
    newElem.setAttribute("style","width: 100%;height: 100%;");
    newElem.innerHTML=chatInnerHTML;

    chatFrameElement.appendChild(newElem);


    //riorganizzaLayoutConChatFrame();       
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
    //console.log("received Exit with test:"+test+"and ");
    //if(extChatWindowHandle.closed) reattachChatFrame(); //<-- non funziona bene sta cosa. mi ritorna false sempre, poi lo faccio a mano nella console e mi torna true, come se la scrittura della variabile sia async
    //console.log("extChatWH.closed "+extChatWindowHandle.closed);
    if(test==0) reattachChatFrame(); //alla fine quelle chiamate "spurie" con il '2' erano quelle problematiche
    else{console.log("what the fuck: receiveExitToParentWindow with value "+test+" and closed: "+extChatWindowHandle.closed);}
}


///keycontrolJS--function
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


///resizeJS--function
function getCSSRule(ruleName) {
    ruleName = ruleName.toLowerCase();
    var result = null;
    var find = Array.prototype.find;

    find.call(document.styleSheets, styleSheet => {
        result = find.call(styleSheet.cssRules, cssRule => {
            return cssRule instanceof CSSStyleRule 
                && cssRule.selectorText.toLowerCase() == ruleName;
        });
        return result != null;
    });
    return result;
};

function startDraggingHandler(mousedownE){
    mousedownE.preventDefault();
    if(!inDragging){
        inDragging=true;
        startDragging(mousedownE);
        return;
    }
}

function startDragging(mousedownE) {
    mousedownE.preventDefault();
    let oldIframePointer=getCSSRule('iframe').style.pointerEvents;

    function mouseDragHandler(pointermoveEvent) { /*la dichiarazione è fatta qui dentro per motivi di scope e visibilita delle variabili */
        pointermoveEvent.preventDefault();
        if (pointermoveEvent.buttons ^ 1) {
            document.body.style.setProperty("cursor","auto"); 
            document.removeEventListener('pointermove', mouseDragHandler);
            //iframestyle.style.pointerEvents="auto"; //v1
            //var oldprop= getCSSRule('iframe').style.pointerEvents; //richiede test //v2
            //getCSSRule('iframe').style.pointerEvents="auto"; //v1
            getCSSRule('iframe').style.pointerEvents=oldIframePointer;
            inDragging=false;
            return;
        }

        let vpw=document.documentElement.clientWidth;
        let pointerX=pointermoveEvent.clientX;

        //let absNewWidth = vpw-pointerX;
        let relNewWidth = ((vpw-pointerX)/vpw)*100;
        
        // getColumnElement().style.setProperty("--column-width",relNewWidth.toString(10)+"vw"); //old one, quando basato su flexxboxes
        document.documentElement.style.setProperty("--column-width",relNewWidth.toString(10)+"vw");
    };
    
    document.body.style.setProperty("cursor","ew-resize");
    getCSSRule('iframe').style.pointerEvents="none"; /*recupera questo oggetto fresco fresco*/
    document.addEventListener('pointermove', mouseDragHandler);
};


///remoteJS--function
function createVideoIframeNode(chid){
    let videoiframe = document.createElement('iframe');
    videoiframe.setAttribute("id","content");
    videoiframe.setAttribute("src",ruscellodata.canali[chid].srcurl);
    videoiframe.setAttribute("webkitallowfullscreen","");
    videoiframe.setAttribute("allowfullscreen","true");
    videoiframe.setAttribute("frameborder","no");
    return videoiframe;
}
function createVideoNode(chid){ //per ora è fatto statico e in culo
    let newvideonode = document.createElement('video');
    newvideonode.setAttribute("id","content");
    newvideonode.setAttribute("autoplay","");
    newvideonode.setAttribute("controls","");
    newvideonode.setAttribute("crossorigin","anonymous");
    newvideonode.setAttribute("muted","");

    let sourceVideoNode = document.createElement("source");
    sourceVideoNode.setAttribute("src", ruscellodata.canali[chid].srcurl);
    sourceVideoNode.setAttribute("type", "video/mp4");

    newvideonode.appendChild(sourceVideoNode);

    return newvideonode;
}
function paintVideoFrame(chid,event){
    console.log("Called: paintVideoFrame with argument chid:"+chid);
    let contenitoreElement = document.getElementById('videoContainer');

    //let nelements = contenitoreElement.childElementCount; //should be 1 or zero only once, the first time

    while(contenitoreElement.childElementCount) contenitoreElement.removeChild(contenitoreElement.children.item(0)); //wippa tutti i children just in case

    switch( ruscellodata.canali[chid].rendermode){
        case "video":
            contenitoreElement.appendChild(createVideoNode(chid));
            break;

        case "iframe":
            contenitoreElement.appendChild(createVideoIframeNode(chid));
            break;

        case "raw":
        case "rawhtml":
        case "html":
            let videoDiv = document.createElement('div');
            videoDiv.setAttribute("style","background-color: black; position: relative; width: 100%; height: 100%; padding-bottom 56.25%;"); 
            videoDiv.innerHTML=ruscellodata.canali[chid].rawhtml;
            contenitoreElement.appendChild(videoDiv);
            break;
        
        default:
            console.log("ERROR : chid:"+chid+"\n"+ruscellodata.canali[chid]+"\n rendermode: "+ruscellodata.canali[chid].rendermode);
    }
}
function addButtonToRemote(chid){
    let buttonElement = document.createElement("img");

    buttonElement.setAttribute("class","remoteImgButton");
    buttonElement.setAttribute("role","button");
    buttonElement.setAttribute("src",ruscellodata.canali[chid]["iconpath"]);
    buttonElement.setAttribute("draggable","false");
    buttonElement.setAttribute("title",ruscellodata.canali[chid]["titlestr"]);
    buttonElement.setAttribute("alt",ruscellodata.canali[chid]["altstr"]);
    buttonElement.setAttribute("onclick","void(0);"); //non sono sicuro voler mettere sta cosa

    document.getElementById('remoteDiv').appendChild(buttonElement);

    buttonElement.addEventListener("click", (event)=>{paintVideoFrame(chid,event);} ); //addEventListener vuole come secondo argomento una funzione che abbia come argomento l'evento scatenante. QUESTA FUNZIONE è la lambda, dentro la lambda richiamo cioè che voglio, la lambda funge da wrapper
    buttonElement.addEventListener("dragstart", (e)=>e.preventDefault() ); //precedentemente dragnull() definito in controls.js
}









///detatchChatJS--init
document.getElementById('dbgPOP').addEventListener("click",commuteChatPopOut);

///keycontrolJS
document.addEventListener('keydown', keyControlHandler);
try{
    document.getElementById('content').contentDocument.documentElement.getElementsByTagName('body').item(0).addEventListener('keydown', keyControlHandler);
}catch(exception){
    console.log("catched:"+exception);
}


///resizeJS
getHandleElement().addEventListener('mousedown', startDraggingHandler);

///remoteJS
var ncanali = Object.keys(ruscellodata.canali).length;
for(var i=0;i<ncanali;i++) addButtonToRemote(i);