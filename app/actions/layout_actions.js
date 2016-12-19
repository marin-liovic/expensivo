export function dismissAlert() {
  return {
    type: 'DISMISS_ALERT',
    payload: {}
  };
}

export function alert(type, message) {
  return {
    type: 'ALERT',
    payload: {
      type, message
    }
  };
}
