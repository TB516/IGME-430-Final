import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import './index.css'
import AccountGuard from './components/AccountGuard'

const router = createBrowserRouter([
  {
    path: '',
    element: <AccountGuard></AccountGuard>,
    children: [
      {
        path: '',
        element: <Navbar></Navbar>,
        children: [
          {
            index: true,
            element: <h1>Home</h1>
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    element: <div>Login</div>,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
