<template>
  <div>

    <div class="mx-6 px-6 mb-6">
      <b-field class="block">
        <!-- Autocomplete example from Buefy -->
        <b-autocomplete
          ref="mbaAutocomplete"
          expanded
          keep-first
          open-on-focus
          clearable
          v-model="name"
          placeholder="Rechercher dans les publications"
          :data="filteredData"
          field="title">
          <template slot="empty">
            Aucune publication trouvée
          </template>
        </b-autocomplete>

        <p class="control">
          <b-button class="button is-primary" @click="selected = name">Go</b-button>
        </p>
      </b-field>
    </div>

    <ul>
      <li class="block" v-for="publication in filteredSelectedData" :key="publication.id">
        <p>{{ publication.authors | formatList }}. {{ publication.year }}. {{ publication.title }}.</p>
      </li>
    </ul>

  </div>
</template>

<script>
import { publications } from '../assets/publications.js'
import { user } from '../assets/user.js'

export default {
  created: function() {
    // update selected and name if there is a query parameter
    this.name = this.search;
    this.selected = this.search;
    // auto update url query parameter on selected change
    this.$watch('selected', (value) => {
      // Use an empty catch to solve Avoided redundant navigation to current location error
      this.$router.push({ query: { search: value } }).catch(()=>{});
    });
    // auto update selected on url query parameter change
    this.$watch('$route.query.search', (newValue) => {
      this.name = newValue;
      this.selected = newValue;
    });
  },
  props: {
    search: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      publications,
      user,
      name: '',
      selected: '',
    }
  },
  methods: {
    filterPublication: function(name, publication) {
      // TODO hope I'll improve this with elastic
      name = name.toLowerCase();
      const username = (user.firstname + ' ' + user.lastname).toLowerCase();
      const username_rev = (user.lastname + ' ' + user.firstname).toLowerCase();
      var isUserPublication = false;
      // we test both case where firstname is before or after last name
      publication.authors.forEach(function(author) {
        author = author.toLowerCase();
        if (author === username || author === username_rev)
          isUserPublication = true;
      });
      return (isUserPublication
            && (publication.title.toString().toLowerCase().indexOf(name) >= 0
              || publication.authors.toString().toLowerCase().indexOf(name) >= 0
              || publication.year.toString().toLowerCase().indexOf(name) >= 0
              || publication.language.toString().toLowerCase().indexOf(name) >= 0
            )
      );
    }
  },
  filters: {
    formatList: function(value) {
      var list = '';
      if (value) {
        for (var i = 0; i < value.length; i++) {
          list += value[i] + (i < value.length -1 ? ', ' : '');
        }
      }
      return list;
    },
  },
  computed: {
    filteredData() {
      return this.publications.filter(option => 
        this.filterPublication(this.name, option))
    },
    filteredSelectedData() {
      return this.publications.filter(option => 
        this.filterPublication(this.selected, option))
    },
  },
}
</script>
