import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UserList from './pages/UserList'
import UserRegistration from './pages/UserRegistration'
import UserDetail from './pages/UserDetail'
import NotFound from './pages/NotFound'
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <UserProvider>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/user' element={<UserRegistration />} />
          <Route path='/user/:id' element={<UserDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
