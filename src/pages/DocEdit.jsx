import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { Box, Button, Container, IconButton, Modal, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplyIcon from '@mui/icons-material/Reply';


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


function DocEdit() {
    const [value, setValue] = useState('');
    const [data, setData] = useState({})
    const collectionRef = collection(db, 'DocumentsData')
    const { id } = useParams()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('')


    const getData = () => {
        onSnapshot(doc(collectionRef, id), (docs) => {
            setData(docs.data())
        })
    }

    useEffect(() => {
        const updateData = setTimeout(() => {
            updateDoc(doc(collectionRef, id), {
                content: value, lastEditTime: new Date()
            })
                .then(() => {
                    ""
                })
                .catch(() => {
                    alert('Cannot Save')
                })
        }
            , 1000)
        return () => clearTimeout(updateData)
    }, [value])

    const updateTitle = () => {
        updateDoc(doc(collectionRef, id), {
            title, lastEditTime: new Date()
        })
            .then(() => {
                alert('Title changed successfully')
                handleClose()
            })
            .catch(() => {
                alert('Could not edit title!')
            })
    }

    useEffect(() => { setValue(data.content) }, [data])
    useEffect(() => { setTitle(data.title) }, [data.title])

    useEffect(() => { getData() }, [])


    useEffect(() => {
        console.log(value)
            , [value]
    })
    console.log(id);

    return (
        <Container>
            <div style={{ display: 'flex' }}>
                <Link to={'/'}>
                    <Typography variant="h4" component="h2" style={{ padding: '10px' }}>
                        <ReplyIcon /> Home
                    </Typography></Link>


                <Typography variant="h4" component="h2" style={{ padding: '10px' }}>
                    {/* <ArrowForwardIcon /> */}
                    Title: {data.title} </Typography>

                <IconButton onClick={handleOpen} color='info' size='small'>
                    <i className="fa-solid fa-pen"></i>
                </IconButton>
            </div>

            <ReactQuill theme="snow" value={value} onChange={e => setValue(e)} style={{ height: '70vh', backgroundColor: 'white' }} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        Edit doc title
                    </Typography>
                    <TextField onChange={e => setTitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" style={{ width: '100%' }} value={title} contentEditable/>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                        <Button onClick={handleClose} variant="outlined" color='info' size='large' style={{ margin: '10px' }}>Cancel</Button>
                        <Button onClick={updateTitle} variant="contained" color='success' size='large' style={{ margin: '10px' }}>Add</Button>
                    </div>
                </Box>
            </Modal>
        </Container>
    )
}

export default DocEdit