import React from 'react'
import { Alert } from 'react-bootstrap'

const RecipeListItem = ({ recipe, handleCloneRecipe, handleShowRecipe, handleDeleteRecipe }) => {
/*@TODO: create a useState to toggle Alert component that shows yes/no buttons to confirm delete when it is pressed. Remove window.confirm from RecipeList delete function.

*/
  return(
    <li key={recipe.id}>{recipe.title}
      {recipe.template ?
        <button onClick={() => handleCloneRecipe(recipe)}>Make a copy and edit</button>
        :
        <>
          <button onClick={() => handleShowRecipe(recipe)}>Set Active</button>
          <button onClick={() => handleDeleteRecipe(recipe)}>Delete</button>
        </>
      }<br/>
      <Alert variant='danger'>Really delete?<button>Yes</button><button>No</button> </Alert>
    </li>
  )
}

export default RecipeListItem