
import { Button } from "./components/ui/button"
import { Progress } from "./components/ui/progress"
import Login from "./pages/login"
import RegisterForm from "./pages/register"



const App = () => {
  return (
    <div className="p-5 space-y-2 bg-gray-100">
      {/* <Login/> */}
      <RegisterForm/>
    </div>
  )
}

export default App