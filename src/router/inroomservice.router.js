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
    path: '/irs/minimarket/user',
    component: () => import('src/pages/IRS/User/MinimarketPage.vue'),
    meta: {
      title: 'Minimarket',
      protected: true
    }
  },
  {
    name: 'FoodBeverageUser',
    path: '/irs/food-beverage/user',
    component: () => import('pages/IRS/user/FoodBeverageUser.vue'),
    meta: {
      title: 'Food & Beverage',
      protected: true
    }
  },
  {
    name: 'LaundryUser',
    path: '/irs/laundry/user',
    component: () => import('pages/IRS/user/LaundryUser.vue'),
    meta: {
      title: 'Laundry',
      protected: true
    }
  },

  {
    name: 'InformationUser',
    path: '/irs/information/user',
    component: () => import('pages/IRS/InformationHotel.vue'),
    meta: {
      title: 'Hotel Information',
      protected: true
    }
  }
]

export const irsmitra_routes = [
  {
    name: 'MinimarketMirta',
    path: '/irs/minimarket/mitra',
    component: () => import('src/pages/IRS/Mitra/MitraMinimarket.vue'),
    meta: {
      title: 'Minimarket',
      protected: true
    }
  },
  {
    name: 'ReportMitra',
    path: '/irs/report/mitra',
    component: () => import('pages/IRS/mitra/MitraReport.vue'),
    meta: {
      title: 'Report Data',
      protected: true
    }
  },
  {
    name: 'InformationMitra',
    path: '/irs/information/mitra',
    component: () => import('src/pages/IRS/InformationHotel.vue'),
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
