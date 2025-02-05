import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/login"
import RegisterForm from "./pages/register"
import Navbar from './components/Navbar';
import Forget from './pages/ForgetPassword';
import Home from './pages/Home';

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
          <Route path="/forget" element={<Forget />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
    </div>
  )
}

export default App