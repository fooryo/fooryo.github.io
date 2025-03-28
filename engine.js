/*
    possibili rendermode:
        video : imposta srcurl come src in un elemento <video>
        iframe : imposta src url come ???______???
        raw : inserisce codice html dalla variabile rawhtml nell'elemento del video (? non sono sicuro, rivedere il codice javascript)

        forse che rawhtml doveva essere anche un elemento di fallback in caso di problemi [forse neanche implementato]

        defuct streaming services:
            vaughn.live
            picarto.tv (doenst allow cinema)

        NOTES
            hls video ha bisogno di un player apposito tipo video.js o hls.js
            https://github.com/video-dev/hls.js/
            //TODO: mostrare fading popup che dice "per tornare premi H", penso quando si fa collassare la chat
*/

var dpif = getDpiFunctions();
var dpi = dpif.dpi();

const ruscellodata = {
    "canali":[
        //{   //trailer.mp4
        //    "nome":"TestTrailer",
        //    "altstr":"TestTrailer",
        //    "titlestr":"TestTrailer",
        //    "iconpath":"/res/icons/balloon.png",
        //    "srcurl":"trailer.mp4",
        //    "rendermode":"video",
        //    "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chi is _EMPTY_"
        //},
        {   //ruscello angelthump iframe
            "nome":"RuscelloCinema_iframe",
            "altstr":"RuscelloCinema_iframe",
            "titlestr":"RuscelloCinema_iframe",
            "iconpath":"/res/icons/film.png",
            "srcurl":"https://player.angelthump.com/?channel=ruscello",
            "rendermode":"iframe",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chid is _EMPTY_"
        },
        {
            "nome":"mediamtx_nome",
            "altstr":"mediamtx_altstr",
            "titlestr":"mediamtx_titlestr",
            "iconpath":"/res/icons/help.png",
            "srcurl":"https://hls.xi.fooryo.top/ruscello",
            "rendermode":"iframe",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chi is _EMPTY_"
        },{   //WindowsMovieHouse AngelThump iframe
            "nome":"AngelThump_iframe",
            "altstr":"AngelThump_iframe",
            "titlestr":"AngelThump_iframe",
            "iconpath":"/res/icons/white_isaac.png",
            "srcurl":"https://player.angelthump.com/?channel=windowsmoviehouse",
            "rendermode":"iframe",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chid is _EMPTY_"
        }
    ]
}

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

    
    //dis is chiacchiere -> //let chatInnerHTML ="{\"handle\":\"chiacchiere\",\"arch\":\"js\",\"styles\":{\"a\":\"000000\",\"b\":100,\"c\":\"c0c0c0\",\"d\":\"a0a0a0\",\"e\":\"000000\",\"g\":\"e0e0e0\",\"h\":\"606060\",\"j\":\"ffffff\",\"k\":\"336666\",\"l\":\"404040\",\"m\":\"000000\",\"n\":\"FFFFFF\",\"p\":\"10\",\"q\":\"000000\",\"r\":100,\"usricon\":0,\"allowpm\":0,\"cnrs\":\"0.38\"}}";
    //dis is test purpose -> //let chatInnerHTML ="{\"handle\":\"fooryoembed\",\"arch\":\"js\",\"styles\":{\"a\":\"000000\",\"b\":100,\"c\":\"c0c0c0\",\"d\":\"a0a0a0\",\"e\":\"000000\",\"g\":\"e0e0e0\",\"h\":\"606060\",\"j\":\"ffffff\",\"k\":\"336666\",\"l\":\"404040\",\"m\":\"000000\",\"n\":\"FFFFFF\",\"p\":\"10\",\"q\":\"000000\",\"r\":100,\"usricon\":0,\"allowpm\":0,\"cnrs\":\"0.38\"}}";
    let chatInnerHTML ="{\"handle\":\"niuscello\",\"arch\":\"js\",\"styles\":{\"a\":\"000000\",\"b\":100,\"c\":\"c0c0c0\",\"d\":\"a0a0a0\",\"e\":\"000000\",\"g\":\"e0e0e0\",\"h\":\"363636\",\"j\":\"ffffff\",\"k\":\"141414\",\"l\":\"404040\",\"m\":\"000000\",\"n\":\"c0c0c0\",\"p\":\"9\",\"q\":\"000000\",\"r\":100,\"usricon\":0,\"allowpm\":0,\"cnrs\":\"0.38\"}}";


    newElem.setAttribute("class","chatte");
    //newElem.setAttribute("id","cid0020000265869400948");//foortest
    newElem.setAttribute("id","cid0020000305359219210"); //chiacchiere no more. niuscello nao
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
        hideColumn();
    }else{
        chatOuted=false;
        reattachChatFrame();
        extChatWindowHandle.close();
        showColumn();
    }
}
function receiveExitToParentWindow(test){
    //console.log("received Exit with test:"+test+"and ");
    //if(extChatWindowHandle.closed) reattachChatFrame(); //<-- non funziona bene sta cosa. mi ritorna false sempre, poi lo faccio a mano nella console e mi torna true, come se la scrittura della variabile sia async
    //console.log("extChatWH.closed "+extChatWindowHandle.closed);
    if(test==0) commuteChatPopOut()//reattachChatFrame(); //alla fine quelle chiamate "spurie" con il '2' erano quelle problematiche
    else{console.log("what the fuck: receiveExitToParentWindow with value "+test+" and closed: "+extChatWindowHandle.closed);}
}

var default_widescreen_row_config = dpi && dpi<200 ? "4vh auto 4vh" : "4vh auto 0vh" 

function hideColumn(){
    document.documentElement.style.setProperty("--widescreen-cols-config","100vw");
    document.documentElement.style.setProperty("--widescreen-rows-config","100vh");
    columnHidden=true;
}
function showColumn(){
    document.documentElement.style.setProperty("--widescreen-cols-config", document.documentElement.style.getPropertyValue("--default-widescreen-cols-config"));
    document.documentElement.style.setProperty("--widescreen-rows-config",
        //document.documentElement.style.getPropertyValue("--default-widescreen-rows-config") //precedentemente andavo a rpednere il valore di default da riprestinare da una variabile css readonly
        //ma questo non va più bene perchè il default value adesso dipende se portrait/landscape in monitor/smartphone quindi come bypass ho messo il default value in una variavile var di javascript
        default_widescreen_row_config
        );
    columnHidden=false;
}

function commuteColumnHide(){
    if(!columnHidden){
        document.getElementById('showChatButton').style.display="block";
        hideColumn();
    }else{
        showColumn();
        dpi && dpi<200 ? document.getElementById('showChatButton').style.display="none" : null;
    }
}

///keycontrolJS--function
function keyControlHandler(keydownEvent){
    //keydownEvent.preventDefault(); //SE LASCIO QUESTO NON COMMENTATO MANCO LA CONSOLE CON F12 POSSO APRIRE, FARE ATTENZIONE
    if (keydownEvent.isComposing || keydownEvent.keyCode === 229)  return;
    //if (keydownEvent.isComposing || keydownEvent.keyCode === 229 || keydownEvent.repeat)  return;
    if (keydownEvent.repeat) return; //andare a vedere il perchè di questo che non me lo ricordo //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat

    switch(keydownEvent.keyCode){
        case 72: //char Hh
            commuteColumnHide();
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
    try{
        newvideonode.addEventListener('keydown', keyControlHandler);//TODO : test : non funziona su angelthump che ha delle tipo protezioni
    }catch(exception){
        console.log("tryed to addEventListener so newvideonode in createVideoNode");
    }

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


function getDpiFunctions() {   //c

    //se arg è null -> return m
    //else          -> se arg !== arg -> ritorna False
    //                 else           -> 
    function a(arg) { //-> return number | boolean | undefined
        return null == arg ? m : arg !== arg ? !1 : l ? l >= arg : 
        k(
            [   
                ["min--moz-device-pixel-ratio:", arg],
                ["min-resolution:", arg * d, "dpi"]
            ]
            ,j
        )
    }

    function b(b) { //-> return number | boolean | undefined
        return null == b ? a() * d : a(b / d)
    }

    function c(b) { //-> return number | boolean | undefined
        return null == b ? a() / e : a(b * e)
    }

    var d = 96,
    e = 2.54 / d,
    windowObj = "undefined" != typeof window && window,
    screenObj = "undefined" != typeof screen && screen,
    h = [].join,

    i = windowObj.matchMedia,

    j = i ? function() {
        return !!i.call(windowObj, "(" + h.call(arguments, "") + ")").matches
    } : function() {
        return !1
    },
    
    k = function(arrayArgs, b, c) {
        for (var i = 0, a_length = arrayArgs.length; a_length > i;)
            if (b.apply(c, arrayArgs[i++])) return !0;
        return !1
    },

    l = +windowObj.devicePixelRatio || Math.sqrt(screenObj.logicalXDPI * screenObj.logicalYDPI) / d || 0,
    
    m = l || !i ? l :   function(a) {
                            for (var b, c = 41; c-- && !a(b = c / 20););
                            return b
                        }(a);
    
    return {
        dppx: a,
        dpcm: c,
        dpi: b
    }
}



function triggAnimationByFlipClass(){
    let e = document.getElementById('showChatButton');
    e.classList.remove("showChatButtonClass")
    e.classList.add("showChatButtonClass")
}


if(dpi && dpi>200 ){
    document.getElementById('showChatButton').style.display="block";
    //document.getElementById('showChatButton').style.height="130px";

    document.getElementById('showChatButton').addEventListener("touchstart", triggAnimationByFlipClass, true);
}




///detatchChatJS--init
dpi && dpi<200 ? document.getElementById('ctrlPop').addEventListener("click",commuteChatPopOut) : !1 ;
dpi && dpi>200 ? document.getElementById('ctrlPop').style.display="none" : !1 ;

document.getElementById('ctrlHide').addEventListener("click",commuteColumnHide);
document.getElementById('showChatButton').addEventListener("click",commuteColumnHide);

///keycontrolJS--init
document.addEventListener('keydown', keyControlHandler);
try{
    document.getElementById('content').contentDocument.documentElement.getElementsByTagName('body').item(0).addEventListener('keydown', keyControlHandler);
}catch(exception){
    console.log("catched:"+exception);
}


///resizeJS--init
dpi && dpi<200 ? document.getElementById('verticalHandle').addEventListener('mousedown', startDraggingHandler) : !1 ;


dpi && dpi> 200 ? document.documentElement.style.setProperty('--widescreen-rows-config','4vh auto 0vh')
:null ; //TODO quando in mobile e riconoscere landscape nascondere la barra dei canali

///remoteJS--init
var ncanali = Object.keys(ruscellodata.canali).length;
for(var i=0;i<ncanali;i++) addButtonToRemote(i);


var dpidiv = document.createElement('div')
dpidiv.innerHTML="dpi:"+Math.trunc(dpif.dpi()*100)/100
dpidiv.innerHTML+="  ::  dppx:"+Math.trunc(dpif.dppx()*100)/100
dpidiv.innerHTML+="  ::  dpcm:"+Math.trunc(dpif.dpcm()*100)/100
dpidiv.setAttribute("style","color:white;font-size:70%")
document.getElementById('controlsDiv').prepend(dpidiv);
console.log(dpif.dpi())
console.log(dpif.dppx())
console.log(dpif.dpcm())

paintVideoFrame(0,()=>{})

