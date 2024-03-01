export const inroomservice_routes = [
  {
    path: '/irs/home',
    component: () => import('pages/IRS/HomePage.vue'),
    meta: {
      title: 'Home',
      icon: 'home',
      main_route: true,
      protected: true
    }
  },
  {
    name: 'Profile',
    path: '/irs/home/profile',
    component: () => import('pages/IRS/Profile.vue'),
    meta: {
      title: 'Profile',
      icon: 'person',
      main_route: true,
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
      icon: 'Storefront',
      main_route: true,
      protected: true
    }
  },
  {
    name: 'FoodBeverageUser',
    path: '/irs/food-beverage/user',
    component: () => import('pages/IRS/user/FoodBeverageUser.vue'),
    meta: {
      title: 'Food & Beverage',
      icon: 'sports_bar',
      main_route: true,
      protected: true
    }
  },
  {
    name: 'LaundryUser',
    path: '/irs/laundry/user',
    component: () => import('pages/IRS/user/LaundryUser.vue'),
    meta: {
      title: 'Laundry',
      icon: 'local_laundry_service',
      main_route: true,
      protected: true
    }
  },

  {
    name: 'InformationUser',
    path: '/irs/information/user',
    component: () => import('pages/IRS/user/InformationUser.vue'),
    meta: {
      title: 'Hotel Information',
      icon: 'info',
      main_route: true,
      protected: true
    }
  },
  {
    name: 'cart',
    path: '/irs/cart',
    component: () => import('pages/IRS/user/cart.vue'),
    meta: {
      title: 'Cart',
      icon: 'shopping_cart',
      main_route: false,
      protected: true
    }
  },
  {
    name: 'maps',
    path: '/irs/maps',
    component: () => import('pages/IRS/user/estimated.vue'),
    meta: {
      title: 'Estimated',
      icon: 'map',
      main_route: false,
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
      main_route: false,
      protected: true
    }
  },
  {
    name: 'ReportMitra',
    path: '/irs/mitra/report',
    component: () => import('pages/IRS/mitra/MitraReport.vue'),
    meta: {
      title: 'Report Data',
      main_route: false,
      protected: true
    }
  },
  {
    name: 'InformationMitra',
    path: '/irs/mitra/information',
    component: () => import('pages/IRS/Mitra/MitraInformation.vue'),
    meta: {
      title: 'Hotel Information',
      main_route: false,
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
