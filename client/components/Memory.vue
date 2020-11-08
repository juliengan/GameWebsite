<template>
<div>
    <h2>Memory</h2>
    <h1 class="game-title">Memory game</h1>
        
        <div class="rules">
            <p>Hey, let's play the memory game. The goal of this game is to match the pairs of cards 2 by 2. 
            If the cards flipped face up are the same you win, otherwise the cards are automatically turned face down and you need to make a new try. Try to find all the pairs in 50 seconds. Good luck !</p>
        </div>

        <div class="startbutton" style=" text-align: center;">
          <button @click="startGame()" class="gameStart">Click to start</button>
        </div>
        

        <div class="game">
            <div class="game-info-container" >
                <div id="game-info">
                    Time: <span id="timer" >50</span>
                </div>
            </div>
        </div>
        <div id="board">
            <div class="memory-game">
                <div class="game-card" data-nb="1">
                    <img class="front-face" src="YT/card1.png" alt="1">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="1">
                    <img class="front-face" src="YT/card1.png" alt="1">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="2">
                    <img class="front-face" src="YT/card2.png" alt="2">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="2">
                    <img class="front-face" src="YT/card2.png" alt="2">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="3">
                    <img class="front-face" src="YT/card3.png" alt="3">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="3">
                    <img class="front-face" src="YT/card3.png" alt="3">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="4">
                    <img class="front-face" src="YT/card4.png" alt="4">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="4">
                    <img class="front-face" src="YT/card4.png" alt="4">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="5">
                    <img class="front-face" src="YT/card5.png" alt="5">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="5">
                    <img class="front-face" src="YT/card5.png" alt="5">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="6">
                    <img class="front-face" src="YT/card6.png" alt="6">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                <div class="game-card" data-nb="6">
                    <img class="front-face" src="YT/card6.png" alt="6">
                    <img class="back-face" src="YT/logo.png" alt="badge">
                </div>
                
            </div>
        </div>
</div>
</template>

<script>
module.exports = {
  props: {
    
  },
  data () {
    return {
      email:"",
      password:"",
      isConnected:false
    }
  },
  async mounted () {
  },
  methods: {
    startGame(){
      this.$emit('start-game')
    },
    flipCard(){
      this.$emit('flip-card')
    },
    checkMatch(count){
        this.$emit('check-match')
    },
    match(){
        this.$emit('match')
    },
    notMatch(){
        this.$emit('no-match')
    },
    resetBoard(){
        this.$emit('reset-board')
    },
    randomCards(){
        this.$emit('random-cards')
    },
  }
 
}
 let flippedCard = false
let firstCard, secondCard
let lockBoard = false
var nbmatch =0,
var count=50
const cards = document.querySelectorAll('.game-card');




cards.forEach(card => card.addEventListener('click', flipCard));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

.alert {
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}

.logo-memory{
  background: url(memory.jpg) no-repeat;
  width: 100%;
  background-size: cover;
  height: 100vh;
  
  opacity: 77%;
}
.memory p{
  color:black;
  width: 60%;
  text-align: center;
  left: 20%;
  padding: 0px 30px 40px;
  font-family: 'Lora', serif;

}

.memory h1{
  font-family: 'Lora', serif;
  color: black;
  font-size:65px;
  text-align: center;
  vertical-align: middle;
  padding-top: 13%;
}


.polling_message {
  color: white;
  float: left;
  margin-right: 2%;            
}

.view_port {
  background-color: black;
  height: 25px;
  width: 100%;
  overflow: hidden;
}

.cylon_eye {
  background-color: rgb(104, 97, 112);
  background-image:         linear-gradient(to right, rgba( 0,0,0,0.9 ) 25%, rgba( 0,0,0,0.1 ) 50%, rgba( 0,0,0,0.9 ) 75%);
  color: white;
  height: 100%;
  width: 20%;

  -webkit-animation: 4s linear 1s infinite running move_eye;
          animation: 4s linear 1s infinite running move_eye;
}

@-webkit-keyframes move_eye { from { margin-left:-20%; } to { margin-left:100%; }  }
        @keyframes move_eye { from { margin-left:-20%; } to { margin-left:100%; }  }

/*GAME*/

*{
  box-sizing: border-box;
}


.memory-game{
  width: 640px;
  height: 640px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  margin-bottom: 30px;
  perspective: 1000px;

}




.game-card{
  width: calc(25% - 10px);
  height: calc(33.333% - 10px);
  margin: 5px;
  position: relative;
  transform: scale(1);
  transform-style: preserve-3d;
  transition: transform .5s;
}


.game-card:active {
   transform: scale(0.97);
   transition: transform .2s;
 }

.game-card.flip{
  transform: rotateY(180deg);
}

.game-card:hover{
  background-color: #c97200;
}


.front-face, .back-face{
  width: 100%;
  height: 100%;
  padding: 10px;
  position: absolute;
  border: 2px solid #200047;
  backface-visibility: hidden;
}

.front-face {
  transform: rotateY(180deg);
}


.game-info-container{
  display: flex;
  margin: 20px; 
}

#game-info{
  margin-right: 30px;
  visibility: hidden; 
  font-size: 20px;
  color: #3c3b6e;
}


.game-title{
  margin-top: 10px;
  text-align: center;
  font-size: 35px;
}

.gameStart{
  padding: 9px 25px;
  background-color: rgb(231,212,255);
  border:none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  margin-top: 30px;
  font-size: 15px;
}

#board{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 80px; 
  visibility: hidden;
  width: 100%;
  background: url(YT/10.jfif);
}

.gameStart:hover{
    background-color:#9786ad;
    color: white;
}

.rules{
  text-align: center;
  width: 50%;
  margin: auto;

}
.rules p{
  color: black;
}

.nav_footer img:hover{
  background-color: #B584C1;
  border-radius: 20%;
}
</style>