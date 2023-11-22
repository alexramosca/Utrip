
import './App.css';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'





function App() {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
    </QueryClientProvider>
    
  )
}

export default App;
