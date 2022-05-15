import React from 'react'
import { Alert } from 'react-bootstrap'
import { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Button, ButtonGroup, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'


const RecipeListItem = ({ recipe, handleCloneRecipe, handleShowRecipe, handleDeleteRecipe }) => {

  const [ visibleDeleteField, setVisibleDeleteField ] = useState(false)

  return(
    <TableRow key={recipe.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">{recipe.title}</TableCell>
      <TableCell>{recipe.date}</TableCell>
      <TableCell align='right' size='small'>
        <ButtonGroup><Button variant='contained' onClick={() => handleCloneRecipe(recipe) }>Copy</Button>
          {recipe.template ?
            <>
              <Button variant='outlined'>Edit</Button>
              <IconButton aria-label="delete" disabled>
                <DeleteIcon />
              </IconButton>
            </>
            :
            <>
              <Button variant='contained' onClick={() => handleShowRecipe(recipe)}>Edit</Button>
              <IconButton aria-label="delete" color="primary" onClick={() => setVisibleDeleteField(true)}>
                <DeleteIcon />
              </IconButton>
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