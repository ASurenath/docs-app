import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { addDoc, collection } from 'firebase/firestore';



const style = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(500px,100%)',
  bgcolor: 'background.paper',
  border: 'none', //'2px solid #000',
  borderRadius: '5px',
  // boxShadow: 24,
  p: 5,
  py: 2,
};



function Add({ db }) {
  const collectionRef = collection(db, 'DocumentsData')
  const addNewDoc = () => {
    if(!title){
      alert('Please enter a title')
    }
    else{const createTime = new Date()
    const lastEditTime = createTime
    addDoc(collectionRef, { title, content: '', createTime, lastEditTime })
      .then(() => {
        handleClose()
        alert('New Document Added!')
      })
      .catch(() => {
        alert('Something went wrong!')
      })}
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle('')
  }
  const [title, setTitle] = useState('')
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color='success' size='large' startIcon={<AddIcon />}>Add New Doc</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Create a new blank doc.
          </Typography>
          <TextField onChange={e => setTitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <Button onClick={handleClose} variant="outlined" color='info' size='large' style={{ margin: '10px' }}>Cancel</Button>

            <Button onClick={addNewDoc} variant="contained" color='success' size='large' style={{ margin: '10px' }}>Add</Button>

          </div>        </Box>
      </Modal>
    </div>
  )
}

export default Add