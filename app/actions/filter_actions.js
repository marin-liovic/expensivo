export function updateAmountFrom(value) {
  return {
    type: 'UPDATE_AMOUNT_FROM',
    payload: value
  };
}

export function updateAmountTo(value) {
  return {
    type: 'UPDATE_AMOUNT_TO',
    payload: value
  };
}
