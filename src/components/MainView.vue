<template>
  <div>
    <div class="level">
      <nav class="level-item">
        <button class="button is-light">Vue générale</button>
        <button class="button is-light">Mon profil</button>
        <button class="button is-light">MesPublications</button>
      </nav>
    </div>
    <div class="section">
      <mba-my-resume v-show="true"></mba-my-resume>
      <mba-my-profile v-show="false"></mba-my-profile>
      <mba-my-publications v-show="false"></mba-my-publications>
    </div>
  </div>
</template>

<script>
import MbaMyProfile from './MyProfile.vue'
import MbaMyPublications from './MyPublications.vue'
import MbaMyResume from './MyResume.vue'

export default {
  components: {
    MbaMyProfile,
    MbaMyPublications,
    MbaMyResume,
  }
}
</script>
