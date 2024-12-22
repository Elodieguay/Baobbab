import './App.css'
import Router from "./router/Router";
import { AuthProvider } from './context/Auth.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

function App() {

const queryClient = new QueryClient()
  return (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
  )
}

export default App
