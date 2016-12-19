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

export function updateDateFrom(value) {
  return {
    type: 'UPDATE_DATE_FROM',
    payload: value
  };
}

export function updateDateTo(value) {
  return {
    type: 'UPDATE_DATE_TO',
    payload: value
  };
}
