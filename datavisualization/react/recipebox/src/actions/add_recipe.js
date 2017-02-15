export const addRecipe = (title, ingredients) => {
  console.log('adding item', title, ingredients)
  return {
    type: 'add',
    title,
    ingredients
  }
}
