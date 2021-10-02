import React from 'react'
import '../index.css'
import { useState } from 'react'
import { updateIngredientAmount } from '../reducers/activeRecipeReducer'
import { useDispatch } from 'react-redux'

const Ingredient = ({ ingredient, updateAmount }) => {
  const dispatch = useDispatch()


  // eslint-disable-next-line no-unused-vars

  const [editMode, setEditMode] = useState(false)
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

  if(!editMode) return (
    <tr onClick={() => setEditMode(!editMode)}>
      <td style={{ width: 100 }}>{ingredient.fooditem.name}</td>
      <td style={{ width: 120 }}>{ingredient.amount} {ingredient.amountUnit}</td>
      <td></td>
    </tr>
  )
  else return (
    <tr>
      <td style={{ width: 100 }} onClick={() => setEditMode(!editMode)}>{ingredient.fooditem.name}</td>
      <td><input value={amount} size='10' onChange={({ target }) => handleAmountUpdate(target.value)} />{ingredient.amountUnit}</td>
      <td>
        <button onClick={() => increaseAmountByOne()}>Increase</button>
        <button onClick={() => decreaseAmountByOne()}>Decrease</button>
        <input value={sliderValue} type='range' min='0' max='1000' onChange={handleSliderAmount}></input>
      </td>
    </tr>
  )
}
export default Ingredient