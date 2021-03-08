import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import MyGames from '../views/MyGames.vue'
import GameForm from '../views/GameForm.vue'
import UserProfile from '../views/UserProfile'
import store from '../store'
import MyGroups from '../views/MyGroups'
import PlayForm from '../views/PlayForm'
import GroupView from '../views/GroupView'
import GroupForm from '../views/GroupForm'
import MyPlays from '../views/MyPlays'
import PlayView from '../views/PlayView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'mygames',
    component: MyGames
  },
  {
    path: '/games/new',
    name: 'addgame',
    component: GameForm
  },
  {
    path: '/profile/:id',
    name: 'userprofile',
    component: UserProfile
  },
  {
    path: '/group/new',
    name: 'groupnew',
    component: GroupForm
  },
  {
    path: '/group/:id',
    name: 'groupview',
    component: GroupView
  },
  {
    path: '/my-groups',
    name: 'mygroups',
    component: MyGroups
  },
  {
    path: '/plays/new',
    name: 'newplay',
    component: PlayForm
  },
  {
    path: '/plays',
    name: 'myplays',
    component: MyPlays
  },
  {
    path: '/plays/:id',
    name: 'playview',
    component: PlayView
  }
]

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("router, store is logged in:", store.getters.isLoggedIn);
  if (!store.getters.isLoggedIn && to.name != 'login' && to.name != 'register') {
      next({name: 'login'});
  } else {
    next();
  }
})
export default router
