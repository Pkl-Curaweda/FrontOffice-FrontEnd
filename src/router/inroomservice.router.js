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
