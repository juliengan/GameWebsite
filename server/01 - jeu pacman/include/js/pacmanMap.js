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
 * Gestion de la carte du jeu
 * le niveau en cours
 * 
 * @param {[type]} size [description]
 */
Pacman.Map = function (size) 
{
    // les propriétés de la classe
    var height    = null, 
        width     = null, 
        blockSize = size,
        pillSize  = 0,
        map       = null;
    

    function withinBounds(y, x) 
    {
        return y >= 0 && y < height && x >= 0 && x < width;
    }
    

    /**
     * Est ce qu'il y a un mur à cette position ?
     * 
     * @param  {[type]}  pos [description]
     * @return {Boolean}     [description]
     */
    function isWall(pos) 
    {
        return withinBounds(pos.y, pos.x) && map[pos.y][pos.x] === Pacman.WALL;
    }
    

    function isFloorSpace(pos) 
    {
        if (!withinBounds(pos.y, pos.x))
            return false;

        var peice = map[pos.y][pos.x];

        return peice === Pacman.EMPTY || 
            peice === Pacman.BISCUIT ||
            peice === Pacman.PILL;
    }
    

    /**
     * Dessine un mur
     * 
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    function drawWall(ctx) 
    {
        var i, j, p, line;
        
        ctx.strokeStyle = "#0000FF";
        ctx.lineWidth   = 5;
        ctx.lineCap     = "round";
        
        for (i = 0; i < Pacman.WALLS.length; i += 1) 
        {
            line = Pacman.WALLS[i];
            ctx.beginPath();

            for (j = 0; j < line.length; j += 1) 
            {
                p = line[j];
                
                if (p.move)
                    ctx.moveTo(p.move[0] * blockSize, p.move[1] * blockSize);
                else if (p.line)
                    ctx.lineTo(p.line[0] * blockSize, p.line[1] * blockSize);
                else if (p.curve)
                    ctx.quadraticCurveTo(p.curve[0] * blockSize, 
                                         p.curve[1] * blockSize,
                                         p.curve[2] * blockSize, 
                                         p.curve[3] * blockSize);   
            }
            ctx.stroke();
        }
    }
    

    /**
     * Remise à zéro de la carte
     * 
     * @return {[type]} [description]
     */
    function reset() 
    {       
        map    = Pacman.MAP.clone();
        height = map.length;
        width  = map[0].length;        
    };


    function block(pos)
    {
        return map[pos.y][pos.x];
    };
    

    /**
     * Création d'un block
     * 
     * @param {[type]} pos  [description]
     * @param {[type]} type [description]
     */
    function setBlock(pos, type) 
    {
        map[pos.y][pos.x] = type;
    };


    function drawPills(ctx) 
    { 
        if (++pillSize > 30) 
            pillSize = 0;
        
        for (i = 0; i < height; i += 1) 
        {
		    for (j = 0; j < width; j += 1) 
            {
                if (map[i][j] === Pacman.PILL) 
                {
                    ctx.beginPath();

                    ctx.fillStyle = "#ddd";
		            ctx.fillRect((j * blockSize), (i * blockSize), 
                                 blockSize, blockSize);

                    ctx.fillStyle = "#FFF";
                    ctx.arc((j * blockSize) + blockSize / 2,
                            (i * blockSize) + blockSize / 2,
                            Math.abs(5 - (pillSize/3)), 
                            0, 
                            Math.PI * 2, false); 
                    ctx.fill();
                    ctx.closePath();
                }
		    }
	    }
    };
    

    /**
     * Dessine la carte
     * 
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    function draw(ctx) 
    {
        var i, j, size = blockSize;

        ctx.fillStyle = "#ddd";
	    ctx.fillRect(0, 0, width * size, height * size);

        drawWall(ctx);
        
        for (i = 0; i < height; i += 1) 
        {
		    for (j = 0; j < width; j += 1) 
            {
			    drawBlock(i, j, ctx);
		    }
	    }
    };
    

    /**
     * Dessine un block
     * 
     * @param  {[type]} y   [description]
     * @param  {[type]} x   [description]
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    function drawBlock(y, x, ctx) 
    {
        var layout = map[y][x];

        if (layout === Pacman.PILL) 
            return;

        ctx.beginPath();
        
        if (layout === Pacman.EMPTY || layout === Pacman.BLOCK || layout === Pacman.BISCUIT) 
        {
            ctx.fillStyle = "#ddd";
		    ctx.fillRect((x * blockSize), (y * blockSize), blockSize, blockSize);

            if (layout === Pacman.BISCUIT) 
            {
                ctx.fillStyle = "#FFF";
		        ctx.fillRect((x * blockSize) + (blockSize / 2.5), 
                             (y * blockSize) + (blockSize / 2.5), 
                             blockSize / 6, blockSize / 6);
	        }
        }
        ctx.closePath();	 
    };

    reset();
    
    // renvoie les méthodes publiques de la classe
    return {
        "draw"         : draw,
        "drawBlock"    : drawBlock,
        "drawPills"    : drawPills,
        "block"        : block,
        "setBlock"     : setBlock,
        "reset"        : reset,
        "isWallSpace"  : isWall,
        "isFloorSpace" : isFloorSpace,
        "height"       : height,
        "width"        : width,
        "blockSize"    : blockSize
    };

};// fin classe Map
