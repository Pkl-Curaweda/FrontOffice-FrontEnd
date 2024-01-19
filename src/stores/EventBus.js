
// import { provide, inject } from 'vue'

// const eventBusSymbol = Symbol('eventBus')
// const eventBus = {}

// export const provideEventBus = () => {
//   provide(eventBusSymbol, eventBus)
// }

// export const injectEventBus = () => {
//   return inject(eventBusSymbol)
// }

import Vue from 'vue';

export const eventBus = new Vue();
