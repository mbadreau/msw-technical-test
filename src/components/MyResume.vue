<template>
  <div>
    <ul class="container">
      <li class="block" v-for="affiliation in ((user||{}).affiliations||[])" :key="affiliation.id">
        <p class="is-size-5 has-text-weight-bold">{{ affiliation.organisation }}</p>
        <p class="is-size-6 has-text-weight-semibold">{{ affiliation.position }}</p>
        <p class="is-size-6 has-text-weight-normal">{{ affiliation.team }}</p>
        <p class="is-size-6 has-text-weight-normal">{{ formatDates(affiliation.fromDate, affiliation.toDate) }}</p>
        <p class="is-size-7 has-text-weight-normal is-uppercase">{{ affiliation.country }}</p>
      </li>
    </ul>
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
  methods: {
    formatDates: function(from, to) {
      var dates = ''
      if (from && to) {
        dates = from + ' - ' + to;
      }
      else if (from) {
        dates = 'Depuis ' + from;
      }
      else if (to) {
        dates = 'Jusqu\'en ' + to;
      }
      return dates;
    }
  }
}
</script>
