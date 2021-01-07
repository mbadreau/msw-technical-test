import MbaMainView from './components/MainView.vue'
import MbaMyResume from './components/MyResume.vue'
import MbaMyProfile from './components/MyProfile.vue'
import MbaMyPublications from './components/MyPublications.vue'
import MbaPageNotFound from './components/PageNotFound.vue'

export const routes = [
  // homepage
  {
    path: '',
    name: 'viewRoot',
    component: null,
  },
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
  // when a user is specified in the url, display its profile if exists
  {
    path: '/user/:userId(\\d+)',
    component: MbaMainView,
    props: true,
    children: [
      // default subpage
      {
        path: '',
        name: 'viewMyResume',
        component: MbaMyResume,
      },
      // form subpage
      {
        path: 'profile',
        name: 'viewMyProfile',
        component: MbaMyProfile,
      },
      // searchPub allow to save a link given a specific (list of) publication(s)
      {
        path: 'publications/:searchPub?',
        name: 'viewMyPublications',
        component: MbaMyPublications,
        props: true,
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
