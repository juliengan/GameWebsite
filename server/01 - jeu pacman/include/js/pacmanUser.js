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
 * Gestion du pacman
 * 
 * @param {[type]} game [description]
 * @param {[type]} map  [description]
 */
Pacman.User = function (game, map)
{
    // propriétés du pacman
    var position  = null,
        direction = null,
        eaten     = null,
        due       = null, 
        lives     = null,
        score     = 5,
        keyMap    = {};
    
    // le déplacement en fonction des touches directionnelles
    keyMap[KEY.ARROW_LEFT]  = LEFT;
    keyMap[KEY.ARROW_UP]    = UP;
    keyMap[KEY.ARROW_RIGHT] = RIGHT;
    keyMap[KEY.ARROW_DOWN]  = DOWN;


    /**
     * Mise à jour du score
     * @param {[type]} nScore [description]
     */
    function addScore(nScore)
    { 
        score += nScore;
        if (score >= 10000 && score - nScore < 10000)
            lives += 1;
    };


    /**
     * Renvoie le score actuel
     * @return {[type]} [description]
     */
    function theScore() 
    { 
        return score;
    };


    /**
     * le joueur a perdu une vie
     * 
     * @return {[type]} [description]
     */
    function loseLife() 
    { 
        lives -= 1;
    };


    /**
     * Affiche le nombre de vie du joueur
     * 
     * @return {[type]} [description]
     */
    function getLives()
    {
        return lives;
    };


    /**
     * Début d'un nouveau niveau
     * Init des valeurs du joueur
     * 
     * @return {[type]} [description]
     */
    function initUser() 
    {
        score = 0;
        lives = 3;
        newLevel();
    }
    

    /**
     * Lancement d'un nouveau niveau
     * 
     * @return {[type]} [description]
     */
    function newLevel() 
    {
        resetPosition();
        eaten = 0;
    };
    

    /**
     * Remise à zéro de la position du joueur
     * 
     * @return {[type]} [description]
     */
    function resetPosition() 
    {
        position = {"x": 90, "y": 120};
        direction = LEFT;
        due = LEFT;
    };
    
    function reset()
    {
        initUser();
        resetPosition();
    };        
    

    /**
     * Touche pressée par le joueur
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    function keyDown(e)
    {
        // si c'est une touche non gérée par le jeu
        if (typeof keyMap[e.keyCode] !== "undefined")
        { 
            due = keyMap[e.keyCode];
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        return true;
	};


    /**
     * renvoie la nouvelle position du joueur
     * 
     * @param  {[type]} dir     [description]
     * @param  {[type]} current [description]
     * @return {[type]}         [description]
     */
    function getNewCoord(dir, current) 
    {   
        return {
            "x": current.x + (dir === LEFT && -2 || dir === RIGHT && 2 || 0),
            "y": current.y + (dir === DOWN && 2 || dir === UP    && -2 || 0)
        };
    };


    function onWholeSquare(x) 
    {
        return x % 10 === 0;
    };


    function pointToCoord(x)
    {
        return Math.round(x/10);
    };
    

    function nextSquare(x, dir) 
    {
        var rem = x % 10;

        if (rem === 0) 
            return x; 
        else if (dir === RIGHT || dir === DOWN)
            return x + (10 - rem);
        else 
            return x - rem;
    };


    function next(pos, dir) 
    {
        return {
            "y" : pointToCoord(nextSquare(pos.y, dir)),
            "x" : pointToCoord(nextSquare(pos.x, dir)),
        };                               
    };


    function onGridSquare(pos) 
    {
        return onWholeSquare(pos.y) && onWholeSquare(pos.x);
    };


    function isOnSamePlane(due, dir) 
    { 
        return ((due === LEFT || due === RIGHT) && 
                (dir === LEFT || dir === RIGHT)) || 
            ((due === UP || due === DOWN) && 
             (dir === UP || dir === DOWN));
    };


    /**
     * Déplacement du joueur
     * 
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    function move(ctx) 
    {
        var npos        = null, 
            nextWhole   = null, 
            oldPosition = position,
            block       = null;
        
        if (due !== direction) 
        {
            npos = getNewCoord(due, position);
            
            if ( isOnSamePlane(due, direction) || 
                ( onGridSquare(position) && map.isFloorSpace(next(npos, due) ) ) 
                )
                direction = due;
            else
                npos = null;
        }

        if (npos === null) 
            npos = getNewCoord(direction, position);

        if (onGridSquare(position) && map.isWallSpace(next(npos, direction)))
            direction = NONE;

        if (direction === NONE)
            return {"new" : position, "old" : position};
   
        if (npos.y === 100 && npos.x >= 190 && direction === RIGHT)
            npos = {"y": 100, "x": -10};

        if (npos.y === 100 && npos.x <= -12 && direction === LEFT)
            npos = {"y": 100, "x": 190};
     
        position = npos;        
        nextWhole = next(position, direction);
        
        block = map.block(nextWhole);        
        
        if ((isMidSquare(position.y) || isMidSquare(position.x)) &&
            block === Pacman.BISCUIT || block === Pacman.PILL) 
        {
            map.setBlock(nextWhole, Pacman.EMPTY);           
            addScore((block === Pacman.BISCUIT) ? 10 : 50);
            eaten += 1;
            
            if (eaten === 182) 
                game.completedLevel();
            
            if (block === Pacman.PILL) 
                game.eatenPill();
        }   
                
        return {
            "new" : position,
            "old" : oldPosition
        };
    };


    function isMidSquare(x) 
    { 
        var rem = x % 10;
        return rem > 3 || rem < 7;
    };


    function calcAngle(dir, pos) 
    { 
        if (dir == RIGHT && (pos.x % 10 < 5)) 
            return {"start":0.25, "end":1.75, "direction": false};
        else if (dir === DOWN && (pos.y % 10 < 5)) 
            return {"start":0.75, "end":2.25, "direction": false};
        else if (dir === UP && (pos.y % 10 < 5)) 
            return {"start":1.25, "end":1.75, "direction": true};
        else if (dir === LEFT && (pos.x % 10 < 5))             
            return {"start":0.75, "end":1.25, "direction": true};

        return {"start":0, "end":2, "direction": false};
    };


    /**
     * Le joueur est mort
     * Ajout du graphisme
     * 
     * @param  {[type]} ctx    [description]
     * @param  {[type]} amount [description]
     * @return {[type]}        [description]
     */
    function drawDead(ctx, amount) 
    { 
        var size = map.blockSize, 
            half = size / 2;

        if (amount >= 1) 
            return;

        ctx.fillStyle = "#FFFF00";
        ctx.beginPath();        
        ctx.moveTo(((position.x/10) * size) + half, 
                   ((position.y/10) * size) + half);
        
        ctx.arc(((position.x/10) * size) + half, 
                ((position.y/10) * size) + half,
                half, 0, Math.PI * 2 * amount, true); 
        
        ctx.fill();    
    };


    function draw(ctx) 
    { 
        var s     = map.blockSize, 
            angle = calcAngle(direction, position);

        ctx.fillStyle = "#FFFF00";

        ctx.beginPath();        

        ctx.moveTo(((position.x/10) * s) + s / 2,
                   ((position.y/10) * s) + s / 2);
        
        ctx.arc(((position.x/10) * s) + s / 2,
                ((position.y/10) * s) + s / 2,
                s / 2, Math.PI * angle.start, 
                Math.PI * angle.end, angle.direction); 
        
        ctx.fill();    
    };
    
    initUser();// préparation du joueur

    // renvoie les méthodes publiques de la classe du joueur
    return {
        "draw"          : draw,
        "drawDead"      : drawDead,
        "loseLife"      : loseLife,
        "getLives"      : getLives,
        "score"         : score,
        "addScore"      : addScore,
        "theScore"      : theScore,
        "keyDown"       : keyDown,
        "move"          : move,
        "newLevel"      : newLevel,
        "reset"         : reset,
        "resetPosition" : resetPosition
    };

};// fin classe User
