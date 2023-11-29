
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createGlobalStyle} from "styled-components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Global = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`

const queryClient = new QueryClient({
  defaultOptions : {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <QueryClientProvider client={queryClient}>
          <Global/>
          <App />
        </QueryClientProvider>
    </>


)
