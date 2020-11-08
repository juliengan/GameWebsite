/**

  The Initial Developer of the Original Code is
  Matthieu  - http://www.programmation-facile.com/
  Portions created by the Initial Developer are Copyright (C) 2013
  the Initial Developer. All Rights Reserved.
 
  Contributor(s) :

 */


/**
 * Code source : 
 * https://github.com/daleharvey/pacman
 * 
 */




/**
 * Gestion du son pendant le jeu
 * 
 * @param {[type]} game [description]
 */
Pacman.Audio = function(game) 
{
    // les propriétés de la classe
    var files          = [], 
        endEvents      = [],
        progressEvents = [],
        playing        = [];
  

    /**
     * Chargement des fichiers audio
     * 
     * @param  {[type]}   name [description]
     * @param  {[type]}   path [description]
     * @param  {Function} cb   [description]
     * @return {[type]}        [description]
     */
    function load(name, path, cb)
    { 
        var f = files[name] = document.createElement("audio");

        progressEvents[name] = function(event) { progress(event, name, cb); };
        
        f.addEventListener("canplaythrough", progressEvents[name], true);
        f.setAttribute("preload", "true");
        f.setAttribute("autobuffer", "true");
        f.setAttribute("src", path);
        f.pause();        
    };


    /**
     * Gestion de la progression du chargement
     * 
     * @param  {[type]}   event    [description]
     * @param  {[type]}   name     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    function progress(event, name, callback)
    { 
        if (event.loaded === event.total && typeof callback === "function") 
        {
            callback();
            files[name].removeEventListener("canplaythrough", 
                                            progressEvents[name], true);
        }
    };


    /**
     * Désactive le son pendant le jeu
     * 
     * @return {[type]} [description]
     */
    function disableSound() 
    {
        for (var i = 0; i < playing.length; i++)
        {
            files[playing[i]].pause();
            files[playing[i]].currentTime = 0;
        }

        playing = [];
    };


    /**
     * Arrêt de la lecture d'un son
     * 
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    function ended(name) 
    { 
        var i, tmp = [], found = false;

        files[name].removeEventListener("ended", endEvents[name], true);

        for (i = 0; i < playing.length; i++) 
        {
            if (!found && playing[i])
                found = true;
            else
                tmp.push(playing[i]);
        }

        playing = tmp;
    };


    /**
     * Lecture d'un son
     * 
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    function play(name)
    { 
        if (!game.soundDisabled())
        {
            endEvents[name] = function() { ended(name); };
            playing.push(name);

            files[name].addEventListener("ended", endEvents[name], true);
            files[name].play();
        }
    };


    /**
     * Mets en pause les sons en cours de lecture
     * 
     * @return {[type]} [description]
     */
    function pause()
    { 
        for (var i = 0; i < playing.length; i++) 
        {
            files[playing[i]].pause();
        }
    };
    

    /**
     * Reprise de la lecture pour les sons en pause
     * 
     * @return {[type]} [description]
     */
    function resume()
    { 
        for (var i = 0; i < playing.length; i++) 
        {
            files[playing[i]].play();
        }        
    };
    

    // renvoie les méthodes de la classe
    return{
        "disableSound" : disableSound,
        "load"         : load,
        "play"         : play,
        "pause"        : pause,
        "resume"       : resume
    };

};// fin classe Audio

