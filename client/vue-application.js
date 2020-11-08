const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Pacman = window.httpVueLoader('./components/Pacman.vue')
const Memory = window.httpVueLoader('./components/Memory.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
  { path: '/register', component: Register },
  { path : '/memory', component: Memory },
  { path : '/pacman', component: Pacman }
]

const router = new VueRouter({
  routes
})

//memory
/*let app = new Vue({
  el: '#app',
  data:{
    memoryCards: [],
    flippedCards: [],
          cards: [
              {
                  name: 'Apple',
                  img: 'apple.gif',

              },
              {
                  name: 'Banana',
                  img: 'banana.gif',

              },
              {
                  name: 'Orange',
                  img: 'orange.jpg',

              },
              {
                  name: 'Pineapple',
                  img: 'pineapple.png',

              },
              {
                  name: 'Strawberry',
                  img: 'strawberry.png',

              },
              {
                  name: 'watermelon',
                  img: 'watermelon.jpg',

              },
          ],
  },
  created(){
    this.cards.forEach((card) => {
        Vue.set(card,'isFlipped',false)
    });

 this.memoryCards = _.shuffle(this.memoryCards.concat(_.cloneDeep(this.cards), _.cloneDeep(this.cards)));
 this.cards.forEach((card) => {
  Vue.set(card,'isFlipped',false);
  Vue.set(card,'isMatched',false);
});
},


  methods:{
    flipCard(card){
      card.isFlipped = true;
  
      if(this.flippedCards.length < 2)
          this.flippedCards.push(card);
      if(this.flippedCards.length === 2)    
          this._match(card);
  },
  
  _match(card){
  
      if(this.flippedCards[0].name === this.flippedCards[1].name)
          this.flippedCards.forEach(card => card.isMatched = true);
      else
          this.flippedCards.forEach(card => card.isFlipped = false);
      
      this.flippedCards = [];
  },
  }
});*/




var app = new Vue({
  router,
  el: '#app',
  data: {
    games: [],
    comments: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      games: []
    },
    isConnected:false
  },
  async mounted () {
    const res = await axios.get('/api/games')
    this.games = res.data

    const res2 = await axios.get('/api/comments')
    this.comments = res2.data
    /*const res2 = await axios.get('/api/panier')
    this.panier = res2.data*/
    //const res3 = await axios.get('/api/register')
  },
 
  methods: {
    async addComment (comment) {
      const res = await axios.post('/api/comment', comment)
      this.comments.push(res.data)
    },
    async updateComment (newcomment) {
      await axios.put('/api/comment/' + newcomment.id, newcomment)
      const comment = this.comments.find(a => a.id === newcomment.id)
      comment.title = newcomment.title
      comment.description = newcomment.description
      comment.rate = newcomment.rate
    },
    async deleteComment (commentId) {
      await axios.delete('/api/comment/' + commentId)
      const index = this.comments.findIndex(a => a.id === commentId)
      this.comments.splice(index, 1)
    },
    /*async addToPanier(gameId){
      console.log("adding game to panier")
      const game ={
          id: gameId,
          quantity: 1
      }
      const res = await axios.post('/api/panier', game)
      this.panier.games.push(res.data)
      console.log("game added to panier")
    },
    async removeFromPanier(gameId){
      console.log("deleting the game")
      await axios.delete('/api/panier/' + gameId)
      const index = this.panier.games.findIndex(a => a.id === gameId)
      this.panier.games.splice(index, 1) //supprime un élément à partir de l'index
      console.log("game deleted from the shopbag")
      
    },
    async putToPanier(gameId, quantity){
      const res = await axios.put('/api/panier/'+ gameId, {quantity: quantity})
      this.panier = res.data
    },*/
    async addUser(email, password, pseudo){
      console.log("registering")
      await axios.post('/api/register' + email + password + pseudo)
      console.log("successfully registered")
    },
    async loginUser(email, password, pseudo){
      console.log("login in process")
      await axios.post('/api/login' + email + password + pseudo)
      console.log("successfully logged in")
    },

    //memory
    async startGame(){
      document.getElementById("board").style.visibility="visible";
	  document.getElementById("game-info").style.visibility="visible";
	  var timing = setInterval(function function1(){ 
	  document.getElementById("timer").innerHTML = count + "&nbsp" + "seconds";

	  count--;
		  if(count <= 0){	
		    clearInterval(timing);
			  document.getElementById("timer").innerHTML = "Time is up!"
			  alert("Too late !");
			  location.reload();
	    }
	  }, 1000);
      },
    async flipCard(){
      let flippedCard = false;
      let firstCard, secondCard;
      if (lockBoard===true)return;
	if (this === firstCard) return;
	this.classList.add('flip');

	if (!flippedCard) {
	//firstClick
	 flippedCard = true;
	 firstCard = this;
	 return;
	}

	//Second clicked
	secondCard = this;

	checkMatch();
    },
    async checkMatch(count){
      //do cards match ?
	if (firstCard.getAttribute('data-nb') === secondCard.getAttribute('data-nb')) {
		//it is a match
		match();
		nbmatch++;
	  	if (nbmatch === 6) {
	  		alert("Congratulations ! You have matched all the images");
	  		location.reload();
	  	}
	  	
	}
	else{
		//not a match
		notMatch();
	}
    },
    match(){
      firstCard.removeEventListener('click', flipCard);
  	secondCard.removeEventListener('click', flipCard);

  	resetBoard();
    },
    notMatch(){
      let lockBoard = false;
      lockBoard = true;
	//the cards will be unfliped
	setTimeout(() =>{
	  	firstCard.classList.remove('flip');
	  	secondCard.classList.remove('flip');
	  	resetBoard();
  	}, 1300);
    },
    resetBoard(){
      let flippedCard
      let lockBoard
      let firstCard
      let secondCard
      flippedCard = false;
	lockBoard = false;
	firstCard=null;
	secondCard= null;
    },
    randomCards(){
      cards.forEach(card => {
        //get the random number
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
      });
    }


   }
})
