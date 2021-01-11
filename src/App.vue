<template>
  <div id="app">

    <nav class="container section">
      <router-view name="search" :users="users" @userIdChange="loadUser"></router-view>
    </nav>

    <section class="container section">
      <router-view :user="user"></router-view>
    </section>
    
  </div>
</template>

<script>
import { users } from './assets/users.js'
import { user } from './assets/user.js'

export default {
  name: 'App',
  mounted:  function() {
    // TODO loading users from DB here
    console.log('Load users');
    this.users = users;
  },
  data() {
    return {
      // current users and user objects are stored here,
      // then propagate with props to other components
      users: null,
      user: null,
    }
  },
  methods: {
    loadUser: function(event) {
      console.log('userId changed to ' + event.userId)
      if (event.userId > 0) {
        if (event.userId != ((this.user||{}).id||0)) {
          // TODO load current user from DB here
          this.user = user;
          this.user.id = event.userId;
          this.user.position = users[event.userId-1].position;
          this.user.firstname = users[event.userId-1].firstname;
          this.user.lastname = users[event.userId-1].lastname;
        }
      }
      else {
        this.user = null;
      }
    }
  },
}
</script>
