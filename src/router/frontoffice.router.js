export const frontoffice_routes = [
  {
    name: 'guest-list',
    path: '/fo/guest-list',
    component: () => import('pages/FO/GuestList.vue'),
    meta: {
      title: 'Arrival Guest List',
      main_route: true,
      protected: true
    }
  },
  {
    name: 'guest-invoice',
    path: '/fo/guest-invoice/:resvId/:resvRoomId',
    component: () => import('pages/FO/Invoice.vue'),
    meta: {
      title: 'Arrival Guest List - Invoice',
      main_route: false,
      protected: true
    }
  },
  {
    name: 'room-availability',
    path: '/fo/room-availability',
    component: () => import('pages/FO/RoomAvailability.vue'),
    meta: {
      title: 'Room Availability',
      main_route: true,
      protected: true
    }
  },
  {
    path: '/fo/room-plan',
    component: () => import('pages/FO/RoomPlan.vue'),
    meta: {
      title: 'Room Plan',
      main_route: true,
      protected: true
    }
  },
  {
    name: 'reports',
    path: '/fo/reports',
    component: () => import('pages/FO/Reports.vue'),
    meta: {
      title: 'Reports',
      main_route: true,
      protected: true
    }
  },
  {
    name: 'voucher',
    path: '/fo/voucher',
    component: () => import('pages/FO/Voucher.vue'),
    meta: {
      title: 'Voucher',
      main_route: true,
      protected: true
    }
  },
  {
    name: 'payment',
    path: '/fo/guest-invoice/:resvId/:resvRoomId/payment',
    component: () => import('pages/FO/payment.vue'),
    meta: {
      title: 'Payment',
      main_route: false,
      protected: true
    }
  },
  {
    name: 'print-invoice',
    path: '/fo/guest-invoice/:resvId/:resvRoomId/print',
    component: () => import('pages/FO/InvoicePrint.vue'),
    meta: {
      title: 'Print',
      main_route: false,
      protected: true
    }
  },
  {
    path: '/fo/reports/print',
    component: () => import('pages/FO/ReportPrint.vue'),
    meta: {
      title: 'Print',
      main_route: false,
      protected: true
    }
  },
  {
    name: 'detail-payment',
    path: '/fo/guest-invoice/:resvId/:resvRoomId/payment/detail/',
    component: () => import('pages/FO/DetailPayment.vue'),
    meta: {
      title: 'detail',
      main_route: false,
      protected: true
    }
  }
]

export default frontoffice_routes

export const fosuperadmin_routes = [
  {
    name: 'PageSuperAdmin',
    path: '/fo/super-admin',
    component: () => import('pages/FO/SuperAdmin/SuperAdmin.vue'),
    meta: {
      title: 'Super Admin',
      protected: true
    }
  },
  {
    name: 'PageSuperAdminArticle',
    path: '/fo/super-admin/article',
    component: () => import('pages/FO/SuperAdmin/Article.vue'),
    meta: {
      title: 'Super Admin - Article',
      protected: true
    }
  },
  {
    name: 'PageSuperAdminAccess',
    path: '/fo/super-admin/access',
    component: () => import('pages/FO/SuperAdmin/Access.vue'),
    meta: {
      title: 'Super Admin - Access',
      protected: true
    }
  }
]
