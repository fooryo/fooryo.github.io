//https://jsfiddle.net/x9o7y561/

/*  dato il padre di contentFrame e columnFrame flexfox credo di voler riempire automaticamente
 *  parte sinistra della pagina, quindi contentFrame, con una logica del tipo riempi da sinistra verso destra
 *  finquando c'è spazio, realizzabile spostando 
*/

//larghezza_assoluta=viewport_assoluta-coordX_rispetto-viewport
/* https://ryanve.com/lab/dimensions/*/


/*
    IL PROBLEMA DEL RESIZE CHE SI BLOCCA E DELL'IFRAMES NELL'INDEX.HTML
    
    gli iframe sono quasi a tutto per tutto delle pagine embeddate, come una piccola finestra di un'altra istanza browser,
    per tanto document.addEventListener() su index html non inserisce il listener (parlo anche di pointermove) dentro gli iframe
    il trick che ho trovato si basa su una proprietà CSS da applicare ai miei iframe
    iframe{ pointer-events:none } richiamato da JS come variabile chiamata pointerEvents (.style.pointerEvents)
    all'inizio della procedura di dragging setto questa proprietà CSS a none, quando termino resetto a auto.

    un problema simile si è verificato con il capture di tasti premuti, ie nel caso di H per nascondere la colonna
*/


function getColumnElement() { return document.getElementById('columnFrame');    };
function getHandleElement() { return document.getElementById('verticalHandle'); };

const columnElement = document.getElementById("columnFrame"); /*ma const in questo contesto cosa significa? posso modificare le propeità? */
const handleElement = document.getElementById("verticalHandle");

let inDragging = false;

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

//let iframestyle=getCSSRule('iframe'); //credo sia linea obsoleta

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
        
        getColumnElement().style.setProperty("--column-width",relNewWidth.toString(10)+"vw");
    };
    
    document.body.style.setProperty("cursor","ew-resize");
    //iframestyle.style.pointerEvents="none"; //v1
    getCSSRule('iframe').style.pointerEvents="none"; /*recupera questo oggetto fresco fresco*/
    //getCSSRule('iframe').style.pointerEvents=oldprop; //richiede test //credo sia errato
    //document.addEventListener('pointermove', mouseDragHandler); //???
    document.addEventListener('pointermove', mouseDragHandler);
};

getHandleElement().addEventListener('mousedown', startDraggingHandler);