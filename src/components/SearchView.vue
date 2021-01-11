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
        :data="filteredData"
        field="name"
        @select="option => selected = (option||{}).id">
        <template slot="empty">
          Aucun utilisateur trouvé
        </template>
      </b-autocomplete>

      <p class="control">
        <b-button
        class="button is-primary"
        @click="toggleDropdown">
          <i class="fas fa-caret-down"></i>
        </b-button>
      </p>
    </b-field>

    <div class="has-text-centered">
      <b-button
        class="button is-primary"
        :disabled="!selected"
        @click="loadSelected">
        Rechercher
      </b-button>
    </div>

  </div>
</template>

<script>
import { users } from '../assets/users.js'

export default {
  props: {
    userId: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      users,
      name: '',
      selected: 0,
    }
  },
  methods: {
    resetSelected: function() {
      this.name = '';
      this.selected = 0;
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
    loadSelected: function() {
      console.log(this.userId + ' -> ' + this.selected)
      // userId 0 is the default value (no user)
      if (this.selected > 0 && this.selected != this.userId) {
        var routeObj = { params: { userId: this.selected } }
        // add route name only is view is not fully loaded yet
        if (!this.userId) {
          routeObj.name = 'viewMyResume'
        }
        // Use an empty catch to solve Avoided redundant navigation to current location error
        this.$router.push(routeObj).catch(()=>{});
      }
      this.resetSelected();
    },
  },
  computed: {
    filteredData() {
      // first filter users with given input string parts
      return this.users.filter((option) => {
        var isMatching = true;
        this.name.toLowerCase().split(' ').forEach(function(part) {
          isMatching &= (option.position.toString().toLowerCase().indexOf(part) >= 0
            || option.firstname.toString().toLowerCase().indexOf(part) >= 0
            || option.lastname.toString().toLowerCase().indexOf(part) >= 0);
        })
        return isMatching;
      })
      // then map object array to another object array with concat strings
      .map((user) => {
        return {
          id: user.id,
          name: ((user.position ? user.position + ' ' : '') 
            + user.firstname + ' ' + user.lastname)
        }
      });
    }
  },
}
</script>
