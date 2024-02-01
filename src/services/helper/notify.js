import { useQuasar } from 'quasar';

export function trigger(type, txt) {
  const $q = useQuasar();

  $q.notify({
    type: type,
    message: txt || 'data not found',
    timeout: 1000
  });
}
