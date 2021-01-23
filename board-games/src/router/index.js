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
  }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isLoggedIn && to.name != 'login') {
      next({name: 'login'});
  } else {
    next();
  }
})
export default router
