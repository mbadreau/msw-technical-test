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
          <li class="is-size-6 has-text-weight-normal" v-for="media in user.socialIds" :key="media.id">
            <a :href="media.link">
              <i :class="media.icon" :style="{ color: media.color }"></i> {{ media.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { user } from '../assets/user.js'

export default {
  data() {
    return {
      user,
    }
  }
}
</script>
