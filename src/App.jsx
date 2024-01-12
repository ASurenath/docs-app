
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Test from './components/Test'
import { app, db } from './firebaseConfig'
import Home from './pages/Home'
import DocEdit from './pages/DocEdit'


function App() {

  return (
    <>
    <Routes>
<Route path={'/'} element={<Home db={db}/>}/>
<Route path={'/edit/:id'} element={<DocEdit/>}/>


    </Routes>
      
      
    </>
  )
}

export default App
