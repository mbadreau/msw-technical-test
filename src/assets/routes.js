import MbaMainView from '../components/MainView.vue'
import MbaMyResume from '../components/MyResume.vue'
import MbaMyProfile from '../components/MyProfile.vue'
import MbaMyPublications from '../components/MyPublications.vue'
import MbaPageNotFound from '../components/PageNotFound.vue'

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
  // when having only an integer, considering it is a userId
  {
    path: '/:userId(\\d+)',
    redirect: to => ({
      name: "viewMyResume",
      params: { userId: to.params.userId },
    }),
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
      // publications subpage
      {
        path: 'publications',
        name: 'viewMyPublications',
        component: MbaMyPublications,
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
