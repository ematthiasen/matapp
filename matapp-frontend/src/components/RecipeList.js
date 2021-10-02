import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveRecipe } from '../reducers/activeRecipeReducer'
import { useHistory } from 'react-router'
import recipeService from '../services/recipes'
import { addRecipe } from '../reducers/recipeReducer'

const RecipeList = () => {
  const recipes = useSelector(state => state.recipes)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleShowRecipe = (recipe) => {
    console.log('handled show recipe')
    dispatch(setActiveRecipe(recipe))
    history.push(`/recipe/${recipe.id}`)
  }

  const handleCloneRecipe = async (recipe) => {

    let { id, ...recipeWithoutId } = recipe
    console.log('WithoutID?', recipeWithoutId)
    recipeWithoutId = { ...recipeWithoutId, template: false }

    const today = (new Date()).toLocaleDateString('no-no')
    recipeWithoutId.title = `${recipeWithoutId.title} - ${today}`
    console.log(recipeWithoutId.name)
    const response = await recipeService.createRecipe(recipeWithoutId)
    dispatch(addRecipe(response.data))
    history.push(`/recipe/${response.data.id}`)
  }

  return(
    <ul>
      {recipes.map((recipe) =>
        <li key={recipe.id}>{recipe.title}
          {recipe.template ?
            <button onClick={() => handleCloneRecipe(recipe)}>Make a copy and edit</button>
            :
            <button onClick={() => handleShowRecipe(recipe)}>Set Active</button>
          }
        </li>
      )}
    </ul>
  )
}

export default RecipeList