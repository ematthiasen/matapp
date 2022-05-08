import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveRecipe } from '../reducers/activeRecipeReducer'
import { useHistory } from 'react-router'
import recipeService from '../services/recipes'
import { addRecipe, deleteRecipe } from '../reducers/recipeReducer'
import RecipeListItem from './RecipeListItem'
import { Table, TableBody, TableHead, TableContainer, TableCell, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper'

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
    try {
      const response = await recipeService.createRecipe(recipeWithoutId)
      dispatch(addRecipe(response.data))
      history.push(`/recipe/${response.data.id}`)
    } catch (error) {
      console.log('Failed to clone recipe')
    }
  }

  const handleDeleteRecipe = async (recipe) => {
    console.log('Delete clicked for recipe: ', recipe.id )
    try {
      const response = await recipeService.deleteRecipe(recipe)
      console.log('deleted recipe', response)
      dispatch(deleteRecipe(recipe))
    } catch (error) {
      console.log('Failed to delete recipe')
    }
  }

  return(
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Date created
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) =>
            <RecipeListItem key={recipe.id}
              recipe={recipe}
              handleCloneRecipe={handleCloneRecipe}
              handleShowRecipe={handleShowRecipe}
              handleDeleteRecipe={handleDeleteRecipe}
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RecipeList