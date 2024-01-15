import { Box, Button, IconButton, Modal, Typography, colors } from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { format, toDate } from 'date-fns';



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


function DocCard({ document }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const collectionRef = collection(db, 'DocumentsData')
  const navigate = useNavigate()

  const handleDelete = () => {
    handleClose()
    deleteDoc(doc(collectionRef, document.id))
      .then(() => {
        alert('Document deleted successfully.')
      })
      .catch(() => { alert('Could not delete delete document!') })

  }


  return (
    <>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '30vh' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" component="h2">

              {document.title}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <IconButton onClick={() => navigate(`/edit/${document.id}`)} color='info' size='small'>
                <i className="fa-solid fa-pen"></i>
              </IconButton>
              <IconButton onClick={handleOpen} color='error' size='small'>
                <i className="fa-solid fa-trash-can"></i>
              </IconButton>
            </div>


          </div>
          <hr style={{ height: '1px', backgroundColor: 'lightgrey', border: 'none' }} />
          <div dangerouslySetInnerHTML={{ __html: document.content }}>

          </div>
        </div>
        <div style={{ fontSize: '0.8em', fontStyle: 'italic' ,textAlign:'end'}}>
          <hr style={{ height: '1px', backgroundColor: 'lightgrey', border: 'none' }} />
          Last Edited:
          {document?.lastEditTime && (format((toDate(document?.lastEditTime?.seconds * 1000)), "dd/MM/yy hh:mm a"))}
          <br />
          Created:
          {document?.createTime && (format((toDate(document?.createTime?.seconds * 1000)), "dd/MM/yy hh:mm a"))}
          
        </div>

      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Are you sure that you want to delete &apos;{document.title}&apos;?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <Button onClick={handleClose} variant="outlined" color='info' size='large' style={{ margin: '10px' }}>Cancel</Button>
            <Button onClick={handleDelete} variant="outlined" color='error' size='large' style={{ margin: '10px' }}>Delete</Button>

          </div>
        </Box>
      </Modal>
    </>
  )
}

export default DocCard