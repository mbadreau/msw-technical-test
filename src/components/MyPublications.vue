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
          :data="filteredDataObj"
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
      <li class="block" v-for="publication in filteredSelectedDataObj" :key="publication.id">
        <p>{{ publication.authors | formatList }}. {{ publication.year }}. {{ publication.title }}.</p>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  created: function() {
    this.name = this.searchPub;
    this.selected = this.searchPub;
  },
  props: {
    searchPub: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      publications: [
        {
          id: 1,
          title: 'Le Secret de La Licorne',
          authors: [ 'Tryphon Tournesol' ],
          year: 1943,
          language: 'fr-BE',
        },
        {
          id: 2,
          title: 'Les Sept Boules de cristal',
          authors: [ 'Hippolyte Bergamotte', 'Tryphon Tournesol' ],
          year: 1949,
          language: 'fr-BE',
        },
        {
          id: 3,
          title: 'On a marché sur la Lune',
          authors: [ 'Tryphon Tournesol', 'Frank Wolff' ],
          year: 1954,
          language: 'fr-BE',
        },
        {
          id: 4,
          title: 'Affaire Tournesol',
          authors: [ 'Tryphon Tournesol' ],
          year: 1956,
          language: 'fr-BE',
        },
      ],
      name: '',
      selected: '',
    }
  },
  methods: {
    filterPublication: function(name, publication) {
      name = name.toLowerCase();
      return (
        publication.title.toString().toLowerCase().indexOf(name) >= 0
          || publication.authors.toString().toLowerCase().indexOf(name) >= 0
          || publication.year.toString().toLowerCase().indexOf(name) >= 0
          || publication.language.toString().toLowerCase().indexOf(name) >= 0
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
    filteredDataObj() {
      return this.publications.filter(option => 
        this.filterPublication(this.name, option))
    },
    filteredSelectedDataObj() {
      return this.publications.filter(option => 
        this.filterPublication(this.selected, option))
    },
  },
  watch: {
    selected: function(value) {
      // push new route on selected change, and catch redundant navigation exception
      this.$router.push({ name: 'viewMyPublications', params: { searchPub: value } }).catch(()=>{})
    }
  },
}
</script>
