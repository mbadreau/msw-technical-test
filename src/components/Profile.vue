<template>
  <div>
    <div class="box">
      <b-image
        src="https://i.pinimg.com/originals/40/f6/e1/40f6e128ca12f0e3d866387b756b11a8.png"
        alt="Avatar"
        ratio="128by128"
      ></b-image>
    </div>
    <div class="container">
      <div class="block">
        <p class="is-size-5 has-text-weight-bold is-capitalized">{{ user.firstname }} {{ user.lastname }}</p>
        <p class="is-size-6 has-text-weight-semibold">About me</p>
        <p class="is-size-6 has-text-weight-normal">{{ user.about }}</p>
      </div>
      <div class="block">
        <p class="is-size-6 has-text-weight-semibold">My social ids</p>
        <ul>
          <li class="is-size-6 has-text-weight-normal" v-for="media in user.socialMedia" :key="media.id">
            <a :href="media.link">
              <i :class="media.class"></i> {{ media.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstname: 'Tryphon',
        lastname: 'Tournesol',
        about: 'Le professeur Tryphon Tournesol est un multispécialiste capable de concevoir le moteur atomique de la fusée lunaire, un sous-marin, une pilule anti-alcool, un puissant émetteur d\'ultrasons...',
        socialMedia: [
          {
            id: 1,
            name: 'Facebook',
            class: 'fab fa-facebook',
            link: 'https://fr-fr.facebook.com/people/Triphon-Tournesol/100016965376092'
          },
          {
            id: 2,
            name: 'Linkedin',
            class: 'fab fa-linkedin',
            link: 'https://fr.linkedin.com/in/tryphon-tournesol-33755016'
          },
          {
            id: 3,
            name: 'Orcid',
            class: 'fab fa-orcid',
            link: 'https://orcid.org/0000-0002-7889-1988'
          },
        ],
      }
    }
  }
}
</script>
