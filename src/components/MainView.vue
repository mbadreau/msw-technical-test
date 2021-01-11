<template>
  <div class="tile is-ancestor">
    <div class="tile is-3 is-parent">
      <div class="tile is-child">

        <router-view name="profile" :user="user"></router-view>

      </div>
    </div>

    <div class="tile is-parent">
      <div class="tile is-child box">

        <div class="buttons has-addons is-centered">
          <b-button tag="router-link" :to="{ name: 'viewMyResume' }" exact active-class="is-primary">
            Vue générale
          </b-button>

          <b-button tag="router-link" :to="{ name: 'viewMyProfile' }" active-class="is-primary">
            Mon profil
          </b-button>

          <b-button tag="router-link" :to="{ name: 'viewMyPublications' }" active-class="is-primary">
            Mes Publications
          </b-button>
        </div>

        <div class="section">
          <router-view :user="user"></router-view>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
}
</script>
