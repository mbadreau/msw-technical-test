<template>
  <div>
    <div class="buttons has-addons is-centered">
      <b-button tag="router-link" to="/" exact active-class="is-primary">
        Vue générale
      </b-button>

      <b-button tag="router-link" to="/profile" active-class="is-primary">
        Mon profil
      </b-button>

      <b-button tag="router-link" to="/publications" active-class="is-primary">
        Mes Publications
      </b-button>
    </div>

    <div class="section">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default {
  
}
</script>
