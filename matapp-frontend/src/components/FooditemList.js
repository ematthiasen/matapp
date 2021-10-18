import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFooditem } from '../reducers/fooditemReducer'

const FooditemList = () => {
  const fooditemList = useSelector(state => state.fooditems)
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteFooditem(id))
  }

  return (
    <ul>
      {fooditemList.map(fooditem =>
        <li key={fooditem.id}>{fooditem.name} <button onClick={() => handleDelete(fooditem.id)}>Delete</button>

        </li>
      )}
    </ul>
  )
}

export default FooditemList