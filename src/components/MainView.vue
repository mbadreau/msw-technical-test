<template>
  <section>
    <b-tabs class="block" position="is-centered" type="is-toggle" v-model="activeTab">

      <b-tab-item label="Vue générale">
        <mba-my-resume class="section"></mba-my-resume>
      </b-tab-item>

      <b-tab-item label="Mon profil">
        <mba-my-profile class="section"></mba-my-profile>
      </b-tab-item>

      <b-tab-item label="MesPublications">
        <mba-my-publications class="section"></mba-my-publications>
      </b-tab-item>

    </b-tabs>
  </section>
</template>

<script>
import MbaMyProfile from './MyProfile.vue'
import MbaMyPublications from './MyPublications.vue'
import MbaMyResume from './MyResume.vue'

export default {
  data() {
    return {
      activeTab: 0,
    }
  },
  components: {
    MbaMyProfile,
    MbaMyPublications,
    MbaMyResume,
  }
}
</script>
