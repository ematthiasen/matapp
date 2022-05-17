import React from 'react'
import { useState } from 'react'
import { updateIngredientAmount, deleteIngredient } from '../reducers/activeRecipeReducer'
import { useDispatch } from 'react-redux'
import { Accordion, Box, AccordionSummary, AccordionDetails, Slider, Button, Typography, Stack } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const Ingredient = ({ ingredient, updateAmount }) => {
  const dispatch = useDispatch()


  // eslint-disable-next-line no-unused-vars

  const [amount, setAmount] = useState(ingredient.amount)
  const [sliderValue, setSliderValue] = useState(ingredient.amount)

  const increaseAmountByOne = () => {
    const currentAmount = amount
    setAmount(currentAmount + 1)
    setSliderValue(currentAmount + 1)
    dispatch(updateIngredientAmount(ingredient.id, currentAmount + 1))
  }
  const decreaseAmountByOne = () => {
    if(amount > 0) {
      const currentAmount = amount
      setAmount(currentAmount - 1)
      setSliderValue(currentAmount - 1)
      dispatch(updateIngredientAmount(ingredient.id, currentAmount - 1))
    }
  }

  const handleSliderAmount = (event) => {
    setAmount(event.target.value)
    setSliderValue(event.target.value)
    dispatch(updateIngredientAmount(ingredient.id, event.target.value))
  }

  const handleAmountUpdate = (value) => {
    setAmount(value)
    setSliderValue(value)
    dispatch(updateIngredientAmount(ingredient.id, value))
  }

  const handleDeleteIngredient = () => {
    //deleteIngredient(ingredient.id)
    dispatch(deleteIngredient(ingredient.id))
  }

  return (
    <Accordion>
      <AccordionSummary>
        <Stack direction='row'  flexGrow={1} justifyContent='space-between'>
          <Typography sx={{ display: 'inline-flex' }}>{ingredient.fooditem.name}</Typography>
          <Typography sx={{ display: 'flex', color: 'text.secondary', }}>{ingredient.amount} {ingredient.amountUnit}</Typography>
        </Stack>
        {/*<td style={{ width: 100 }} onClick={() => setEditMode(!editMode)}>{ingredient.fooditem.name}</td>
        <td><input value={amount} size='10' onChange={({ target }) => handleAmountUpdate(target.value)} />{ingredient.amountUnit}</td>
        <td>
          <button onClick={() => increaseAmountByOne()}>Increase</button>
          <button onClick={() => decreaseAmountByOne()}>Decrease</button>
          <input value={sliderValue} type='range' min='0' max='1000' onChange={handleSliderAmount}></input>
          <button onClick={() => handleDeleteIngredient()}>Delete</button>
        </td>
      */}
      </AccordionSummary>
      <AccordionDetails>
        <Slider
          marks={[
            {
              value: 0,
              label: '0'
            },
            {
              value: 100,
              label: '100 g'
            }
          ]}
        >
          test
        </Slider>
        <br />
        <Stack direction='row' justifyContent='center' spacing={1}>
          <Button variant='outlined'>-10</Button>
          <Button variant='outlined'>-1</Button>
          <Button variant='outlined'>+1</Button>
          <Button variant='outlined'>+10</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
export default Ingredient