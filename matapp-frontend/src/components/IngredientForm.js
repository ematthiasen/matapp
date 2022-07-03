import { Autocomplete, Card, CardContent, TextField, Stack, FormControl, Select, MenuItem, Button, Collapse, Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addIngredientToRecipe } from '../reducers/activeRecipeReducer'
import { createFilterOptions } from '@mui/material'
import FooditemForm from './FooditemForm'

const filter = createFilterOptions()

const IngredientForm = () => {
  const fooditems = useSelector(state => state.fooditems)
  const dispatch = useDispatch()

  const [fooditemObject, setFooditemObject] = useState( { name: '' } )
  const [fooditemAmount, setFooditemAmount] = useState(0)
  const [fooditemUnit, setFooditemUnit] = useState('g')

  const [showForm, setShowForm] = useState(false)
  //dialog window to create new fooditem
  const [dialogOpen, setDialogOpen] = useState(false)

  const addIngredient = (event) => {
    if(event !== undefined) event.preventDefault()
    if(fooditemObject === null) {window.alert('Please select a food from the menu')
      return
    }
    console.log('fooditem', fooditemObject)
    console.log('amount', fooditemAmount)
    console.log('amountUnit', fooditemUnit)


    //Check if ID is valid?

    if (fooditemObject.createNew) {
      //Pass it over to the Dialog and its success function
      setDialogOpen(true)
    } else {

      const newIngredient = {
        fooditemId: fooditemObject.id,
        amount: fooditemAmount,
        amountUnit: fooditemUnit,
      }

      dispatch(addIngredientToRecipe(newIngredient))

      resetIngredientForm()
      console.log('new ingredient', newIngredient)

    }
  }

  const resetIngredientForm = () => {
    setShowForm(false)
    setDialogOpen(false)
    setFooditemObject( { name: '' } )
    setFooditemAmount(0)
    setFooditemUnit('g')

  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const handleSuccess = (returnValue) => {
    console.log('FooditemForm successfull in creating')
    console.log(returnValue)
    setFooditemObject(returnValue)
    const newIngredient = {
      fooditemId: returnValue.id,
      amount: fooditemAmount,
      amountUnit: fooditemUnit
    }
    console.log('new Ingredient: ', newIngredient)
    dispatch(addIngredientToRecipe(newIngredient))
    setDialogOpen(false)
    resetIngredientForm()

  }


  return (
    <>
      <Card variant='outlined'>
        <CardContent>
          <form onSubmit={addIngredient} onReset={resetIngredientForm}>
            <FormControl fullWidth >
              <Autocomplete
                disablePortal
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
                autoSelect
                id='fooditemAutocomplete'
                value={fooditemObject}
                options={fooditems}
                getOptionLabel={(option) => {
                  if (typeof (option) === 'string') {
                    return option
                  }
                  return option.name
                }}
                onOpen={() => setShowForm(true)}
                onChange={ (event, obj) => {
                  if(typeof(obj) === 'string') {
                    console.log('onchange found string')
                    // if the string is a valid name in the options, set the object from options
                    const existingFooditem = fooditems.find((fooditem) => fooditem.name === obj)
                    if(existingFooditem) {
                      console.log('setting fooditem', existingFooditem)
                      setFooditemObject(existingFooditem)
                    } else {
                    //Else set an object with createNew: true
                      console.log('Did not find fooditem, flagging for create')
                      setFooditemObject({
                        name: obj,
                        createNew: true
                      })
                    }
                  } else if(obj && obj.inputValue) {
                    console.log('onchange found object')
                    console.log('Object', obj)
                    console.log('inputValue', obj.inputValue)
                    setFooditemObject({
                      name: obj.inputValue,
                      createNew: true
                    })
                  } else {
                    console.log('onchange found option from alternatives')
                    setFooditemObject(obj)
                  }
                }}
                renderOption={ (props, option) => <li {... props}>{option.name}</li>}
                renderInput={ (params) => <TextField {...params} label='Add Ingredient' />}
                filterOptions={ (options, params) => {
                  const filtered = filter(options,params)

                  const { inputValue } = params
                  const isExistingValue = options.some((option) => inputValue === option.name)
                  if (inputValue !== '' && !isExistingValue) {
                    filtered.push({
                      inputValue,
                      name: `Create "${inputValue}"`,
                    })
                  }
                  return filtered
                }}
              />

              <Collapse in={showForm} timeout='auto' unmountOnExit >
                <FormControl fullWidth sx={{ py:1 }}>
                  <TextField id='amount' label='amount' type='number' value={fooditemAmount} onChange={(event) => setFooditemAmount(event.target.value)} />
                </FormControl>
                <FormControl fullWidth sx={{ py: 0 }}>
                  <Select
                    value={fooditemUnit}
                    onChange={(event) => { setFooditemUnit(event.target.value)}}>
                    <MenuItem value='g'>gram (g)</MenuItem>
                    <MenuItem value='ml'>milliliter (ml)</MenuItem>
                    <MenuItem value='tbsp'>tablespoon (tbsp)</MenuItem>
                    <MenuItem value='tsp'>teaspoon (tsp)</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ py:1 }} >
                  <Stack direction='row' spacing={ 1 }>
                    <Button type='submit' variant='contained'>Add</Button>
                    <Button type='reset' variant='outlined'>Cancel</Button>
                  </Stack>
                </FormControl>
              </Collapse>
            </FormControl>
          </form>
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <FooditemForm fooditemObject={fooditemObject} onCancel={() => {setDialogOpen(false)}} onSuccess={handleSuccess} />
          </Dialog>
        </CardContent>

      </Card>
    </>
  )
}

export default IngredientForm