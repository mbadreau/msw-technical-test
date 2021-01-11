<template>
  <div>
    <ul class="container">
      <li class="block" v-for="affiliation in sortedAffiliations" :key="affiliation.id">
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
    },
    sortByFromDate: function(affiliation_1, affiliation_2) {
      const date1 = Number.parseInt(affiliation_1.fromDate, 10);
      const date2 = Number.parseInt(affiliation_2.fromDate, 10);
      if (!Number.isNaN(date1) && !Number.isNaN(date2)) {
        return date2 - date1;
      }
      return 0;
    },
    sortByToDate: function(affiliation_1, affiliation_2) {
      const date1 = Number.parseInt(affiliation_1.toDate, 10);
      const date2 = Number.parseInt(affiliation_2.toDate, 10);
      if (!Number.isNaN(date1) && !Number.isNaN(date2)) {
        return date2 - date1;
      }
      return 0;
    },
  },
  computed: {
    sortedAffiliations: function() {
      return ((this.user||{}).affiliations||[])
        .sort(this.sortByToDate)
        .sort(this.sortByFromDate);
    }
  },
}
</script>
