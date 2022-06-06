import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFooditem } from '../reducers/fooditemReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined'

const FooditemList = () => {
  const fooditemList = useSelector(state => state.fooditems)
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    const returnvalue = await dispatch(deleteFooditem(id))
    if(returnvalue) {
      console.log('received error: ', returnvalue.response.data.error)
      dispatch(createNotification(returnvalue.message + ' - ' + returnvalue.response.data.error, 'error'))
    } else {
      console.log('retrnvalue null, success!')
    }



  }

  return (
    <Grid container spacing={2} flexWrap='wrap' justifyContent='flex-start' >
      <Grid item xl={6} lg={8} md={10} sm={12}>
        <Typography variant='h4' sx={{ m: 2 }}>Fooditems</Typography>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                Name
                  </TableCell>
                  <TableCell>
              Protein
                  </TableCell>
                  <TableCell>
                Carbs
                  </TableCell>
                  <TableCell>
                Fat
                  </TableCell>
                  <TableCell>
                Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fooditemList.map(fooditem =>
                  <TableRow key={fooditem.id}>
                    <TableCell>{fooditem.name}</TableCell>
                    <TableCell>{fooditem.protein}</TableCell>
                    <TableCell>{fooditem.carbohydrate}</TableCell>
                    <TableCell>{fooditem.fat}</TableCell>
                    <TableCell><Button variant='outlined' onClick={() => handleDelete(fooditem.id)}><DeleteIcon /></Button></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FooditemList