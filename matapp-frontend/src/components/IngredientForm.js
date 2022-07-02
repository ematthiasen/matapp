import { Autocomplete, Card, CardContent, Grid, Typography, TextField, Stack, FormControl, Select, MenuItem, Button, AccordionSummary, Accordion, AccordionDetails, Collapse } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addIngredientToRecipe } from '../reducers/activeRecipeReducer'
import { useHistory } from 'react-router-dom'

const IngredientForm = () => {
  const fooditems = useSelector(state => state.fooditems)
  const dispatch = useDispatch()
  const history = useHistory()


  const [fooditemObject, setFooditemObject] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [clearKey, setClearKey] = useState(true)


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


    //Handle creation of new fooditem if it does not already exist
    if (fooditemObject.id === 'New') {
      console.log('First create new fooditem')
      history.push('/fooditems/create/', fooditemObject)
      return null

    }

    //setErrorNotification
    //console.log('fooditem: ', event.target.fooditem.value)
    const newIngredient = {
      fooditemId: fooditemObject.id,
      amount: event.target.amount.value,
      amountUnit: event.target.amountUnit.value,
    }

    dispatch(addIngredientToRecipe(newIngredient))

    setClearKey(!clearKey)
    event.target.amount.value = ''
    event.target.amountUnit.value = 'g'
    setShowForm(false)
    console.log('new ingredient', newIngredient)

  }

  const resetIngredientForm = ( event ) => {
    setClearKey(!clearKey)
    event.target.amount.value = ''
    event.target.amountUnit.value = 'g'
    setShowForm(false)
  }

  const autocompleteOptions = fooditems.map( (fooditem) => {
    return { label: fooditem.name, id: fooditem.id }
  })

  const updateFooditemObject = (event, obj) => {
    console.log('attempting to set object:', obj)
    if (typeof(obj) == 'string') {
      console.log('making placeholder object')
      obj = {
        label: obj,
        id: 'New'
      }
    }

    console.log('placeholder', obj)
    //if is a valid object:
    setFooditemObject(obj)
  }


  return (
    <>
      <Card variant='outlined'>
        <CardContent>
          <form onSubmit={addIngredient} onReset={resetIngredientForm}>
            <Autocomplete
              key={clearKey}
              freeSolo
              disablePortal
              id='fooditemAutocomplete'
              autoComplete
              autoHighlight='true'
              autoSelect='true'
              options={autocompleteOptions}
              onOpen={() => setShowForm(true)}
              onChange={ updateFooditemObject }
              renderInput={ (params) => <TextField {...params} name='fooditem' label='Add ingredient' />}
            />
            <Collapse in={showForm} timeout='auto' unmountOnExit >

              <FormControl fullWidth sx={{ py: 2 }}>
                <TextField id='amount' label='amount' type='number' defaultValue={1}/>
              </FormControl>
              <FormControl fullWidth>
                <Select name='amountUnit'>
                  <MenuItem value='g'>gram (g)</MenuItem>
                  <MenuItem value='ml'>milliliter (ml)</MenuItem>
                  <MenuItem value='tbsp'>tablespoon (tbsp)</MenuItem>
                  <MenuItem value='tsp'>teaspoon (tsp)</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ py: 2 }}>
                <Stack direction='horizontal'>
                  <Button type='submit' variant='contained'>Add</Button>
                  <Button type='reset' variant='outlined'>Cancel</Button>
                </Stack>
              </FormControl>
            </Collapse>

          </form>
        </CardContent>

      </Card>
    </>
  )
}

export default IngredientForm