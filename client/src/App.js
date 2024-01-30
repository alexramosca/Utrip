
import './App.css';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import {Landing} from './pages/Landing';
import { Login } from './pages/Login';
import { useState, createContext } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { NotFound } from './components/NotFound';
import { Explore } from './pages/Explore';
import { Test } from './pages/Test';
import { Create } from './pages/Create';
import { MyTrips } from './pages/MyTrips';

export const UserContext = createContext()
function App() {
  const [currentUser, setCurrentUser] = useState(null)
  

  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <UserContext.Provider value = {{currentUser, setCurrentUser}}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dash/explore" element={<Explore />}/>
        <Route path='/dash/create' element={<Create />} />
        <Route path='/dash/mytrips' element={<MyTrips />} />
       
        
        <Route path="*" element={<NotFound />} />
  
      </Routes>
      
    </Router>
    </UserContext.Provider>
    </QueryClientProvider>
    
  )
}

export default App;
