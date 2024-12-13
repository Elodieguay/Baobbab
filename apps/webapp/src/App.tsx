
import { ApolloProvider } from '@apollo/client';
import './App.css'
import Router from "./router/Router";
import { AuthProvider } from './context/Auth.context';
import { client } from './apollo';
function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
