<template>
<div>
    <h2>Register</h2>
    <form>
      <input placeholder="email" required>
      <input  placeholder="password" required>
      <input  placeholder="pseudo" required>
      <button @click="addUser(email, password, pseudo)">Validate</button>
    </form>
<div>
    <h2>Already member</h2>
    <form>
      <input placeholder="email/pseudo" required>
      <input  placeholder="password" required>
      <button @click="loginUser(email, password, pseudo)">Login</button>
    </form>
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
      pseudo:"",
      isConnected:false
    }
  },
  async mounted () {
  },
  methods: {
    addUser (email, password, pseudo) {
      this.$emit('add-user',email,password, pseudo)
    },
    loginUser (email, password, pseudo) {
      this.$emit('login-user',email,password, pseudo)
    }
    
  }
}
</script>