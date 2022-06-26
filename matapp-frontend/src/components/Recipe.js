import React from 'react'
import { useEffect } from 'react'
import ingredientCalc from '../utils/ingredientCalc'
import Ingredient from './Ingredient'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { setActiveRecipe } from '../reducers/activeRecipeReducer'
import recipeService from '../services/recipes'
import { Box, Typography, Button, Stack, Card, CardContent, Grid, Table, TableHead, TableBody, TableRow, TableCell, Input, TextField, InputAdornment, OutlinedInput } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import IngredientForm from './IngredientForm'
import EditIcon from '@mui/icons-material/EditOutlined'

const Recipe = () => {
  const activeRecipe = useSelector(state => state.activeRecipe)
  const fooditems = useSelector(state => state.fooditems)
  const dispatch = useDispatch()
  const history = useHistory()

  const [servings, setServings] = useState(1)

  const [editTitle, setEditTitle] = useState(false)

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
          amountUnit: 'g',
          id: ingredient.id
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
    <>
      <Grid item xs={12}>
        {editTitle ?
          <form onSubmit={ (event) => { event.preventDefault(); console.log(event.target.title.value); activeRecipe.title = event.target.title.value; setEditTitle(false) }}>
            <OutlinedInput
              size='small'
              id='recipe-title'
              inputProps={{
                style: { fontSize: 35 },
              }}
              endAdornment={<InputAdornment position="end"><Button type='submit'><SaveIcon /></Button></InputAdornment>}
              defaultValue={activeRecipe.title}
              name='title'
            />
          </form> :
          <Typography
            variant='h4'
            sx={{
              m: 2
            }}>
            {activeRecipe.title}
            <Button onClick={() => setEditTitle(!editTitle)}><EditIcon /></Button>
          </Typography>
        }



        <Stack direction='row' spacing={1}>
          <Button variant='contained' startIcon={<CloudUploadIcon />} onClick={saveToBackend} >
          Server
          </Button>
          <Button variant='outlined' startIcon={<SaveIcon />} onClick={localSave}>Local</Button>
          <Button variant='outlined' startIcon={<DeleteIcon />} onClick={cancelAndReturn}>Discard changes</Button>

        </Stack>
      </Grid>
      <Grid item xl={4} lg={4} md={6} sm={8} xs={12} >
        <Card variant='outlined'
          sx={{
            gridRow: '1',
            gridColumn: 'span 2',
          }}>
          <CardContent>
            <Typography variant='h5'>Ingredients</Typography>

          </CardContent>
          <CardContent>
            {ingredients.map((ingredient) =>
              <Ingredient key={ingredient.id} ingredient={ingredient} updateAmount={updateIngredientAmount} />
            )}
          </CardContent>
        </Card>
      </Grid>
      <IngredientForm />
      <Grid item xl={4} lg={4} md={6} sm={8} xs={12} >
        <Card variant='outlined'
          sx={{
          }}
        >
          <CardContent>
            <Typography variant='h5'>
            Nutritional information
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                  X
                  </TableCell>
                  <TableCell>
                  Total
                  </TableCell>
                  <TableCell>
                  Per serving
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                  Calories
                  </TableCell>
                  <TableCell>
                    {ingredientCalc.calcTotalCalOf(ingredients)}
                  </TableCell>
                  <TableCell>
                    {(ingredientCalc.calcTotalCalOf(ingredients) / servings).toFixed(0)} kcal
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                  Carbs
                  </TableCell>
                  <TableCell>
                    {ingredientCalc.calcTotalCarbsOf(ingredients)}
                  </TableCell>
                  <TableCell>
                    {(ingredientCalc.calcTotalCarbsOf(ingredients) / servings).toFixed(0)} g
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                  Fat
                  </TableCell>
                  <TableCell>
                    {ingredientCalc.calcTotalFatOf(ingredients)}
                  </TableCell>
                  <TableCell>
                    {(ingredientCalc.calcTotalFatOf(ingredients) / servings).toFixed(0)} g
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                  Protein
                  </TableCell>
                  <TableCell>
                    {ingredientCalc.calcTotalProteinOf(ingredients)} g
                  </TableCell>
                  <TableCell>
                    {(ingredientCalc.calcTotalProteinOf(ingredients) / servings).toFixed(0)} g
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant='body1'>
              Number of servings: {' '}
              <Input value={servings} onChange={(event) => setServings(event.target.value)}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 100,
                  type: 'number'
                }}
                sx={{
                  maxWidth: 42
                }}
              />
            </Typography>

          </CardContent>
        </Card>
      </Grid>
    </>
  )

}

export default Recipe