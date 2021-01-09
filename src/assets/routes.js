import MbaMainView from '../components/MainView.vue'
import MbaMyProfile from '../components/MyProfile.vue'
import MbaMyPublications from '../components/MyPublications.vue'
import MbaMyResume from '../components/MyResume.vue'
import MbaPageNotFound from '../components/PageNotFound.vue'
import MbaProfile from '../components/Profile.vue'
import MbaSearchView from '../components/SearchView.vue'

export const routes = [
  /* REDIRECT */
  // redirect partial requests to homepage
  {
    path: '/user',
    redirect: { name: 'viewRoot' },
  },
  {
    path: '/profile',
    redirect: { name: 'viewRoot' },
  },
  {
    path: '/publications',
    redirect: { name: 'viewRoot' },
  },
  // when having only an integer, considering it is a userId
  {
    path: '/:userId(\\d+)',
    redirect: to => ({
      name: "viewMyResume",
      params: { userId: to.params.userId },
    }),
  },
  /* ROUTES */
  // homepage
  {
    path: '',
    name: 'viewRoot',
    components: {
      default: null,
      search: MbaSearchView,
    },
  },
  // when a user is specified in the url, display its profile if exists
  {
    path: '/user/:userId(\\d+)',
    components: {
      default: MbaMainView,
      search: MbaSearchView,
    },
    children: [
      // default subpage
      {
        path: '',
        name: 'viewMyResume',
        components: {
          default: MbaMyResume,
          profile: MbaProfile,
        },
      },
      // form subpage
      {
        path: 'profile',
        name: 'viewMyProfile',
        components: {
          default: MbaMyProfile,
          profile: MbaProfile,
        },
      },
      // publications subpage
      {
        path: 'publications',
        name: 'viewMyPublications',
        components: {
          default: MbaMyPublications,
          profile: MbaProfile,
        },
        // using props to get back search query value
        props: route => ({ search: route.query.search }),
      },
    ]
  },
  // 404 error
  {
    path: '*',
    name: 'viewPageNotFound',
    component: MbaPageNotFound
  },
]
