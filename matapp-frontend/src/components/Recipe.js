import React from 'react'
import { useEffect } from 'react'
import ingredientCalc from '../utils/ingredientCalc'
import Ingredient from './Ingredient'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { setActiveRecipe } from '../reducers/activeRecipeReducer'
import recipeService from '../services/recipes'

const Recipe = () => {
  const activeRecipe = useSelector(state => state.activeRecipe)
  const fooditems = useSelector(state => state.fooditems)
  const dispatch = useDispatch()
  const history = useHistory()

  let ingredients = null
  const id = useParams().id
  useEffect(() => {
    //check if local saved recipe
    const savedRecipeJSON = window.localStorage.getItem(`savedRecipe${id}`)
    if (savedRecipeJSON) {
      console.log('found save:', JSON.parse(savedRecipeJSON))
      const decodedSave = JSON.parse(savedRecipeJSON)
      console.log(decodedSave)
      dispatch(setActiveRecipe(decodedSave.activeRecipe))
      //ingredients = decodedSave.ingredients
    } else {
      //get from the backend
      recipeService
        .getRecipe(id)
        .then(response => {
          dispatch(setActiveRecipe(response.data))
        })
    }
  }, [])

  if(!activeRecipe) return <p>Waiting for activeRecipe to be set</p>
  if(fooditems.length === 0) return <p>Waiting for foodItems</p>
  console.log('Fooditems currently: ', fooditems)
  if(!ingredients) {
    ingredients = activeRecipe.ingredients.map(ingredient => {
      const fooditem = fooditems.find(item => item.id === ingredient.fooditemId)
      if(fooditem === undefined) {
        console.log('Fooditem in recipe not found in fooditem list')
        return {
          fooditem:
            {
              name: '<Deleted fooditem>',
              protein: 0,
              fat: 0,
              carbohydrate: 0,
              id: 0
            },
          amount: 0,
          amountUnit: 'g'
        }
      }
      else {
        console.log('found fooditem' ,fooditem)
        ingredient.fooditem = fooditem
        return ingredient
      }
    })
  }
  console.log('ingredients:',ingredients)

  const updateIngredientAmount = (ingredientId, amount) => {
    console.log('Want to save these changes: ', ingredientId, amount)
    //first find ingredient to update
    //Need a callback to App.
  }

  const localSave = () => {
    const saveObject = {
      activeRecipe: activeRecipe,
      ingredients: ingredients
    }
    console.log('saving following ingredients:', ingredients)
    window.localStorage.setItem(`savedRecipe${id}`, JSON.stringify(saveObject))
  }
  const cancelAndReturn = () => {
    window.localStorage.removeItem(`savedRecipe${id}`)
    history.push('/')

  }

  const saveToBackend = async () => {
    localSave()
    const response = await recipeService.updateAllIngredients(activeRecipe, ingredients)
    console.log('response return data', response.data)
    dispatch(setActiveRecipe(response.data))
  }

  return (
    <div>
      <h1>{activeRecipe.title}</h1>
      <button onClick={localSave}>Save changes locally</button>
      <button onClick={cancelAndReturn}>Discard changes and return</button>
      <button onClick={saveToBackend}>Save to server</button>
      <h2>Ingredients</h2>
      <table><tbody>
        {ingredients.map((ingredient) =>
          <Ingredient key={ingredient.id} ingredient={ingredient} updateAmount={updateIngredientAmount} />
        )}
      </tbody></table>
      <h2>Nutritional information</h2>
      <table>
        <thead><tr><td>Total calories</td><td>Total protein</td><td>Total carbs</td><td>Total fat</td></tr></thead>
        <tbody><tr>
          <td>{ingredientCalc.calcTotalCalOf(ingredients)}</td>
          <td>{ingredientCalc.calcTotalProteinOf(ingredients)}</td>
          <td>{ingredientCalc.calcTotalCarbsOf(ingredients)}</td>
          <td>{ingredientCalc.calcTotalFatOf(ingredients)}</td></tr></tbody>
      </table>
    </div>
  )

}

export default Recipe