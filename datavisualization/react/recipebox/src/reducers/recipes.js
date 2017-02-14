export default(state = [], payload) => {
  switch (payload) {
    case 'add':
      return [...state, payload.item]
      break;
    default:
      return state
  }
}
