export const housekeeping_routes = [
  {
    path: '/hk/arrival',
    component: () => import('pages/HK/ArrivalDepartureRoom.vue'),
    meta: {
      title: 'Arrival Departure Room',
      icon: 'task',
      protected: true
    }
  },
  {
    path: '/hk/clean-dirty',
    component: () => import('pages/HK/CleanAndDirty.vue'),
    meta: {
      title: 'Clean And Dirty Room',
      icon: 'cleaning_services',
      protected: true
    }
  },
  {
    path: '/hk/room-occupancy',
    component: () => import('pages/HK/RoomOccupancy.vue'),
    meta: {
      title: 'Room Occupancy Overview',
      icon: 'bed',
      protected: true
    }
  },
  {
    path: '/hk/o-o-o-market-rooms',
    component: () => import('pages/HK/O-O-O.vue'),
    meta: {
      title: 'O-O-O And Off Market Rooms',
      icon: 'warning',
      protected: true
    }
  },
  {
    path: '/hk/status',
    component: () => import('pages/HK/Status.vue'),
    meta: {
      title: 'Status',
      icon: 'rule',
      protected: true
    }
  },
  {
    path: '/hk/lost-found',
    component: () => import('pages/HK/LostAndFound.vue'),
    meta: {
      title: 'Lost And Found',
      icon: 'nest_eco_leaf',
      protected: true
    }
  }
]

export const hkreports_routes = [
  {
    path: '/hk/report/room-plan',
    component: () => import('pages/HK/reports/RoomPlan.vue'),
    meta: {
      title: 'Room Plan',
      protected: true
    }
  },
  {
    path: '/hk/report/room-change',
    component: () => import('pages/HK/reports/RoomChange.vue'),
    meta: {
      title: 'Room Change Report',
      protected: true
    }
  },
  {
    path: '/hk/report/amenities-availability',
    component: () => import('src/pages/HK/reports/AmenitiesAvailability.vue'),
    meta: {
      title: 'Amenities Availability',
      protected: true
    }
  }
]

export const hkroomboy_routes = [
  {
    name: 'DashboardRBPage',
    path: '/hk/rb/dashboard',
    component: () => import('pages/HK/IMPPS/RoomBoy/Dashboard.vue'),
    meta: {
      title: 'Dashboard Room Boy',
      protected: true
    }
  },
  {
    name: 'LostFound',
    path: '/hk/rb/lostfound',
    component: () => import('pages/HK/IMPPS/RoomBoy/LostFound.vue'),
    meta: {
      title: 'Lost Found Room Boy',
      protected: true
    }
  }
]

export const hksupervisor_routes = [
  {
    name: 'DashboardSPVPage',
    path: '/hk/spv/dashboard',
    component: () => import('pages/HK/IMPPS/Supervisor/Dashboard.vue'),
    meta: {
      title: 'Dashboard Supervisor',
      protected: true
    }
  }
]
