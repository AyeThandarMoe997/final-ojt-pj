<template>
  <div id="app">
    <button class="router-btn" @click="addUser">Register New User</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$store.state.user_id,
    }
  },
  methods: {
    addUser() {
      this.$store.commit('addUserId', this.id)
      this.$router.push({name: 'user-register', params: { id: this.id}});
    }
  }
}
</script>

<style>
.router-btn {
  padding: 5px 10px;
  text-decoration: none;
  color: #fff;
  margin: 5px 2px;
  display: inline-block;
  background-color: rgb(93, 99, 207);
  border-radius: 4px;
  font-family: Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
  font-weight: 400;
  letter-spacing: .5px;
  font-size: 15px;
  cursor: pointer;
}
</style>
