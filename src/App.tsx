import { QueryClient, QueryClientProvider } from 'react-query'

import './App.css'
export const queryClient = new QueryClient()

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      
    </QueryClientProvider>
  )
}

export default App
