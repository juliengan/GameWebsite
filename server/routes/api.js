const express = require('express')
const router = express.Router()
const games = require('../data/games.js')
const comments = require('../data/comments.js')

const bcrypt = require('bcrypt')
const { Client } = require('pg')


const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: '2377674',
 port: 5433,
 database: 'Game2'
})

client.connect()

client.query('SELECT * from player', (err,res)=>{
  console.log(err,res)
  //client.end()
})





/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'games sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

router.get('/register',(req,res) => {

  client.query('SELECT * from player', (err,result)=>{
    console.log(err,result)
    //client.end()
  })
  res.render("get request successfully executed")
})

/*Cette route enregistre un nouveau joueur dans la bdd Game*/
router.post('/register',async(req,res) => {
  const email = req.body.email
  const password = req.body.password
  const pseudo = req.body.pseudo
 // const score = 0
  console.log("info well received, let's register")
  const sql = 'SELECT * FROM player WHERE pseudo= $1 AND email=$2'
  console.log("inside the database : selection successfully done")
  var result = await client.query({
    text: sql,
    values: [pseudo, email]
  })
  console.log("let's hash the password")
    const hash = await bcrypt.hash(password, 10) //hash le mot de passe
    const new_sql = 'INSERT INTO player values($1,$2,$3)'
    console.log("insertion successfully done")
    await client.query({
      text:new_sql,
      values:[pseudo, email, hash]  
  })
  console.log('Successfully registered : ',result.rows)

})

/**Cette route permet à l'utisateur de se connecter */
router.post('/login',async(req,res) =>{
  console.log("begin your authentification")
  const email = req.body.email
  const password = req.body.password
  const pseudo = req.body.pseudo
  var id = null
  var hash_pw = null
  const sql = 'SELECT * FROM player WHERE email=$1 AND password=$2 AND pseudo=$3'
  console.log("let's check if you are registered:")
  var result = await client.query({
    text: sql,
    values: [email, password, pseudo]
  })

  console.log("let's check if you are registered:before if")
  const hash = await bcrypt.hash(password, 10) //hash le mot de passe
  console.log(password, hash)
  if(await bcrypt.compare(password, hash)){ 
    console.log("we found you")
    this.isConnected = true
    //req.session.userId = 
    //console.log(id)
    } 
  else {
    console.log("Wrong authentification")
    res.json.status(401)({message:'Wrong authentification'})
  }

  const sql2 = 'SELECT * FROM player WHERE id=$1'
  console.log("let's check if you are registered:userId")
  const result2 = await client.query({
    text: sql2,
    values: [req.session.userId]
  })
  
  console.log('Successfully registered : ',result.rows)
  //console.log('Successfully registered : ',result2.rows)
})

/**Cette route  retourne
simplement l’utilisateur actuellement connecté
 */
router.get('/me',async(req,res) =>{
  console.log(this.isConnected)
  /*if(this.isConnected == true){
    
  }*/
})



/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
/*router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()

  }
  console.log("in use")
  next()
})*/

/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
/*router.get('/panier', (req, res) => {
  console.log("returning the shopbag")
  res.json(req.session.panier);
})*/

/*
 * Cette route doit ajouter un game au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'game, ainsi que la quantité voulue
 */
/*router.post('/panier', (req, res) => {
 const id = parseInt(req.body.id)
 const quantity = parseInt(req.body.quantity)
 var i = 1
 while(i <= games.length){
  if (id == i){
    if (quantity <= 0 || isNaN(quantity))
    {
      res.json({message : 'You must take a positive number'})
    }

    const game_added = req.session.panier.games.find(a => a.id === req.session.panier.games.id)
    if (!game_added) {
      const game ={
        id: id,
        quantity: quantity
        }
  
      req.session.panier.games.push(game)
      res.json(req.session.panier);
    }
    else{
      res.status(404).json({ message: 'bad request : this game is already in your shopbag' })
      return
      
    }
  }
  console.log(i)
  i++
 }
 if (i > games.length ){
   res.json({message : 'You must choose an id between 1 and 10'})
 }
 console.log("adding an game to the shopbag")

})*/

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
/*router.post('/panier/pay', (req, res) => {
  const title = req.body.title
  const firsttitle = req.body.firsttitle
  req.session.destroy()
  res.json({message : 'Merci ' + firsttitle + ' ' + title + 'pour votre achat'})
})*/


/*
 * Cette route doit permettre de changer la quantité d'un game dans le panier
 * Le body doit contenir la quantité voulue
 */

/*router.put('/panier/:commentId', (req, res) => {
  const commentId = parseInt(req.params.commentId)
  const quantity = parseInt(req.body.quantity)
  

  if (isNaN(commentId)) {
    res.status(400).json({ message: 'commentId should be a number' })
    return
  }
    if (quantity === '' || quantity <= 0)
    {
      res.json({message : 'You must take a positive number'})
    }
    else{
      
  var check = 0
  for(var game of req.session.panier.games){
    if(commentId === game.id){
      check = 1
      game.quantity = quantity;
    }
  }

  if(check == 0){
    res.status(400).json({ message: 'bad request' })
    return
  }
  res.send()
  
    }  
})*/



/**cette fonction vérifie que l'game demandé existe dans le panier  */
/*function parsegamePanier (req, res, next) {
  const commentId = parseInt(req.params.commentId)
  console.log(commentId)
  // si commentId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(commentId)) {
    res.status(400).json({ message: 'commentId should be a number' })
    return
  }
  // on affecte req.commentId pour l'exploiter dans toutes les routes qui en ont besoin
  req.commentId = commentId

  const game = req.session.panier.games.find(a => a.id === req.commentId)
  if (!game) {
    res.status(404).json({ message: 'game ' + commentId + ' does not exist' })
    return
  }
  // on affecte req.game pour l'exploiter dans toutes les routes qui en ont besoin
  req.game = game
  next()
}

router.route('/panier/:commentId')
/*.put(parsegamePanier, (res,req) => {
  //const commentId = parseInt(req.params.commentId)
  const quantity = parseInt(req.body.quantity)
  console.log('quantity', quantity)
  //req.session.panier.games.id = req.commentId
  //req.session.panier.games[commentId].quantity = quantity
  req.session.panier.games[req.commentId].quantity = quantity /*parseInt(req.body.quantity)*/


  /*var idCorrect
  for(var game of req.session.panier.games){
    if(commentId === game.id){
      idCorrect = 1
      game.quantity = quantity;
    }
  }

  if(idCorrect =! 1){
    res.status(400).json({ message: 'bad request' })
    return
  }

  res.send()
})*/

/*
 * Cette route doit supprimer un game dans le panier
 */
/*.delete(parsegamePanier, (req, res) => {
  const index = req.session.panier.games.findIndex(a => a.id === req.commentId)
  req.session.panier.games.splice(index, 1) // remove the game from the array
  res.send()
})*/






/**
 * Cette route envoie l'intégralité des jeux du site
 */
router.get('/games', (req, res) => {
  res.json(games)
})

/**
 * Cette route envoie l'intégralité des commentaires du site
 */

router.get('/comments', (req, res) => {
  res.json(comments)
})

/**
 * Cette route crée et publie un commentaire.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'game ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/comment', (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const rate = parseInt(req.body.rate)

  // vérification de la validité des données d'entrée
  if (typeof title !== 'string' || title === '' ||
      typeof description !== 'string' || description === '' ||
      isNaN(rate) || rate <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }

  const comment = {
    id: comments.length + 1,
    title: title,
    description: description,
    rate: rate
  }
  comments.push(comment)
  // on envoie l'game ajouté à l'utilisateur
  res.json(comment)
})

/**
 * Cette fonction fait en sorte de valider que le commentraire demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /comment/:commentId
 * - PUT /comment/:commentId
 * - DELETE /comment/:commentId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parsegame (req, res, next) {
  const commentId = parseInt(req.params.commentId)

  // si commentId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(commentId)) {
    res.status(400).json({ message: 'commentId should be a number' })
    return
  }
  // on affecte req.commentId pour l'exploiter dans toutes les routes qui en ont besoin
  req.commentId = commentId

  const comment = comments.find(a => a.id === req.commentId)
  if (!game) {
    res.status(404).json({ message: 'comment ' + commentId + ' does not exist' })
    return
  }
  // on affecte req.game pour l'exploiter dans toutes les routes qui en ont besoin
  req.comment = comment
  next()
}

router.route('/comment/:commentId')
  /**
   * Cette route envoie un game particulier
   */
  .get(parsegame, (req, res) => {
    // req.game existe grâce au middleware parsegame
    res.json(req.comment)
  })

  /**
   * Cette route modifie un game.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'game disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parsegame, (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const rate = parseInt(req.body.rate)

    req.comment.title = title
    req.comment.description = description
    req.comment.rate = rate
    res.send()
  })

  .delete(parsegame, (req, res) => {
    const index = comments.findIndex(a => a.id === req.commentId)

    comments.splice(index, 1) // remove the game from the array
    res.send()
  })

module.exports = router
