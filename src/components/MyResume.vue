<template>
  <div>
    <ul class="container">
      <li class="block" v-for="job in jobs" :key="job.id">
        <p class="is-size-5 has-text-weight-bold">{{ job.title }}</p>
        <p class="is-size-6 has-text-weight-semibold">{{ job.status }}</p>
        <p class="is-size-6 has-text-weight-normal">{{ job.team }}</p>
        <p class="is-size-6 has-text-weight-normal">{{ job.date }}</p>
        <p class="is-size-7 has-text-weight-normal is-uppercase">{{ job.country }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      jobs: [
        {
          id: 1,
          organisation: 'TurboSound UK',
          status: 'Ingénieur du son',
          team: 'Equipe de recherche armes à ultrasons',
          date: 'Depuis 1956',
          country: 'Bordurie',
        },
        {
          id: 2,
          organisation: 'National Aeronautics and Space Administration',
          status: 'Ingénieur aérospatiale',
          team: 'Equipe de recherche fusée lunaire',
          date: '1953 - 1954',
          country: 'Syldavie',
        },
        {
          id: 3,
          organisation: 'Marine Nationale',
          status: 'Ingénieur naval',
          team: 'Equipe de recherche camouflage sous-marin biplace',
          date: '1943 - 1945',
          country: 'Belgique',
        },
      ],
    }
  }
}
</script>
