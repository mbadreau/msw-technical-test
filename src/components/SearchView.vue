<template>
  <div class="mx-6 px-6">

    <b-field>
      <!-- Autocomplete example from Buefy -->
      <b-autocomplete
        ref="mbaAutocomplete"
        expanded
        keep-first
        open-on-focus
        clearable
        v-model="name"
        placeholder="Autocomplétion pour retrouver un utilisateur dans le système"
        :data="filteredDataArray"
        @select="option => selected = option">
        <template slot="empty">
          Aucun utilisateur trouvé
        </template>
      </b-autocomplete>

      <p class="control">
        <b-button
        class="button is-primary"
        @click="toggleDropdown()">
          <i class="fas fa-caret-down"></i>
        </b-button>
      </p>
    </b-field>

    <div class="has-text-centered">
      <b-button
        class="button is-primary"
        :disabled="!selected"
        @click="loadProfile(name)">
        Rechercher
      </b-button>
    </div>

  </div>
</template>

<script>
import { users } from '../assets/users.js'
import { user } from '../assets/user.js'

export default {
  data() {
    return {
      users,
      user,
      name: '',
      selected: null
    }
  },
  methods: {
    resetSelected: function() {
      this.name = '';
      this.selected = null;
    },
    toggleDropdown: function() {
      // if autocomplete dropdown is not opened yet, 
      // clear current selection and give focus
      // (autocomplete has open-on-focus parameter),
      // else focus is lost when clicking the other button.
      if (!this.$refs.mbaAutocomplete.isActive) {
        this.resetSelected();
        this.$refs.mbaAutocomplete.focus();
      }
    },
    loadProfile: function(username) {
      alert('Impossible d\'afficher le profil de ' + username);
      this.resetSelected();
    },
  },
  computed: {
    filteredDataArray() {
      return this.users.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  },
  watch: {
    selected: function(value) {
      // push new route on selected change, and catch redundant navigation exception
      this.$router.push({ name: 'viewMyPublications', params: { searchPub: value } }).catch(()=>{})
    }
  },
}
</script>
