import React from 'react'
import { Alert } from 'react-bootstrap'
import { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Button, ButtonGroup } from '@mui/material'


const RecipeListItem = ({ recipe, handleCloneRecipe, handleShowRecipe, handleDeleteRecipe }) => {

  const [ visibleDeleteField, setVisibleDeleteField ] = useState(false)

  return(
    <TableRow key={recipe.id} size='small'>
      <TableCell>{recipe.title}</TableCell>
      <TableCell>{recipe.date}</TableCell>
      <TableCell align='right' size='small'>
        <ButtonGroup><Button variant='contained' onClick={() => handleCloneRecipe(recipe) }>Copy</Button>
          {recipe.template ?
            <>
              <Button variant='outlined'>Edit</Button>
              <Button variant='outlined'>Del</Button>
            </>
            :
            <>
              <Button variant='contained' onClick={() => handleShowRecipe(recipe)}>Edit</Button>
              <Button variant='contained' onClick={() => setVisibleDeleteField(true)}>Del</Button>
            </>
          }
        </ButtonGroup>
      </TableCell>
      <br/>
      {visibleDeleteField ?
        <Alert variant='danger'>Really delete?<button onClick={() => handleDeleteRecipe(recipe)}>Yes</button><button onClick={() => setVisibleDeleteField(false)}>No</button> </Alert> :
        <></>
      }
    </TableRow>
  )
}

export default RecipeListItem