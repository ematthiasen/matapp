import React from 'react'
import { Alert, Stack } from 'react-bootstrap'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'

const RecipeListItem = ({ recipe, handleCloneRecipe, handleShowRecipe, handleDeleteRecipe }) => {
/*@TODO: create a useState to toggle Alert component that shows yes/no buttons to confirm delete when it is pressed. Remove window.confirm from RecipeList delete function.
*/
  const [ visibleDeleteField, setVisibleDeleteField ] = useState(false)

  return(
    <Row md={4} key={recipe.id}>
      <Col>{recipe.title}</Col>
      <Col className="justify-content-left" md="auto"><Stack direction="horizontal"><Button variant='secondary' onClick={() => handleCloneRecipe(recipe) }>Make a copy and edit</Button>
        {recipe.template ?
          <>
          </>
          :
          <>
            <Button onClick={() => handleShowRecipe(recipe)}>Set Active</Button>
            <Button onClick={() => setVisibleDeleteField(true)}>Delete</Button>
          </>
        }
      </Stack></Col><br/>
      {visibleDeleteField ?
        <Alert variant='danger'>Really delete?<button onClick={() => handleDeleteRecipe(recipe)}>Yes</button><button onClick={() => setVisibleDeleteField(false)}>No</button> </Alert> :
        <></>
      }
    </Row>
  )
}

export default RecipeListItem