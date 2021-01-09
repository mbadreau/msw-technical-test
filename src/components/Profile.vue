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
        <p class="is-size-5 has-text-weight-bold is-capitalized">
          {{ user.firstname }} {{ user.lastname }}</p>
        <p class="is-size-6 has-text-weight-semibold"
          v-if="((user||{}).about||[]).length">About me</p>
        <p class="is-size-6 has-text-weight-normal">{{ user.about }}</p>
      </div>
      <div class="block">
        <p class="is-size-6 has-text-weight-semibold"
          v-if="((user||{}).socialIds||[]).length">My social ids</p>
        <ul>
          <li class="is-size-6 has-text-weight-normal"
            v-for="media in user.socialIds"
            :key="getSocialMedia(media.name).id">
            <a :href="media.link">
              <i :class="getSocialMedia(media.name).icon"
                :style="{ color: getSocialMedia(media.name).color }"></i>
                {{ media.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { socialMedia, getSocialMedia } from '../assets/socialMedia.js'
import { user } from '../assets/user.js'

export default {
  data() {
    return {
      user,
      socialMedia,
    }
  },
  methods: {
    getSocialMedia,
  }
}
</script>
