<template>
<div>
    <h2>Pacman</h2>
    <div class="separateur"></div> 
 
    <section id="content">

      <div id="idGameDiv"> </div>

    </section> 

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
    loginUser (email, password) {
      this.$emit('login-user',email,password)
    }
    
  }
}

//pacman importer le javascript


</script>

<style scoped>
/* Removes Mobile Highlight */
*{-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
body{
  font-size: 12px;
  font-family: Arial;
}

header { 
  padding : 1px 0; 
  background : #D8D8D8; 
  text-align : center; 
  font-weight : bold; 
} 
 
nav { 
  font-size : 0.8em; 
  list-style : none; 
  text-align : center; 
} 
 
section { 
  padding : 10px; 
  margin-bottom: 20px;
  background : #D8D8D8; 
} 
 
nav li { 
  display : inline; 
  padding : 1px; 
} 
 
 
.separateur { 
  height : 1px; 
  background : #717171; 
  border-bottom : 1px solid #313030; 
} 
 
footer { 
  font-weight : bold; 
  background : #a9c6cb; 
  text-align : center; 
  padding : 10px;
} 
 
div.bienvenue { 
  font-size : 1.5em; 
  text-align : center; 
  padding-bottom : 25px; 
} 
 
article { 
  padding : 0 10px; 
  padding-bottom : 25px; 
}

#idGameDiv {
  height:450px;
  width:342px;
  margin:20px auto;
}
</style>