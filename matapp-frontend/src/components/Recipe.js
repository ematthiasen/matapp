import React from 'react'
import { useEffect } from 'react'
import ingredientCalc from '../utils/ingredientCalc'
import Ingredient from './Ingredient'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { setActiveRecipe } from '../reducers/activeRecipeReducer'
import recipeService from '../services/recipes'
import { Box, Typography, Button, Stack, Accordion, AccordionSummary, Card, CardContent, Grid, AccordionDetails, Slider } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

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
    <Grid
      sx={{
        width: '50%', flexShrink: 1
      }}>
      <Typography
        variant='h4'
        sx={{
        }}>
        {activeRecipe.title}
      </Typography>
      <Stack direction='row' spacing={1}>
        <Button variant='contained' startIcon={<CloudUploadIcon />} onClick={saveToBackend} >
          Server
        </Button>
        <Button variant='outlined' startIcon={<SaveIcon />} onClick={localSave}>Local</Button>
        <Button variant='outlined' startIcon={<DeleteIcon />} onClick={cancelAndReturn}>Delete</Button>

      </Stack>
      <br />
      <Card variant='outlined'
        sx={{
          gridRow: '1',
          gridColumn: 'span 2',
        }}>
        <CardContent>
          <Typography variant='h5'>Ingredients</Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              Test
            </AccordionSummary>
            <AccordionDetails>
              Lots of text here<br />
              Lots of text here<br />
              Lots of text here<br />
              Lots of text here<br />
              Lots of text here<br />
              Lots of text here<br />
              Lots of text here<br />
              <Stack direction='row' spacing={2} sx={{ mb: 1 }} >
                <Button variant='contained'>Shoop de do</Button>
                <Slider></Slider>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
      {ingredients.map((ingredient) =>
        <Ingredient key={ingredient.id} ingredient={ingredient} updateAmount={updateIngredientAmount} />
      )}
      <br />
      <h2>Nutritional information</h2>
      <table>
        <thead><tr><td>Total calories</td><td>Total protein</td><td>Total carbs</td><td>Total fat</td></tr></thead>
        <tbody><tr>
          <td>{ingredientCalc.calcTotalCalOf(ingredients)}</td>
          <td>{ingredientCalc.calcTotalProteinOf(ingredients)}</td>
          <td>{ingredientCalc.calcTotalCarbsOf(ingredients)}</td>
          <td>{ingredientCalc.calcTotalFatOf(ingredients)}</td></tr></tbody>
      </table>
    </Grid>
  )

}

export default Recipe