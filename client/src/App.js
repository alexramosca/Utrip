
import './App.css';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useState, createContext } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

export const UserContext = createContext()
function App() {
  const [currentUser, setCurrentUser] = useState(null)
  

  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <UserContext.Provider value = {{currentUser, setCurrentUser}}>
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        
      </Routes>
    </Router>
    </UserContext.Provider>
    </QueryClientProvider>
    
  )
}

export default App;
