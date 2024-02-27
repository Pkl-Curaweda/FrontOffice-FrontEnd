export const inroomservice_routes = [
  {
    path: '/irs/home',
    component: () => import('pages/IRS/HomePage.vue'),
    meta: {
      title: 'Home',
      icon: 'task',
      protected: true
    }
  }
]

export default inroomservice_routes

export const irsuser_routes = [
  {
    name: 'MinimarketUser',
    path: '/irs/user/minimarket',
    component: () => import('src/pages/IRS/User/MinimarketPage.vue'),
    meta: {
      title: 'Minimarket',
      protected: true
    }
  },
  {
    name: 'FoodBeverageUser',
    path: '/irs/user/food-beverage',
    component: () => import('pages/IRS/user/FoodBeverageUser.vue'),
    meta: {
      title: 'Food & Beverage',
      protected: true
    }
  },
  {
    name: 'LaundryUser',
    path: '/irs/user/laundry',
    component: () => import('pages/IRS/user/LaundryUser.vue'),
    meta: {
      title: 'Laundry',
      protected: true
    }
  },

  {
    name: 'InformationUser',
    path: '/irs/user/information',
    component: () => import('pages/IRS/user/InformationUser.vue'),
    meta: {
      title: 'Hotel Information',
      protected: true
    }
  }
]

export const irsmitra_routes = [
  {
    name: 'MinimarketMirta',
    path: '/irs/mitra/minimarket',
    component: () => import('src/pages/IRS/Mitra/MitraMinimarket.vue'),
    meta: {
      title: 'Minimarket',
      protected: true
    }
  },
  {
    name: 'ReportMitra',
    path: '/irs/mitra/report',
    component: () => import('pages/IRS/mitra/MitraReport.vue'),
    meta: {
      title: 'Report Data',
      protected: true
    }
  },
  {
    name: 'InformationMitra',
    path: '/irs/mitra/information',
    component: () => import('pages/IRS/Mitra/MitraInformation.vue'),
    meta: {
      title: 'Hotel Information',
      protected: true
    }
  }
]

export const irsadmin_routes = [
  {
    name: 'AdminPage',
    path: '/irs/admin/allpage',
    component: () => import('pages/IRS/Admin/AdminAllPage.vue'),
    meta: {
      title: 'All Page',
      protected: true
    }
  }
]
