import { Autocomplete, Card, CardContent, Grid, Typography, TextField, Stack, FormControl, Select, MenuItem, Button, AccordionSummary, Accordion, AccordionDetails, Collapse } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addIngredientToRecipe } from '../reducers/activeRecipeReducer'

const IngredientForm = () => {
  const fooditems = useSelector(state => state.fooditems)
  const dispatch = useDispatch()

  const [fooditemObject, setFooditemObject] = useState(null)

  const [showForm, setShowForm] = useState(false)

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
      <Card variant='outlined'>
        <CardContent>
          <form onSubmit={addIngredient}>
            <Typography variant='body1' onClick={() => setShowForm(!showForm)}>
          Add Ingredient
            </Typography>
            <Autocomplete
              disablePortal
              id='fooditemAutocomplete'
              options={autocompleteOptions}
              onOpen={() => setShowForm(true)}
              onChange={ (e, obj) => setFooditemObject(obj)}
              renderInput={ (params) => <TextField {...params} name='fooditem' />}
            />
            <Collapse in={showForm} timeout='auto' unmountOnExit >
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
            </Collapse>
          </form>
        </CardContent>

      </Card>
    </>
  )
}

export default IngredientForm