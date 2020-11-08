/**

  The Initial Developer of the Original Code is
  Matthieu  - http://www.programmation-facile.com/
  Portions created by the Initial Developer are Copyright (C) 2013
  the Initial Developer. All Rights Reserved.
 
  Contributor(s) :

 */


/**
 * Code source : 
 * http://jsfiddle.net/jeffchan/WHgaY/76/
 * 
 */

/**
 * Gestion d'un texte HTML5 sur plusieurs lignes
 *
 * 
 * @param  {[type]} text       [description]
 * @param  {[type]} x          position en x
 * @param  {[type]} y          position en y
 * @param  {[type]} lineHeight hauteur des lignes
 * @param  {[type]} fitWidth   largeur du texte avant saut de ligne
 * @return {[type]} oContext   le champ texte (ctx  = canvas.getContext('2d');)
 * @return {[type]} bDebug     active ou non le debug (encadre le texte)
 */
function addMultiLineText(text, x, y, lineHeight, fitWidth, oContext, bDebug)
{
    var draw = x !== null && y !== null;

    text = text.replace(/(\r\n|\n\r|\r|\n)/g, "\n");
    sections = text.split("\n");

    var i, str, wordWidth, words, currentLine = 0,
        maxHeight = 0,
        maxWidth = 0;

    var printNextLine = function(str)
    {
        if (draw)
            oContext.fillText(str, x, y + (lineHeight * currentLine));

        currentLine++;
        wordWidth = oContext.measureText(str).width;
       
        if (wordWidth > maxWidth)
            maxWidth = wordWidth;
    };

    for (i = 0; i < sections.length; i++) 
    {
        words = sections[i].split(' ');
        index = 1;

        while (words.length > 0 && index <= words.length) 
        {
            str = words.slice(0, index).join(' ');
            wordWidth = oContext.measureText(str).width;

            if (wordWidth > fitWidth) 
            {
                if (index === 1)
                {
                    // Falls to this case if the first word in words[] is bigger than fitWidth
                    // so we print this word on its own line; index = 2 because slice is
                    str = words.slice(0, 1).join(' ');
                    words = words.splice(1);
                } 
                else 
                {
                    str = words.slice(0, index - 1).join(' ');
                    words = words.splice(index - 1);
                }

                printNextLine(str);

                index = 1;
            } 
            else
                index++;
        }

        // The left over words on the last line
        if (index > 0)
            printNextLine(words.join(' '));
    }

    maxHeight = lineHeight * (currentLine);

    if (bDebug)
        oContext.strokeRect(x, y, maxWidth, maxHeight);// Encadre le texte dans un rectangle

    if (!draw) 
    {
        return {
            height: maxHeight,
            width: maxWidth
        };
    }
};




/**
 * Code source : 
 * http://jsfiddle.net/AbdiasSoftware/2JGHs/
 * 
 */



/**
 * Pour ajouter une couleur de fond sur un champ texte
 * 
 * @param  {[type]} oContext  [description]
 * @param  {[type]} txt  [description]
 * @param  {[type]} font [description]
 * @param  {[type]} x    [description]
 * @param  {[type]} y    [description]
 * @return {[type]}      [description]
 */
function addTextBackground(oContext, x, y, width, height, color) 
{
    oContext.save();
    oContext.textBaseline = 'top';
    oContext.fillStyle = color;
    oContext.fillRect(x, y, width, height);
    oContext.restore();
}


