<template>
  <div id="app">

    <nav class="container section">
      <mba-search-view></mba-search-view>
    </nav>

    <section class="container">
      <router-view></router-view>
    </section>
    
  </div>
</template>

<script>
import MbaSearchView from './components/SearchView.vue'

export default {
  name: 'App',
  components: {
    MbaSearchView,
  },
}
</script>
