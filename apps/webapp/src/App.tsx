
import './App.css'
import Login from './components/login/Login'
import { BrowserRouter as Router } from "react-router"
function App() {

  return (

    <Router>
      <div>
        <Login/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Router>
  )
}

export default App
