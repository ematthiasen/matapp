const caloriesIn = (ingredient) => {
  console.log('IngredientCalc - ingredient:', ingredient)
  const calInFat = 9
  const calInProtein = 4
  const calInCarb = 4
  const calPer100 = calInFat * ingredient.fooditem.fat + calInProtein * ingredient.fooditem.protein + calInCarb * ingredient.fooditem.carbohydrate
  const totalCal = calPer100 * ingredient.amount / 100
  return totalCal
}

const calcTotalCalOf = (ingredients) => {
  const totalCal = ingredients.reduce((totalCal, ingredient) => {
    return totalCal + ingredientCalc.caloriesIn(ingredient)
  }, 0)
  return totalCal
}

const calcTotalFatOf = (ingredients) => {
  const totalFat = ingredients.reduce((totalFat, ingredient) => {
    return totalFat + ingredient.fooditem.fat * ingredient.amount / 100
  }, 0)
  return totalFat
}

const calcTotalProteinOf = (ingredients) => {
  const totalProtein = ingredients.reduce((totalProtein, ingredient) => {
    return totalProtein + ingredient.fooditem.protein * ingredient.amount / 100
  }, 0)
  return totalProtein
}

const calcTotalCarbsOf = (ingredients) => {
  const totalCarbs = ingredients.reduce((totalCarbs, ingredient) => {
    return totalCarbs + ingredient.fooditem.carbohydrate * ingredient.amount / 100
  }, 0)
  return totalCarbs
}

const ingredientCalc = {
  caloriesIn,
  calcTotalCalOf,
  calcTotalCarbsOf,
  calcTotalFatOf,
  calcTotalProteinOf
}

export default ingredientCalc