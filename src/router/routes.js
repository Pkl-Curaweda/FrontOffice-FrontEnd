import { frontoffice_routes, fosuperadmin_routes } from './frontoffice.router'
import {
  housekeeping_routes,
  hkreports_routes,
  hkroomboy_routes,
  hksupervisor_routes
} from './housekeeping.router'
import {
  inroomservice_routes,
  irsuser_routes,
  irsmitra_routes,
  irsadmin_routes
} from './inroomservice.router'

const routes = [
  {
    path: '/tes',
    component: () => import('pages/Test.vue'),
    meta: {
      title: 'Dashboard',
    }
  },

  {
    path: '/',
    component: () => import('pages/IndexPage.vue'),
    meta: {
      title: 'Dashboard',
      protected: true
    }
  },

  {
    path: '/auth',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: '/auth/login',
        component: () => import('pages/Login.vue'),
        meta: {
          title: 'Login',
          protected: false
        }
      },
      {
        name: 'Login-InRoom',
        path: '/auth/login/InRoom',
        component: () => import('pages/LoginInRoom.vue'),
        meta: {
          title: 'Login In Room',
          protected: false
        }
      }
    ]
  },

  {
    path: '/fo',
    component: () => import('layouts/FOLayout.vue'),
    children: frontoffice_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/fo/super-admin',
    component: () => import('layouts/FOLayout.vue'),
    children: fosuperadmin_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/hk',
    component: () => import('layouts/HK/HKLayout.vue'),
    children: housekeeping_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/hk/reports',
    component: () => import('layouts/HK/HKLayout.vue'),
    children: hkreports_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/hk/rb',
    component: () => import('layouts/HK/ImppsLayout.vue'),
    children: hkroomboy_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/hk/spv',
    component: () => import('layouts/HK/ImppsLayout.vue'),
    children: hksupervisor_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/irs',
    component: () => import('layouts/IRS/IRSLayout.vue'),
    children: inroomservice_routes
  },

  {
    path: '/irs/user',
    component: () => import('layouts/IRS/IRSLayout.vue'),
    children: irsuser_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/irs/mitra',
    component: () => import('layouts/IRS/IRSLayout.vue'),
    children: irsmitra_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/irs/admin',
    component: () => import('layouts/IRS/IRSLayout.vue'),
    children: irsadmin_routes,
    meta: {
      protected: true
    }
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
