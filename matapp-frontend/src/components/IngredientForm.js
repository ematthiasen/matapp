import { Autocomplete, Card, CardContent, Grid, Typography, TextField, Stack, FormControl, Select, MenuItem, Button } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addIngredientToRecipe } from '../reducers/activeRecipeReducer'

const IngredientForm = () => {
  const fooditems = useSelector(state => state.fooditems)
  const dispatch = useDispatch()

  const [fooditemObject, setFooditemObject] = useState(null)

  //GOing to need access to food Items
  //and callback function to create Ingredient

  //@TODO: Needs update for using Autocomplete component
  const addIngredient = (event) => {
    event.preventDefault()
    if(!event.target.fooditem.value) {window.alert('Please select a food from the menu')
      return
    }
    console.log('fooditem', fooditemObject)
    console.log('amount', event.target.amount.value)
    console.log('amountUnit', event.target.amountUnit.value)

    //setErrorNotification
    //console.log('fooditem: ', event.target.fooditem.value)
    const newIngredient = {
      fooditemId: fooditemObject.id,
      amount: event.target.amount.value,
      amountUnit: event.target.amountUnit.value,
    }
    event.target.amount.value = ''
    event.target.amountUnit.value = 'g'
    console.log('new ingredient', newIngredient)

    dispatch(addIngredientToRecipe(newIngredient))
  }
  const options = fooditems.map((fooditem) => {
    return { value: fooditem.id, label: fooditem.name }
  })
  const autocompleteOptions = fooditems.map( (fooditem) => {
    return { label: fooditem.name, id: fooditem.id }
  })


  return (
    <>
      <Grid item xl={4} lg={4} md={6} sm={8} xs={12} >
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h5'>
          Add Ingredient
            </Typography>
            <form onSubmit={addIngredient}>
              <FormControl>

                <Autocomplete
                  disablePortal
                  id='fooditemAutocomplete'
                  options={autocompleteOptions}
                  onChange={ (e, obj) => setFooditemObject(obj)}
                  renderInput={ (params) => <TextField {...params} name='fooditem' />}
                />
                <TextField id='amount' label='amount' type='number' />
                <Select name='amountUnit'>
                  <MenuItem value='g'>gram (g)</MenuItem>
                  <MenuItem value='ml'>milliliter (ml)</MenuItem>
                  <MenuItem value='tbsp'>tablespoon (tbsp)</MenuItem>
                  <MenuItem value='tsp'>teaspoon (tsp)</MenuItem>
                </Select>
                <Button type='submit' variant='contained'>Add</Button>
              </FormControl>
            </form>
          </CardContent>

        </Card>
      </Grid>
    </>
  )
}

export default IngredientForm