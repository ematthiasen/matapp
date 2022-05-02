import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveRecipe } from '../reducers/activeRecipeReducer'
import { useHistory } from 'react-router'
import recipeService from '../services/recipes'
import { addRecipe, deleteRecipe } from '../reducers/recipeReducer'
import RecipeListItem from './RecipeListItem'

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

  const handleDeleteRecipe = async (recipe) => {
    console.log('Delete clicked for recipe: ', recipe.id )
    const confirmDelete = window.confirm('Are you sure you want to delete recipe? This cannot be undone')
    if (confirmDelete) {
      try {
        const response = await recipeService.deleteRecipe(recipe)
        console.log('deleted recipe', response)
        dispatch(deleteRecipe(recipe))
      } catch (error) {
        console.log('Failed to delete recipe')
      }
    }
  }

  return(
    <ul>

      {recipes.map((recipe) =>
        <RecipeListItem key={recipe.id}
          recipe={recipe}
          handleCloneRecipe={handleCloneRecipe}
          handleShowRecipe={handleShowRecipe}
          handleDeleteRecipe={handleDeleteRecipe}
        />
      )}
    </ul>
  )
}

export default RecipeList