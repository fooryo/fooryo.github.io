//import ruscellodata from "./ruscellodata.js"; //DISABLED FOR TEST

//import  ruscellodata from './ruscellodata.json'; //ES6/ES2015
// con import * as ruscellodata from '.ruscellodata.json'; si accede con ruscellodata.default
// Uncaught SyntaxError: import declarations may only appear at top level of a module


const ruscellodata = {
    "canali":[
        {   
            "nome":"TestTrailer",
            "altstr":"TestTrailer",
            "titlestr":"TestTrailer",
            "iconpath":"/res/icons/balloon.png",
            "srcurl":"trailer.mp4",
            "rendermode":"video",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chi is _EMPTY_"
        },
        {   
            "nome":"RuscelloCinema_iframe",
            "altstr":"RuscelloCinema_iframe",
            "titlestr":"RuscelloCinema_iframe",
            "iconpath":"/res/icons/white_isaac.png",
            "srcurl":"https://player.angelthump.com/?channel=ruscello",
            "rendermode":"iframe",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chid is _EMPTY_"
        },
        {   
            "nome":"RuscelloCinema_rawhtml",
            "altstr":"RuscelloCinema_rawhtml",
            "titlestr":"RuscelloCinema_rawhtml",
            "iconpath":"/res/icons/pirate_isaac.png",
            "srcurl":"https://player.angelthump.com/?channel=ruscello",
            "rendermode":"rawhtml",
            "rawhtml":"<iframe style=\"position: absolute; top: 0; left: 0; height: 100% ; width: 100%;\" src=\"https://player.angelthump.com/?channel=ruscello\" webkitallowfullscreen=\"\" allowfullscreen=\"\" frameborder=\"no\"></iframe>"
        },
        {   
            "nome":"AngelThump_video",
            "altstr":"AngelThump_video",
            "titlestr":"AngelThump_video",
            "iconpath":"/res/icons/angel.png",
            "srcurl":"https://player.angelthump.com/?channel=windowsmoviehouse",
            "rendermode":"video",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chid is _EMPTY_"
        },
        {   
            "nome":"AngelThump_iframe",
            "altstr":"AngelThump_iframe",
            "titlestr":"AngelThump_iframe",
            "iconpath":"/res/icons/white_isaac.png",
            "srcurl":"https://player.angelthump.com/?channel=windowsmoviehouse",
            "rendermode":"iframe",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chid is _EMPTY_"
        },
        {   
            "nome":"AngelThump_rawhtml",
            "altstr":"AngelThump_rawhtml",
            "titlestr":"AngelThump_rawhtml",
            "iconpath":"/res/icons/pirate_isaac.png",
            "srcurl":"https://player.angelthump.com/?channel=windowsmoviehouse",
            "rendermode":"rawhtml",
            "rawhtml":"<iframe style=\"position: absolute; top: 0; left: 0; height: 100% ; width: 100%;\" src=\"https://player.angelthump.com/?channel=windowsmoviehouse\" webkitallowfullscreen=\"\" allowfullscreen=\"\" frameborder=\"no\"></iframe>"
        },
        {   
            "nome":"PicartoCanaleInbannabile",
            "altstr":"Rai1",
            "titlestr":"Rai1",
            "iconpath":"/res/icons/telly.png",
            "srcurl":"https://1-edge1-eu-west.picarto.tv/mp4/canaleinbannabile.mp4?token=public&con=1574712198055",
            "rendermode":"video",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chi is _EMPTY_"
        },
        {   
            "nome":"TheVidyaNetwork",
            "altstr":"TheVidyaNetwork",
            "titlestr":"TheVidyaNetwork",
            "iconpath":"/res/icons/pad.png",
            "rendermode":"video",
            "srcurl":"https://player.angelthump.com/?channel=thevidyanetwork",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chi is _EMPTY_"
        },
        {   
            "nome":"Vince",
            "altstr":"Vince",
            "titlestr":"Vince",
            "iconpath":"/res/icons/help.png",
            "srcurl":"https://vaughn.live/embed/video/micchan",
            "rendermode":"video",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chi is _EMPTY_"        
        },
        {   
            "nome":"deepfulVideo",
            "altstr":"deepfulVideo",
            "titlestr":"deepfulVideo",
            "iconpath":"/res/icons/ufo_40.png",
            "srcurl":"https://1-edge1-eu-west.picarto.tv/mp4/deepandsoulful.mp4?token=public&con=1606125864088",
            "rendermode":"video",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chi is _EMPTY_"
        },
        {   
            "nome":"deepfulFrame",
            "altstr":"deepfulFrame",
            "titlestr":"deepfulFrame",
            "iconpath":"/res/icons/ufo_40.png",
            "srcurl":"https://1-edge1-eu-west.picarto.tv/mp4/deepandsoulful.mp4?token=public&con=1606125864088",
            "rendermode":"iframe",
            "rawhtml":" RAW-HTML FIELD in ruscellodata.canali FOR THIS chi is _EMPTY_"
        }
    ]
}

/*
remote.js serve per gestire il cambio di video, in particolare il cambio di contenuto dentro il div #contenitore.

bottoni html magari richiamano funzioni tramite onclick=functione().remoteImgButton
NO. è stato appurato che è una brutta practice ed è meglio usare add event listener
*/


/* TODO: data la flessibilità dell'elemento html5 video con i source
            vorrei riscrivere la funzione createVideoNode in maniera più smart
            nel caso in cui vorrei usare la funzione dei subtitles integrata o cose del genere
            insomma, arricchire e rendere automatiico.
            magari faccio i field video e iframe per i canali controllando nella funzione
            la loro esistenza

    TODO: testare le fuznione createVideoNode
    TODO: appena sicuro eliminare sti htmlvideo fields che date le funzioni che ho fatto sono inutili
    TODO: appena sicuro  fare un video frame object e un iframe object
    TODO: finire di completare i canali deepful radio con il sorgente e provare, ricordare di dare icone diverse

*/



/* //credo che questo blocco sotto commento sia immondizia e posso cancellarlo
var videoiframe = document.createElement('iframe');
videoiframe.setAttribute("style","position: absolute; top: 0; left: 0; height: 100% ; width: 100%;border: 0 none transparent;");
videoiframe.setAttribute("src","");
videoiframe.setAttribute("webkitallowfullscreen","");
videoiframe.setAttribute("allowfullscreen","true");
videoiframe.setAttribute("frameborder","no");

*/



/* //questo blocco commenti mi serve solo per comodità: sono gli html del niuscello

<style>
body { margin: 0px;}
</style>
<div class="benis" style="background-color: black; position: relative; width: 100%; height: 100%; padding-bottom 56.25%;">
<iframe  style="position: absolute; top: 0; left: 0; height: 100% ; width: 100%;" src="https://1-edge1-eu-west.picarto.tv/mp4/canaleinbannabile.mp4?token=public&con=1574712198055" style="border: 0 none transparent;" webkitallowfullscreen allowfullscreen allowfullscreen="true" frameborder="no">
</iframe>
</div>

<style>
body { margin: 0px;}
</style>
<div class="benis" style="background-color: black; position: relative; width: 100%; height: 100%; padding-bottom 56.25%;">
<iframe  style="position: absolute; top: 0; left: 0; height: 100% ; width: 100%;" src="https://player.angelthump.com/?channel=ruscello" style="border: 0 none transparent;" webkitallowfullscreen allowfullscreen allowfullscreen="true" frameborder="no">
</iframe>
</div>

<style>
body { margin: 0px;}
</style>
<div class="benis" style="background-color: black; position: relative; width: 100%; height: 100%; padding-bottom 56.25%;">
<iframe  style="position: absolute; top: 0; left: 0; height: 100% ; width: 100%;" src="https://vaughn.live/embed/video/micchan" style="border: 0 none transparent;" webkitallowfullscreen allowfullscreen allowfullscreen="true" frameborder="no">
</iframe>
</div>
*/




/* //questa funzione create un Div con dentro un iframe. in modalità portrait fa casino a causa del CSS. creata function createVideoIframeNode() temmporaneamente che altrimenti dovrei modificare il css
function createVideoDivIframeNode(chid){
    let videoDiv = document.createElement('div');
    videoDiv.setAttribute("style","background-color: black; position: relative; width: 100%; height: 100%; padding-bottom 56.25%;");

    let videoiframe = document.createElement('iframe');
    videoiframe.setAttribute("id","content");
    videoiframe.setAttribute("style","position: absolute; top: 0; left: 0; height: 100% ; width: 100%;border: 0 none transparent;");
    videoiframe.setAttribute("src",ruscellodata.canali[chid].srcurl);
    videoiframe.setAttribute("webkitallowfullscreen","");
    videoiframe.setAttribute("allowfullscreen","true");
    videoiframe.setAttribute("frameborder","no");

    videoDiv.appendChild(videoiframe);
    return videoDiv;
}
*/

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
    //var test = chid; // a che serve sta linea?
    console.log("Called: paintVideoFrame with argument chid:"+chid);
    let contenitoreElement = document.getElementById('videoContainer');

    //wippa tutti i children just in case
    let nelements = contenitoreElement.childElementCount; //should be 1 or zero only once, the first time

    while(contenitoreElement.childElementCount) contenitoreElement.removeChild(contenitoreElement.children.item(0)); //va?
    /*
    for( let i=0; i<nelements; i++) contenitoreElement.children.item(i)
    
    if( nelements > 0 ) contenitoreElement.childNodes.forEach( contenitoreElement.removeChild ); //TODO: aggiungere nel caso in cui non ci sono child da deletare
    else if( nelements == 0 ) console.log("Called: paintVideoFrame with \nchid : "+chid+"\n event : "+event+"\n without elemets to delete");
    else console.log("WTF:Called: paintVideoFrame with \nchid : "+chid+"\n event : "+event+"\n without elemets to delete");
    */
    //modalità bovina
    //contenitoreElement.innerHTML=ruscellodata.canali[chid].htmlvideo;


    //contenitoreElement.appendChild(createVideoDivIframeNode(chid));
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
    


    /*
    videoDiv.appendChild(videoiframe);
    contenitoreElement.appendChild(videoDiv);
    */


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

    //chid=777;

    buttonElement.addEventListener("click", (event)=>{paintVideoFrame(chid,event);} ); //addEventListener vuole come secondo argomento una funzione che abbia come argomento l'evento scatenante. QUESTA FUNZIONE è la lambda, dentro la lambda richiamo cioè che voglio, la lambda funge da wrapper
    buttonElement.addEventListener("dragstart", (e)=>e.preventDefault() ); //precedentemente dragnull() definito in controls.js

}

var ncanali = Object.keys(ruscellodata.canali).length;
for(var i=0;i<ncanali;i++) addButtonToRemote(i);

//document.getElementById()

/*
var ncanali = Object.keys(ruscellodata.canali).length;
for(i=0;i<ncanali;i++){

document.getElementById(ruscellodata.canali.idtag[i].addEventListener("click",(i)=>{paintVideoFrame(i);})));
}

//for i in canali
//  creaBottone
//  rendilo non draggabile
//  appizzaci il listener

*/