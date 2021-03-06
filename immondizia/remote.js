//import ruscellodata from "./ruscellodata.js"; //DISABLED FOR TEST

//import  ruscellodata from './ruscellodata.json'; //ES6/ES2015
// con import * as ruscellodata from '.ruscellodata.json'; si accede con ruscellodata.default
// Uncaught SyntaxError: import declarations may only appear at top level of a module


const ruscellodata = {
    "canali":[
        {   
            "nome":"Rai1",
            "altstr":"Rai1",
            "titlestr":"Rai1",
            "iconpath":"/res/icons/balloon.png",
            "srcurl":"https://1-edge1-eu-west.picarto.tv/mp4/canaleinbannabile.mp4?token=public&con=1574712198055",
            "rendermode":"video",
            "rawhtml":"EMPTY"
        },
        {   
            "nome":"Angel",
            "altstr":"Angel",
            "titlestr":"Angel",
            "iconpath":"/res/icons/telly.png",
            "srcurl":"https://player.angelthump.com/?channel=ruscello",
            "rendermode":"video",
            "rawhtml":"<div id=\"root\"></div><script type=\"8e1a47f55ae145ea0afa6f24-text/javascript\">(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-98637299-1', 'auto');ga('send', 'pageview');</script><script async src=\"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js\" type=\"8e1a47f55ae145ea0afa6f24-text/javascript\"></script><script src=\"main.04290a4ab4b655099b16.js\" type=\"8e1a47f55ae145ea0afa6f24-text/javascript\"></script><script src=\"https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js\" data-cf-settings=\"8e1a47f55ae145ea0afa6f24-|49\" defer=\"\"></script>" 
        },
        {   
            "nome":"Angel",
            "altstr":"Angel",
            "titlestr":"Angel",
            "iconpath":"/res/icons/telly.png",
            "srcurl":"https://player.angelthump.com/?channel=ruscello",
            "rendermode":"iframe",
            "rawhtml":"<div id=\"root\"></div><script type=\"8e1a47f55ae145ea0afa6f24-text/javascript\">(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-98637299-1', 'auto');ga('send', 'pageview');</script><script async src=\"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js\" type=\"8e1a47f55ae145ea0afa6f24-text/javascript\"></script><script src=\"main.04290a4ab4b655099b16.js\" type=\"8e1a47f55ae145ea0afa6f24-text/javascript\"></script><script src=\"https://ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js\" data-cf-settings=\"8e1a47f55ae145ea0afa6f24-|49\" defer=\"\"></script>" 
        },
        {   
            "nome":"Vince",
            "altstr":"Vince",
            "titlestr":"Vince",
            "iconpath":"/res/icons/help.png",
            "srcurl":"https://vaughn.live/embed/video/micchan",
            "rendermode":"video",
            "rawhtml":"EMPTY"        
        },
        {   
            "nome":"deepfulVideo",
            "altstr":"deepfulVideo",
            "titlestr":"deepfulVideo",
            "iconpath":"/res/icons/ufo_40.png",
            "srcurl":"https://1-edge1-eu-west.picarto.tv/mp4/deepandsoulful.mp4?token=public&con=1606125864088",
            "rendermode":"video",
            "rawhtml":"EMPTY"
        },
        {   
            "nome":"deepfulFrame",
            "altstr":"deepfulFrame",
            "titlestr":"deepfulFrame",
            "iconpath":"/res/icons/nuculare.png",
            "srcurl":"https://1-edge1-eu-west.picarto.tv/mp4/deepandsoulful.mp4?token=public&con=1606125864088",
            "rendermode":"iframe",
            "rawhtml":"EMPTY"
        }
    ]
}

function createVideoIframeNode(chid){
    let videoiframe = document.createElement('iframe');
    videoiframe.setAttribute("id","content");
    videoiframe.setAttribute("src",ruscellodata.canali[chid].srcurl);
    videoiframe.setAttribute("webkitallowfullscreen","");
    videoiframe.setAttribute("allowfullscreen","true");
    videoiframe.setAttribute("frameborder","no");
    videoiframe.setAttribute("height","100vh");
    videoiframe.setAttribute("width","-moz-available");
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
    let contenitoreElement = document.getElementById('contenitore');

    //wippa tutti i children just in case
    let nelements = contenitoreElement.childElementCount; //should be 1 or zero only once, the first time

    while(contenitoreElement.childElementCount) contenitoreElement.removeChild(contenitoreElement.children.item(0)); //va?

    switch( ruscellodata.canali[chid].rendermode){
        case "video":
            contenitoreElement.appendChild(createVideoNode(chid));
            break;

        case "iframe":
            contenitoreElement.appendChild(createVideoIframeNode(chid));
            break;

        case "raw":
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

    document.getElementById('remote').appendChild(buttonElement);

    //chid=777;

    buttonElement.addEventListener("click", (event)=>{paintVideoFrame(chid,event);} ); //addEventListener vuole come secondo argomento una funzione che abbia come argomento l'evento scatenante. QUESTA FUNZIONE è la lambda, dentro la lambda richiamo cioè che voglio, la lambda funge da wrapper
    buttonElement.addEventListener("dragstart", (e)=>e.preventDefault() ); //precedentemente dragnull() definito in controls.js

}

var ncanali = Object.keys(ruscellodata.canali).length;
for(var i=0;i<ncanali;i++) addButtonToRemote(i);
