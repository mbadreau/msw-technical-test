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
          :data="filteredByUsername"
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
      <li class="block" v-for="publication in filteredBySelected" :key="publication.id">
        <p>{{ publication.authors | formatList }}. {{ publication.year }}. {{ publication.title }}.</p>
      </li>
    </ul>

  </div>
</template>

<script>
import { publications } from '../assets/publications.js'

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
    user: {
      type: Object,
      default: null,
    },
    search: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      publications,
      name: '',
      selected: '',
    }
  },
  methods: {
    filterPublication: function(name, publication) {
      // TODO hope I'll improve this with elastic
      name = (name||'').toLowerCase();
      const username = this.username.toLowerCase();
      var isUserPublication = false;
      // we test both case where firstname is before or after last name
      publication.authors.forEach(function(author) {
        author = author.toLowerCase();
        if (author === username)
          isUserPublication = true;
      });
      return (isUserPublication
            && (publication.title.toString().toLowerCase().indexOf(name) >= 0
              || publication.authors.toString().toLowerCase().indexOf(name) >= 0
              || publication.year.toString().toLowerCase().indexOf(name) >= 0
              || publication.language.toString().toLowerCase().indexOf(name) >= 0
            )
      );
    },
    sortByDate: function(publication_1, publication_2) {
      const date1 = Number.parseInt(publication_1.year, 10);
      const date2 = Number.parseInt(publication_2.year, 10);
      if (!Number.isNaN(date1) && !Number.isNaN(date2)) {
        return date2 - date1;
      }
      return 0;
    },
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
    username: function() {
      if (((this.user||{}).firstname||'').length > 0 
        && ((this.user||{}).lastname||'').length > 0) {
        return this.user.firstname + ' ' + this.user.lastname;
      }
      return '';
    },
    filteredByUsername() {
      return this.publications.filter(option => 
        this.filterPublication(this.name, option))
        .sort(this.sortByDate);
    },
    filteredBySelected() {
      return this.publications.filter(option => 
        this.filterPublication(this.selected, option))
        .sort(this.sortByDate);
    },
  },
}
</script>
