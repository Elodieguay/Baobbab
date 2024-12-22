import './App.css'
import Router from "./router/Router";
import { AuthProvider } from './context/Auth.context';
function App() {

  return (
      <AuthProvider>
        <Router />
      </AuthProvider>
  )
}

export default App
