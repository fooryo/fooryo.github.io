## Aggiungere canali al remote
Edit ruscellodata Object in engine.js
```
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
        }
    ]//canali
}//ruscellodata

```
```
    possibili rendermode:
        video : imposta srcurl come src in un elemento <video>
        iframe : imposta src url come ???______???
        raw : inserisce codice html dalla variabile rawhtml nell'elemento del video (? non sono sicuro, rivedere il codice javascript)

        forse che rawhtml doveva essere anche un elemento di fallback in caso di problemi [forse neanche implementato]

        defuct streaming services:
            vaughn.live

        NOTES
            hls video ha bisogno di un player apposito tipo video.js o hls.js
            https://github.com/video-dev/hls.js/
            //TODO: mostrare fading popup che dice "per tornare premi H", penso quando si fa collassare la chat
```