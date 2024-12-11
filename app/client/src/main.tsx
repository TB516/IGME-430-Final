import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import './index.css'
import NeedsAuth from './components/NeedsAuth'
import AccountPortal from './Pages/AccountPortal'

const router = createBrowserRouter([
  {
    path: '',
    element: <NeedsAuth child={<Navbar></Navbar>}></NeedsAuth>,
    children: [
      {
        index: true,
        element: <h1>Home</h1>
      },
      {
        path: 'sorceries',
        element: <h1>Sorceries</h1>,
      },
      {
        path: 'incantations',
        element: <h1>Incant</h1>,
      }
    ]
  },
  {
    path: 'login',
    element: <AccountPortal></AccountPortal>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
