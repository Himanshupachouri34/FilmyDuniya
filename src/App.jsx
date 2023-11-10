import './App.css'
import Header from './Components/Header'
import Cards from './Components/Cards'
import { Route, Routes } from 'react-router-dom'
import AddMovie from './Components/AddMovie'
import Detail from './Components/Detail'
import { createContext, useState } from 'react'
import Login from './Components/Login'
import Singup from './Components/Signup'

const AppState = createContext()

function App() {
  const [login , setLogin] = useState(false)
  const [username, setUsername] = useState('')

  return (
    <>
    <AppState.Provider value={{login, username, setLogin, setUsername}}>
    <div>
      <Header/> 
      
      <Routes>
        <Route path='/' element = {<Cards/>} />
        <Route path='/addmovie' element = {<AddMovie/>} />
        <Route path='/detail/:id' element = {<Detail/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Singup/>} />
      </Routes> 
      </div>
      </AppState.Provider>
    </>
    
  )
}

export default App
export {AppState} 
