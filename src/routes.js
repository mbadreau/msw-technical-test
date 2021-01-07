import MbaMyResume from './components/MyResume.vue'
import MbaMyProfile from './components/MyProfile.vue'
import MbaMyPublications from './components/MyPublications.vue'
import MbaPageNotFound from './components/PageNotFound.vue'

export const routes = [
  { path: '', component: MbaMyResume },
  { path: '/profile', component: MbaMyProfile },
  { path: '/publications', component: MbaMyPublications },
  { path: '*', component: MbaPageNotFound },
]