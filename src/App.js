import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/About/About'
import Landing from './pages/Landing/Landing'
import Settings from './pages/Settings/Settings'
import Statistics from './pages/Statistics/Statistics'
import Tasks from './pages/Tasks/Tasks'
import Navbar from './components/Navbar/Navbar'
import  BottomNavbar from './components/BottomNavbar/BottomNavbar'
import { useEffect } from 'react'

export default function App() {
    useEffect(() => {
        document.body.className = localStorage.getItem('theme')
        console.log(localStorage.getItem('theme'))
    }, [])

  return(
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={ <Landing /> } />
          <Route path='/tasks' element={ <Tasks /> } />
          <Route path='/statistics' element={ <Statistics /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/settings' element={ <Settings /> } />
        </Routes>
      </main>
      <footer>
        <BottomNavbar />
      </footer>
    </Router>
  )
}