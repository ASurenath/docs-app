import React, { useEffect, useState } from 'react'
import Add from '../components/Add';
import { collection, onSnapshot } from 'firebase/firestore';
import { Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import DocCard from '../components/DocCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




function Home({ db }) {
  const [data, setData] = useState([])
  const collectionRef = collection(db, 'DocumentsData')
  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setData(data.docs.sort((a, b) => b.data().createTime - a.data().createTime).map((doc) => {
        return { ...doc.data(), id: doc.id }
      }))
    })
  }



  console.log(data);
  useEffect(() => { getData() }, [])
  return (
    <>
      <div className='mainContainer' >
        <Add db={db} />
        <Grid container spacing={2} style={{ margin: '20px', width: '100%' }}>
          {data?.length > 0 ?
            data.map((i, index) =>
              <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                <Item>
                  <DocCard document={i}></DocCard>

                </Item>            </Grid>)
            :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <h1>
                No docs added yet!
                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', scale: '2' }}>
                  <Add db={db} />
                </div>
              </h1>
            </div>
          }

        </Grid>

      </div>
    </>
  )
}

export default Home