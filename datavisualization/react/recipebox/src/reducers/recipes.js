// @TODO read initialState from localStorage

const initialState = {
  recipes: [
    {name: "Spaghetti", ingredients: "Meat, Pasta"},
    {name: "Bread", ingredients: "Dough, Salt, Vinegar"}
  ]
}

export default(state = initialState, payload) => {
  switch (payload.type) {
    case 'add':
      return Object.assign({}, state, {recipes: {name: payload.title, ingredients: payload.ingredients}})
    default:
      return state
  }
}
