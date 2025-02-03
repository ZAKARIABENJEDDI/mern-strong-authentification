import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/login"
import RegisterForm from "./pages/register"
import Navbar from './components/Navbar';



const App = () => {
  return (
    <div className="p-5 space-y-2 bg-gray-100">
      <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
    </div>
  )
}

export default App