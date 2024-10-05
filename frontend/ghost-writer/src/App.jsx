import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import './App.css'

function App() {

  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/create' element={<CreatePost />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
