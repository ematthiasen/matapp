import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addIngredientToRecipe } from '../reducers/activeRecipeReducer'

const IngredientForm = () => {
  const fooditems = useSelector(state => state.fooditems)
  const dispatch = useDispatch()

  //GOing to need access to food Items
  //and callback function to create Ingredient

  const addIngredient = (event) => {
    event.preventDefault()
    if(!event.target.fooditem.value) {window.alert('Please select a food from the menu')
      return
    }
    //setErrorNotification
    //console.log('fooditem: ', event.target.fooditem.value)
    const newIngredient = {
      fooditemId: event.target.fooditem.value,
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


  return (
    <div>
      <h2>Add Ingredient</h2>
      <form onSubmit={addIngredient}>
        <table><tbody>
          <tr>
            <td>Food Name</td><td>
              <select name='fooditem' >
                {options.map((option) =>
                  <option key={option.value} value={option.value}>{option.label}</option>
                )}
              </select>
            </td>

            <td>Amount</td><td><input name='amount'  />
          Unit
              <select name='amountUnit' >
                <option value='g'>gram (g)</option>
                <option value='ml'>milliliter (ml)</option>
                <option value='tbsp'>tablespoon (tbsp)</option>
                <option value='tsp'>teaspoon (tsp)</option>
              </select></td>
          </tr>
        </tbody></table>
        <button type='submit'>Add Ingredient to recipe</button>
      </form>
    </div>
  )
}

export default IngredientForm