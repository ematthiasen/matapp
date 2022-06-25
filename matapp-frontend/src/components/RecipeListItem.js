import React from 'react'
import { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Box, Button, ButtonGroup, IconButton, Popover, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'


const RecipeListItem = ({ recipe, handleCloneRecipe, handleShowRecipe, handleDeleteRecipe }) => {

  const [ visibleDeleteField, setVisibleDeleteField ] = useState(false)
  const [ anchorElConfirmDialog, setAnchorElConfirmDialog] = useState(null)

  const handleOpenDeleteConfirmation = (event) => {
    setAnchorElConfirmDialog(event.currentTarget)

  }
  const handleCloseDeleteConfirmation = () => {
    setAnchorElConfirmDialog(null)
  }

  const handleDeleteRecipeClicked = () => {
    setAnchorElConfirmDialog(null)
    handleDeleteRecipe(recipe)
  }

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
              <IconButton aria-label="delete" color="primary" onClick={handleOpenDeleteConfirmation}>
                <DeleteIcon />
              </IconButton>
              <Popover
                component="div"
                id='confirm-dialog'
                open={Boolean(anchorElConfirmDialog)}
                anchorEl={anchorElConfirmDialog}
                onClose={handleCloseDeleteConfirmation}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box
                  sx={{
                    alignContent: 'right',
                    p: 1

                  }}
                >
                  <Typography
                    variant='body1'
                    sx={{
                      color: 'inherit',
                      p: 2
                    }}
                  >
                  Really delete?
                  </Typography>
                  <ButtonGroup>
                    <Button
                      variant='contained'
                      color='warning'
                      onClick={handleDeleteRecipeClicked}
                    >
                    Yes
                    </Button>
                    <Button
                      variant='outlined'
                      onClick={handleCloseDeleteConfirmation}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>

                </Box>
              </Popover>
            </>
          }
        </ButtonGroup>
      </TableCell>
      <br/>
      {visibleDeleteField ?
        <Box>Really delete?<button onClick={() => handleDeleteRecipe(recipe)}>Yes</button><button onClick={() => setVisibleDeleteField(false)}>No</button> </Box> :
        <></>
      }
    </TableRow>
  )
}

export default RecipeListItem