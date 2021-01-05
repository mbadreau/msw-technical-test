<template>
  <div id="app">
    <nav class="container section">
      <mba-search-view></mba-search-view>
    </nav>
    <section class="container">
      <div class="tile is-ancestor">
        <div class="tile is-3 is-parent">
          <div class="tile is-child">
            <mba-profile></mba-profile>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box">
            <mba-main-view></mba-main-view>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MbaMainView from './components/MainView.vue'
import MbaProfile from './components/Profile.vue'
import MbaSearchView from './components/SearchView.vue'

export default {
  name: 'App',
  components: {
    MbaMainView,
    MbaProfile,
    MbaSearchView,
  }
}
</script>
